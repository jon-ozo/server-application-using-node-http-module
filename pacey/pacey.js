const { pipeline } = require('node:stream/promises');
const { createServer } = require('node:http');
const { open } = require('node:fs/promises');

class Pacey {
	constructor() {
		this.server = createServer();
		this.routes = {};

		this.server.on('request', (req, res) => {
			res.sendFile = async (path, mimeType) => {
				const fileHandle = await open(path, 'r');
				const fileStream = fileHandle.createReadStream();

				res.setHeader('Content-Type', [mimeType]);
				// fileStream.pipe(res);
				await pipeline(fileStream, res);
			};

			res.status = (code) => {
				res.statusCode = code;
				return res;
			};

			res.json = (obj) => {
				res.setHeader('Content-Type', ['application/json']);
				res.end(JSON.stringify(obj));
			};

			if (!this.routes[req.method.toLowerCase() + ' ' + req.url]) {
				return res
					.status(404)
					.json({ error: `Can not ${req.method} resource at ${req.url}` });
			}

			this.routes[req.method.toLowerCase() + ' ' + req.url](req, res);
		});
	}

	route(reqMethod, path, fn) {
		this.routes[reqMethod + ' ' + path] = fn;
	}

	listen(port, fn) {
		return this.server.listen(port, fn());
	}
}

module.exports = Pacey;
