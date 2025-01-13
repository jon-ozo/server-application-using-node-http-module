const Pacey = require('./pacey');
const { join } = require('node:path');

const PORT = 3000;
const server = new Pacey();

server.route('get', '/', (req, res) => {
	try {
		res.sendFile(join(__dirname, 'index.html'), 'text/html');
	} catch (err) {
		console.log('Could not get file');
	}
});

server.route('get', '/style.css', (req, res) => {
	try {
		res.sendFile(join(__dirname, 'public', 'style.css'), 'text/css');
	} catch (err) {
		console.log('Could not get file');
	}
});

server.route('get', '/index.js', (req, res) => {
	try {
		res.sendFile(join(__dirname, 'public', 'index.js'), 'application/js');
	} catch (err) {
		console.log('Could not get file');
	}
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
