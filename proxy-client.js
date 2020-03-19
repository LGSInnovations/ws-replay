export default () => {
	document.title = 'WsReplay';
	const h1Title = document.querySelector('h1');
	h1Title.innerText = 'WsReplay';

	const actionsDiv = document.querySelector('#actions');
	actionsDiv.classList.add('inline');
	let startTime;
	const mainActions = {capture: false, stop: true, inject: false};
	const setMainAction = str => {
		Object.keys(mainActions).forEach(key => {
			if (str === key) {
				mainActions[key] = true;
			} else {
				mainActions[key] = false;
			}
		});
	};
	const activity = document.querySelector('#activity');
	const captures = document.querySelector('#captures');
	const ws = new WebSocket(`ws://${location.host}`);

	const timeTip = 'time (ms to wait)';
	const msgTip = 'message text to send to client via websocket';
	ws.onmessage = function (event) {
		if (mainActions.capture) {
			activity.innerHTML = '';
			captures.insertAdjacentHTML('beforeend', 
			`<div>
				time: <input class="time" title="${timeTip}" placeholder="${timeTip}" value="${Date.now() - startTime}">
				message: <textarea class="msg" title="${msgTip}" placeholder="${msgTip}">${event.data}</textarea>
			</div>`);
		} else if (mainActions.stop) {
			activity.innerHTML = event.data;
			setTimeout(() => {
				activity.innerHTML = '';
			}, 2000);
		}
	};

	actionsDiv.insertAdjacentHTML('beforeend', Object.keys(mainActions).map(key => 
		`<span>
			<input type="radio" name="action" id="${key}" ${mainActions[key] ? 'checked' : ''}>
			${key}
		</span>`).join('\n'));
	actionsDiv.addEventListener('click', event => {
		const oldMainActions = {...mainActions};
		setMainAction(event.target.id);
		if (mainActions.inject) {
			activity.innerHTML = '';
			ws.send(JSON.stringify(Array.from(captures.children).map(div => ({
				time: div.querySelector('.time').value,
				msg: div.querySelector('.msg').value
			}))));
		} else {
			ws.send('[]'); // not always needed
		}
		if (mainActions.capture) {
			startTime = Date.now();
		}
	});

	const aside = document.querySelector('aside'); // todo get 3002 from server via msg?
	aside.insertAdjacentHTML('beforeend', `
		<iframe id="watched"
			src="http://localhost:3002">
		</iframe>
	`);
}
