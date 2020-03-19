# ws-replay
WsReplay is a small tool for capturing hard-to-replicate websocket messages so they can be replayed for frontend development

For a professional tool, consider one of these tools that existed before this project:
	https://github.com/mitmproxy/mitmproxy
	https://github.com/mock-server/mockserver
	https://github.com/Stuk/server-replay

## Work List
did create example webapp with server and client
did let example server stream messages to client via websocket
did let client display stream
did create proxy with server and client
did let proxy client display the example stream by proxying
did give example client buttons: Server, send me numbers and Server, stop sending numbers
did give proxy main actions: capture/stop/inject radio
did make proxy main actions capture/stop/ work
did let proxy inject in loop so example client is forced to see letters or numbers
did improve display to clarify what is time vs msg
let command line arg give WsReplayUI port
let command line argument determine whether or not example is shown
let WsReplayUI accept and send port of proxied/watched server and port for proxied/watched client
create github project
give proxy save button
let proxy client save to file
let proxy client load from file
allow user to remove a time+message pair or add one
let proxy client display multiple exported/imported data sets?
let example client and server share heartbeats?
create written tests
