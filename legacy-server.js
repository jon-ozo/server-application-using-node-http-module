const { createServer } = require('node:http');
const { open, readdir } = require('node:fs/promises');
const { join } = require('node:path');
const { pipeline } = require('node:stream/promises');

const PORT = 3000;
const server = createServer();

(async () => {
	try {
		const folder = await readdir(join(__dirname, 'public'));
		console.log(folder);

		for await (const file of folder) {
		}
	} catch (err) {
		console.log(err.message);
	}
})();

server.on('request', async (req, res) => {
	if (req.url === '/' && req.method === 'GET') {
		const headers = new Headers({
			'Content-Type': 'text/css',
			'Content-Type': 'text/javascript',
		});

		const readFileHandle = await open(
			join(__dirname, 'public', 'index.html'),
			'r'
		);
		const readStream = readFileHandle.createReadStream();

		try {
			res.setHeaders(headers);
			res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
			await pipeline(readStream, res);
		} catch (err) {
			res.end(`<h1>Something went wrong</h1> ${err.message}`);
		}
	}

	if (req.url === '/style.css' && req.method === 'GET') {
		const readFileHandle = await open(
			join(__dirname, 'public', 'style.css'),
			'r'
		);
		const readStream = readFileHandle.createReadStream();

		try {
			res.writeHead(200, 'OK', { 'Content-Type': 'text/css' });
			await pipeline(readStream, res);
		} catch (err) {
			res.end(`<h1>Something went wrong</h1> ${err.message}`);
		}
	}

	if (req.url === '/index.js' && req.method === 'GET') {
		const readFileHandle = await open(
			join(__dirname, 'public', 'index.js'),
			'r'
		);
		const readStream = readFileHandle.createReadStream();

		try {
			res.writeHead(200, 'OK', { 'Content-Type': 'text/javascript' });
			await pipeline(readStream, res);
		} catch (err) {
			res.end(`<h1>Something went wrong</h1> ${err.message}`);
		}
	}

	if (req.url === '/login' && req.method === 'POST') {
		res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Logging you in...' }), () =>
			console.log('Data received')
		);
	}

	if (req.url === '/upload' && req.method === 'POST') {
		const fileHandle = await open(
			join(__dirname, 'storage', 'image.jpeg'),
			'w'
		);
		const fileStream = fileHandle.createWriteStream();

		// req.pipe(fileStream);
		await pipeline(req, fileStream);

		res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Upload completed successfully' }));

		// req.on('end', () => {
		// 	res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
		// 	res.end(JSON.stringify({ message: 'Upload completed successfully' }));
		// });
	}
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
