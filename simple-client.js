const { Agent, request } = require('node:http');

const agent = new Agent({ keepAlive: true });
const req = request({
	agent,
	hostname: '127.0.0.1',
	port: 3000,
	method: 'POST',
	path: '/profile',
	headers: {
		'Content-Type': 'application/json',
		name: 'Jonnie',
	},
});

req.on('response', (response) => {
	console.log('----- STATUS: -----');
	console.log(response.statusCode);

	console.log('----- HEADERS -----');
	console.log(response.headers);

	console.log('----- BODY: -----');

	response.on('data', (chunk) => {
		console.log(JSON.parse(chunk.toString('utf-8')));
	});

	response.on('end', () => {
		console.log('Data transmission complete');
	});
});

req.on('error', () => console.log('Server unreachable'));

// keeps the connection open even after all data has been transmitted
// req.write(
// 	JSON.stringify({ message: 'This application works like the fetch api' })
// );

// closes the connection immediately after the last data has been transmitted
req.end(
	JSON.stringify({ message: 'This application works like the fetch api' })
);
