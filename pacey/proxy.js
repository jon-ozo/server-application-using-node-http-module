const { createServer, request } = require('http');

// The proxy's port
const PORT = 9000;

// List of backend servers
const mainServers = [
	{ host: 'localhost', port: 9001 },
	{ host: 'localhost', port: 9002 },
];

// Create the proxy server
const proxy = createServer();

proxy.on('request', (clientRequest, proxyResponse) => {
	// Select a server to route the incoming request to (using round-robin algorithm)
	let mainServer = mainServers.shift();
	mainServers.push(mainServer);

	// Send request to one of the main servers
	const proxyRequest = request({
		host: mainServer.host,
		port: mainServer.port,
		path: clientRequest.url,
		method: clientRequest.method,
		headers: clientRequest.headers,
	});

	// handle response from one of the main servers
	proxyRequest.on('response', (mainServerResponse) => {
		// Set the status code and headers for the response to the client
		proxyResponse.writeHead(
			mainServerResponse.statusCode,
			mainServerResponse.headers
		);

		// write the main server's response to the proxy's response
		// and send the response to the client
		mainServerResponse.pipe(proxyResponse);
	});

	proxyRequest.on('error', (err) => {
		console.log(err.message);
	});

	// Write the body of the client's request to the body of proxy's request being made
	// to one of our servers
	clientRequest.pipe(proxyRequest);
});

proxy.listen(PORT, () => {
	console.log(`Proxy server is now listening on port ${PORT}`);
});
