'use strict';
const forms = document.querySelectorAll('form');
forms.forEach(form => form.addEventListener('click', sendForm));

function sendForm(event) {
  if (event.target.classList.contains('button')) {
    event.preventDefault();
    const thatForm = event.currentTarget;
    const formData = new FormData(thatForm);
    const data = {};
    let serverURL = 'https://neto-api.herokuapp.com/';
    let informationField = thatForm.querySelector('.error-message');

    for (const [fieldName, fieldData] of formData) {
      data[fieldName] = fieldData;
    }

    if (thatForm.classList.contains('sign-in-htm')) {
      serverURL += 'signin';
    } else if (thatForm.classList.contains('sign-up-htm')) {
      serverURL += 'signup';
    }

    makeRequest(serverURL, data)
      .then((response) => {
        if (200 <= response.status && response.status < 300) {
          return response;
        }
        throw new Error(response.statusText);
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          informationField.innerHTML = data.message;
        } else {
          informationField.innerHTML = `Пользователь ${data.name} успешно ${thatForm.classList.contains('sign-in-htm') ? 'авторизован' : 'зарегистрирован'}`;
        }
      })
      .catch((error) => console.error(error));
  }
}

function makeRequest(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}