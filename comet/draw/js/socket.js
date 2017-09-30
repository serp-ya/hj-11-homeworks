'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', event => {
  editor.addEventListener('update', sendImage);
});

connection.addEventListener('close', event => {
  editor.removeEventListener('update', sendImage);
});

connection.addEventListener('error', error => {
  console.error(error.data);
})

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Work is done');
});

function sendImage(event) {
  event.canvas.toBlob(blob => connection.send(blob));
}