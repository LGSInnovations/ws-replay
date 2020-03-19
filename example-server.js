const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const html = fs.readFileSync('index.html');
const clientScript = fs.readFileSync('example-client.js');

let port = 3000;
const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') return res.end('');
	if (req.url === '/script') {
		res.setHeader("Content-Type", "text/javascript");
		return res.end(clientScript);
	}
	res.end(html);
}).listen(port);
console.info(`Open browser to localhost:${port}`);

const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
	let interval;
	ws.on('message', function incoming(message) {
		// console.log('received: %s', message);
		if (message === 'numbers') {
			let count = 0;
			interval = setInterval(() => {
				ws.send(count++);
			}, 500);
		} else if (message === 'stop') {
			clearInterval(interval);
		}
	});
});
