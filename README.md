# ws-replay
WsReplay is a small tool for capturing hard-to-replicate websocket messages so they can be replayed for frontend development

To use:
- git clone https://github.com/LGSInnovations/ws-replay.git
- cd ws-replay
- npm install
- node example-server.js &
- node proxy-server.js
- (Point browser to localhost:3001)

![screenshot1](https://user-images.githubusercontent.com/3712209/77108227-733d9900-69e7-11ea-8b74-7bd6d52dc2af.png)

For a professional tool, consider one of these tools that existed before this project:

- https://github.com/mitmproxy/mitmproxy
- https://github.com/mock-server/mockserver
- https://github.com/Stuk/server-replay

## Work List

- did create example webapp with server and client
- did let example server stream messages to client via websocket
- did let client display stream
- did create proxy with server and client
- did let proxy client display the example stream by proxying
- did give example client buttons: Server, send me numbers and Server, stop sending numbers
- did give proxy main actions: capture/stop/inject radio
- did make proxy main actions capture/stop/ work
- did let proxy inject in loop so example client is forced to see letters or numbers
- did improve display to clarify what is time vs msg
- let command line arg give WsReplayUI port
- let command line argument determine whether or not example is shown
- let WsReplayUI accept and send port of proxied/watched server and port for proxied/watched client
- create github project
- give proxy save button
- let proxy client save to file
- let proxy client load from file
- allow user to remove a time+message pair or add one
- let proxy client display multiple exported/imported data sets?
- let example client and server share heartbeats?
- create written tests
