'use strict';
const clearPortFromURLPattern = /:{1}\d+/;

function addScriptWithPromises(url) {
  return new Promise((done, fail) => {
    window.fillWidget = done;
    const script = document.scripts[0].cloneNode();
    script.src = url;
    document.body.appendChild(script);
});
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

addScriptWithPromises('https://neto-api.herokuapp.com/twitter/jsonp?callback=fillWidget');