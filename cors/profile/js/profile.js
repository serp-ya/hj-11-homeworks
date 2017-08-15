'use strict';
const clearPortFromURLPattern = /:{1}\d+/;
addScriptWithPromises('https://neto-api.herokuapp.com/profile/me', 'whatever')
  .then(loadData)
  .then(res => addScriptWithPromises(`https://neto-api.herokuapp.com/profile/${res.id}/technologies`, 'whatever'))
  .then(loadData);
document.addEventListener('DOMContentLoaded', showContent);

function addScriptWithPromises(url, callbackName) {
  return new Promise((done, fail) => {
    let callbackUrl = `${url}?callback=${callbackName}`;
    window[callbackName]= done;

    const script = document.createElement('script');
    script.src = callbackUrl;
    document.body.appendChild(script);
});
}

function showContent() {
  document.querySelector('.content').style.display = 'initial';
}

function loadData(data) {
  if (!Array.isArray(data)) {
    Object.keys(data).forEach((key) => {
      if (key === 'id') {
      return;

    } else if (key != 'pic') {
      document.querySelector(`[data-${key}]`).append(data[key]);

    } else {
      let cleanKey = data[key].replace(clearPortFromURLPattern, '');
      document.querySelector(`[data-${key}]`).src = cleanKey;
    }
  });
  } else {
    document.querySelector(`[data-technologies]`).innerHTML = data.reduce(function (result, tech) {
      return result += `<span class="devicons devicons-${tech}"></span>`;
    }, '');
  }
  return data;
}