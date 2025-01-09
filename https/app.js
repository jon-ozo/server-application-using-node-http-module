const { get } = require('node:https');

// const agent = new http.Agent({ keepAlive: true });
// console.log(agent);

get('https://www.google.com', (res) => {
	res.on('data', (chunk) => {
		console.log('Data chunk: ', chunk);
	});
	res.on('end', () => {
		console.log('Data streaming complete');
	});
});
