const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
var httpProxy = require('http-proxy');

const html = fs.readFileSync('index.html');
const clientScript = fs.readFileSync('proxy-client.js');

let portForThisUi = 3001; // should get from command line arg?
const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') return res.end('');
	if (req.url === '/script') {
		res.setHeader("Content-Type", "text/javascript");
		return res.end(clientScript);
	}
	res.end(html);
}).listen(portForThisUi);
console.info(`Open browser to localhost:${portForThisUi}`);

const wssForThisUi = new WebSocket.Server({ server });

let thisUiWebSocket, theOtherClientWebsocket, theOtherServerWebsocket;
let stopped = true;

wssForThisUi.on('connection', function connection(ws) {
	thisUiWebSocket = ws;

	thisUiWebSocket.on('message', function incoming(message) {
		const toInject = JSON.parse(message);
		if (toInject.length) {
			stopped = false;
			inject(toInject);
		} else {
			stopped = true;
		}
	});
});

const theOtherServerPort = 3000;
const target = 'http://localhost:' + theOtherServerPort; // should get from input?
const portForTheOtherClient = 3002; // should get from input?
const proxy = httpProxy.createProxyServer({});
const httpForTheOtherClient = http.createServer((req, res) => {
	proxy.web(req, res, {target});
}).listen(portForTheOtherClient);
console.info(`Open browser to localhost:${portForTheOtherClient}`);

const wssForTheOtherClient = new WebSocket.Server({server: httpForTheOtherClient});


wssForTheOtherClient.on('connection', function connection(ws) {
	theOtherClientWebsocket = ws;

	theOtherServerWebsocket = new WebSocket(target);
	theOtherServerWebsocket.on('message', (message) => {
		thisUiWebSocket.send(message);
		theOtherClientWebsocket.send(message);
	});

	theOtherClientWebsocket.on('message', (message) => {
		theOtherServerWebsocket.send(message);
	});
});

function inject(toInject) {
	toInject.forEach(({time, msg}) => {
		setTimeout(() => {
			if (!stopped && theOtherClientWebsocket) {
				theOtherClientWebsocket.send(msg);
			}
		}, time);
	});
	setTimeout(() => {
		if (!stopped) {
			inject(toInject);
		}
	}, toInject.slice(-1)[0].time);
}
