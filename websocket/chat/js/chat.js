'use strinct';
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chatBox = document.querySelector('.chat');
const inputField = chatBox.querySelector('.message-input');
const submitBtn = chatBox.querySelector('.message-submit');
const chatStatus = chatBox.querySelector('.chat-status');

const messagesContent = chatBox.querySelector('.messages-content');
const messageTamplatesAll = chatBox.querySelectorAll('.message');
let messageTamplates = {};

(function (tamplates) {
  tamplates.forEach(element => {
    if (element.classList.contains('loading')) {
      messageTamplates.loading = element;

    } else if (element.classList.contains('message-personal')) {
      messageTamplates.outgoing = element;

    } else if (element.classList.contains('message-status')) {
      messageTamplates.status = element;

    } else {
      messageTamplates.incoming = element;
    }
  });
})(messageTamplatesAll);

connection.addEventListener('open', startChat);
connection.addEventListener('message', takeMessage);
connection.addEventListener('close', sayGoodBye);
window.addEventListener('beforeunload', closeConnection);

submitBtn.addEventListener('click', sendMessage);
document.addEventListener('keydown', sendMessage);

function getCurrentTime() {
  const date = new Date;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

function startChat() {
  const userOnlineMessage = messageTamplates.status.cloneNode();
  userOnlineMessage.innerText = 'Пользователь появился в сети';

  submitBtn.disabled = false;
  chatStatus.innerText = chatStatus.dataset.online;
  messagesContent.appendChild(userOnlineMessage);
}

function takeMessage(event) {
  let newMessage;
  if (event.data === '...') {
    newMessage = messageTamplates.loading.cloneNode(true);
    messagesContent.appendChild(newMessage);

  } else {
    newMessage = messageTamplates.incoming.cloneNode(true);
    newMessage.querySelector('.message-text').innerText = event.data;
    newMessage.querySelector('.timestamp').innerText = getCurrentTime();
    messagesContent.appendChild(newMessage);

    messagesContent.querySelector('.loading').remove();
  }
}

function sendMessage(event) {
  if ((event.code === 'Enter' || event.target === submitBtn) && !submitBtn.disabled) {
    event.preventDefault();

    if (inputField.value) {
      let newMessage = messageTamplates.outgoing.cloneNode(true);;
      newMessage.querySelector('.message-text').innerText = inputField.value;
      newMessage.querySelector('.timestamp').innerText = getCurrentTime();
      messagesContent.appendChild(newMessage);

      connection.send(inputField.value);
      inputField.value = null;
    }
  }
}

function sayGoodBye() {
  const userOfflineMessage = messageTamplates.status.cloneNode();
  userOfflineMessage.innerText = 'Пользователь не в сети';

  submitBtn.disabled = true;
  chatStatus.innerText = chatStatus.dataset.offline;
  messagesContent.appendChild(userOfflineMessage);
}

function closeConnection() {
  connection.close(1000, 'Соединение закрыто');
}