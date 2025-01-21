const Pacey = require('./pacey');
const { join, extname, format } = require('node:path');
const { readdir } = require('node:fs/promises');

const SESSIONS = [];

const USERS = [
	{ id: 1, name: 'James Brown', username: 'jbrown', password: 'oolala' },
	{ id: 2, name: 'Jenny Beau', username: 'jenny', password: 'yayyayyaaa' },
	{ id: 3, name: 'Jessica Phil', username: 'jesPhlly', password: 'passwoerd' },
	{ id: 4, name: 'Jonnie Blaq', username: 'blaq', password: 'justalilbit' },
	{ id: 5, name: 'Zack griffith', username: 'zackgriff', password: 'idklol' },
];
const POSTS = [
	{
		id: 1,
		title: 'Lorem Ipsum is simply dummy text',
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		userId: 1,
	},
	{
		id: 2,
		title: 'It is a long established fact',
		body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		userId: 2,
	},
];

const PORT = 3000;
const server = new Pacey();

// server.middleware(async (req, res, next) => {
// 	const mimeTypes = { '.js': 'text/javascript', '.css': 'text/css' };

// 	try {
// 		const folder = await readdir(join(__dirname, 'public'));

// 		for await (const file of folder) {
// 			const filePath = `/${file}`;
// 			if (req.url === filePath) {
// 				const fileFormat = extname(file);
// 				const mimeType = Object.keys(mimeTypes).find(
// 					(key) => key === fileFormat
// 				);

// 				return res.status(200).sendFile(filePath, mimeTypes[mimeType]);
// 			}
// 		}
// 		next();
// 	} catch (err) {
// 		res.status(404).json({ error: err.message });
// 		next();
// 	}
// });

// run authentication
server.middleware((req, res, next) => {
	const routesToAuthenticate = [
		'GET /api/user',
		'POST /api/posts',
		'PUT /api/user',
		'DELETE /api/logout',
	];

	if (routesToAuthenticate.indexOf(req.method + ' ' + req.url) !== -1) {
		if (req.headers.cookie) {
			const getToken = req.headers.cookie?.split('=')[1];
			const token = SESSIONS.find((session) => session.token === getToken);

			if (token) {
				req.userId = token.userId;
				next();
			}
		} else {
			res.status(401).json({ error: 'Unauthroized access denied' });
			next();
		}
	} else {
		next();
	}
});

// parse json data
server.middleware((req, res, next) => {
	if (req.headers['content-type'] === 'application/json') {
		let body = '';

		req.on('data', (chunk) => {
			body += chunk.toString('utf-8');
		});

		req.on('end', () => {
			req.body = JSON.parse(body);
			next();
		});
	} else {
		next();
	}
});

server.middleware((req, res, next) => {
	console.log('third middleware function');

	next();
});

server.middleware((req, res, next) => {
	console.log('fourth middleware function');

	next();
});

// add routes
server.route('get', '/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'), 'text/html');
});

server.route('get', '/login', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'), 'text/html');
});

server.route('get', '/profile', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'), 'text/html');
});

server.route('get', '/style.css', (req, res) => {
	res.sendFile(join(__dirname, 'public', 'style.css'), 'text/css');
});

server.route('get', '/scripts.js', (req, res) => {
	res.sendFile(join(__dirname, 'public', 'scripts.js'), 'text/javascript');
});

// ------------------------------------------------------
// ------------------------------------------------------

server.route('post', '/api/login', (req, res) => {
	try {
		const { username, password } = req.body;
		const user = USERS.find((user) => user.username === username);

		if (user && user.password === password) {
			const token = Math.floor(Math.random() * 100000000).toString();
			const session = { userId: user.id, token };

			SESSIONS.push(session);

			res.setHeader('Set-Cookie', `token=${token}; Path=/`);
			res.status(200).json({ message: 'Successfully logged in' });
			console.log(session);
		} else {
			res.status(401).json({ error: 'Invalid username or password' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

server.route('delete', '/api/logout', (req, res) => {
	const index = SESSIONS.findIndex((session) => session.userId === req.userId);

	if (index === -1) return res.status(400).json({ error: 'Bad request' });

	SESSIONS.splice(index, 1);

	res.setHeader('Set-Cookie', `token=deleted; Path=/`);
	res.status(200).json({ message: 'Successfully logged out' });
});

server.route('get', '/api/user', (req, res) => {
	try {
		const user = USERS.find((user) => user.id === req.userId);

		if (!user) return res.status(404).json({ error: 'User not found' });

		res.status(200).json({ username: user.username, name: user.name });
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
});

server.route('put', '/api/user', (req, res) => {
	try {
		const { username, name, password } = req.body;
		const user = USERS.find((user) => user.id === req.userId);

		if (!user)
			return res.status(401).json({ error: 'Unauthorized access denied' });

		user.username = username;
		user.name = name;

		if (password) {
			user.password = password;
		}

		res.status(200).json({ message: 'Profile saved successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

server.route('post', '/api/posts', (req, res) => {
	const { title, body } = req.body;
	const userId = req.userId;
	const post = {
		id: POSTS.length + 1,
		title,
		body,
		userId,
	};

	POSTS.unshift(post);
	console.log(POSTS);
});

server.route('get', '/api/posts', (req, res) => {
	const posts = POSTS.map((post) => {
		const user = USERS.find((user) => user.id === post.userId);
		post.author = user.name;

		return post;
	});

	res.status(200).json(posts);
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
