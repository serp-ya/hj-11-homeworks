'use strinct';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
document.addEventListener('click', clickInfo);
window.addEventListener('beforeunload', closeConnection);
showBubbles(connection);

function clickInfo(event) {
  connection.send(JSON.stringify({
    'x': event.clientX,
    'y': event.clientY
  }));
}

function closeConnection() {
  connection.close(1000, 'Соединение закрыто');
}
