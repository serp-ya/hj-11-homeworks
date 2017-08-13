'use strict';
const clearPortFromURLPattern = /:{1}\d+/;

function addScript(src) {
  const elem = document.createElement("script");
  elem.src = src;
  document.body.appendChild(elem);
}

function fillWidget(data) {
  Object.keys(data).forEach((key) => {
    if (['wallpaper', 'pic'].every(attr => attr != key)) {
      document.querySelector(`[data-${key}]`).append(data[key]);

    } else {
      let cleanKey = data[key].replace(clearPortFromURLPattern, '');
      document.querySelector(`[data-${key}]`).src = cleanKey;
    }
  })
}

addScript('https://neto-api.herokuapp.com/twitter/jsonp?callback=fillWidget');
