'use strict';
const websockerBlock = document.querySelector('.websocket');
const websocketCells = websockerBlock.querySelectorAll('div');

const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

connection.addEventListener('message', event => {
  selectCell(websocketCells, event.data);
});

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Work is done');
})