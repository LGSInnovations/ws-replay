export default () => {
	document.title = 'Example';
	const h1Title = document.querySelector('h1');
	h1Title.innerText = 'Example Client';

	const activity = document.querySelector('#activity');
	const ws = new WebSocket(`ws://${location.host}`);

	ws.onmessage = function (event) {
		activity.innerHTML = event.data;
	};

	const actionsDiv = document.querySelector('#actions');
	actionsDiv.insertAdjacentHTML('beforeend', `<button id="send">Server, send me numbers</button>`);
	document.querySelector('button#send').addEventListener('click', event => {
		ws.send('numbers');
	});
	actionsDiv.insertAdjacentHTML('beforeend', `<button id="stop">Server, stop sending numbers</button>`);
	document.querySelector('button#stop').addEventListener('click', event => {
		ws.send('stop');
	});
}
