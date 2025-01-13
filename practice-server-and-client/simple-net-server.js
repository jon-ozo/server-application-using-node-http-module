const { createServer } = require('node:net');
const { Buffer } = require('node:buffer');

const PORT = 5500;
const server = createServer((socket) => {
	socket.on('data', (chunk) => {
		const data = chunk.toString('utf-8');
		console.log(data);
	});

	socket.on('end', () => {
		const data = Buffer.from(
			'7b226d657373616765223a225375636365737366756c6c792072656365697665642064617461227d',
			'hex'
		);
		socket.write(data);
		socket.setKeepAlive(false);
	});
});

server.listen(PORT, '127.0.0.1', () =>
	console.log('Server listening on ', server.address())
);
