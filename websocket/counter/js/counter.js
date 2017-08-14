'use strinct';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter = document.querySelector('.counter');
const errorBox = document.querySelector('output.errors');

connection.addEventListener('message', takeMessage);
window.addEventListener('beforeunload', closeConnection);

function takeMessage(event) {
  const data = JSON.parse(event.data);
  counter.innerText = data.connections;
  errorBox.innerText = data.errors;
}

function closeConnection() {
  connection.close(1000, 'Соединение закрыто');
}
