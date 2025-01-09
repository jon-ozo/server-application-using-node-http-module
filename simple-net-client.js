// using the net module to send http requests

const { createConnection } = require('node:net');
const { Buffer } = require('node:buffer');

const client = createConnection(3000, '127.0.0.1', () => {
	const head = client.write(
		Buffer.from(
			'504f5354202f70726f66696c6520485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a204a6f6e6e69650d0a486f73743a203132372e302e302e313a333030300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2035350d0a0d0a',
			'hex'
		)
	);
	const body = client.write(
		Buffer.from(
			'7b226d657373616765223a2254686973206170706c69636174696f6e20776f726b73206c696b652074686520666574636820617069227d',
			'hex'
		)
	);

	client.on('end', () => {
		Buffer.concat([head, body]);
		console.log('Data transmission complete. Connection closed');
	});

	// client.on('data', (chunk) => {

	// });
});
