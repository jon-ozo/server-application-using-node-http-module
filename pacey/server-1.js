const Pacey = require('./pacey');
const { join } = require('node:path');

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
	{
		id: 3,
		title: 'There are many variations of passages',
		body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
		userId: 3,
	},
	{
		id: 4,
		title: 'Contrary to popular belief',
		body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
		userId: 4,
	},
	{
		id: 5,
		title: 'It was popularised in the 1960s',
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		userId: 5,
	},
	{
		id: 6,
		title: 'It has roots in a piece of classical Latin',
		body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
		userId: 5,
	},
	{
		id: 7,
		title: 'The generated Lorem Ipsum',
		body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
		userId: 4,
	},
	{
		id: 8,
		title: 'The point of using Lorem Ipsum',
		body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		userId: 3,
	},
	{
		id: 9,
		title: 'The standard chunk',
		body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
		userId: 2,
	},
	{
		id: 10,
		title: 'Accompanied by English',
		body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
		userId: 1,
	},
];

const PORT = 9001;
const server = new Pacey();

server.route('get', '/', (req, res) => {
	console.log('Server 1 is handling this request');

	res.sendFile(join(__dirname, 'index.html'), 'text/html');
});

server.route('get', '/login', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'), 'text/html');
});

server.route('get', '/style.css', (req, res) => {
	res.sendFile(join(__dirname, 'public', 'style.css'), 'text/css');
});

server.route('get', '/index.js', (req, res) => {
	res.sendFile(join(__dirname, 'public', 'index.js'), 'text/javascript');
});

server.route('get', '/api/user', (req, res) => {
	res.status(200).json(USERS);
});

server.route('post', '/api/login', (req, res) => {
	let body = '';

	req.on('data', (chunk) => {
		body += chunk.toString('utf-8');
	});

	req.on('end', () => {
		body = JSON.parse(body);

		const { username, password } = body;

		const user = USERS.find((user) => user.username === username);
		// const pwd = USERS.find(user => user.password === password);

		if (user && user.password === password) {
			res.status(200).json({ message: 'Successfully logged in' });
		} else {
			res.status(401).json({ error: 'Invalid username or password' });
		}
	});
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
