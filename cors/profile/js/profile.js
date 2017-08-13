'use strict';
const clearPortFromURLPattern = /:{1}\d+/;
addScript('https://neto-api.herokuapp.com/profile/me?callback=loadData');
document.addEventListener('DOMContentLoaded', showContent);

function addScript(src) {
  const elem = document.createElement("script");
  elem.src = src;
  document.body.appendChild(elem);
}

function showContent() {
  document.querySelector('.content').style.display = 'initial';
}

function loadData(data) {
  Object.keys(data).forEach((key) => {
    if (key === 'id') {
      addScript(`https://neto-api.herokuapp.com/profile/${data.id}/technologies?callback=loadTechnologies`);

    } else if (key != 'pic') {
      document.querySelector(`[data-${key}]`).append(data[key]);

    } else {
      let cleanKey = data[key].replace(clearPortFromURLPattern, '');
      document.querySelector(`[data-${key}]`).src = cleanKey;
    }
  });
}

function loadTechnologies(data) {
  document.querySelector(`[data-technologies]`).innerHTML = data.reduce(function (result, tech) {
    return result += `<span class="devicons devicons-${tech}"></span>`;
  }, '');
}
