'use strict';
const clearPortFromURLPattern = /:{1}\d+/;

function addScriptWithPromises(url, callbackName) {
  return new Promise((done, fail) => {
    let callbackUrl = `${url}?callback=${callbackName}`;
    window[callbackName]= done;

    const script = document.createElement('script');
    script.src = callbackUrl;
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

addScriptWithPromises('https://neto-api.herokuapp.com/twitter/jsonp', 'whatever').then(fillWidget);