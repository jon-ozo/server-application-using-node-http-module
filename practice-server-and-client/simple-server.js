const { createServer } = require('node:http');

const server = createServer();
const PORT = 3000;

server.on('request', (req, res) => {
	console.log('----- METHOD: -----');
	console.log(req.method);

	console.log('----- URL: -----');
	console.log(req.url);

	console.log('----- HEADERS: -----');
	console.log(req.headers);

	console.log('----- BODY: -----');

	let data = '';
	const name = req.headers.name;

	req.on('data', (chunk) => {
		data += chunk.toString('utf-8');
	});

	req.on('end', () => {
		data = JSON.parse(data);
		console.log(data);
		console.log(name);
	});

	res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Successfully received data' }));
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
