'use strict';
function createElement(data) {
  if (typeof data === 'string') {
    return document.createTextNode(data);
  }

  if (objectCheck(data)) {
    const node = document.createElement(data.name);

    if (objectCheck(data.props)) {
      Object.keys(data.props).forEach(key => {
        node.setAttribute(key, data.props[key]);
      })
    }

    if (Array.isArray(data.childs)) {
      data.childs.forEach(child => node.appendChild(createElement(child)));
    }
    return node;
  }

  function objectCheck(data) {
    return (typeof data === 'object' && !(Array.isArray(data)) && data !== null);
  }
}