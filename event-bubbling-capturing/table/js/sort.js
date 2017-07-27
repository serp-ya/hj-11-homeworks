'use strict';
function handleTableClick(event) {
  if (event.target.tagName === 'TH') {
    let targetData = event.target.dataset;

    if (!targetData.dir) {
      targetData.dir = 1;
    } else {
      targetData.dir *= -1;
    }

    table.dataset.sortBy = targetData.propName;
    sortTable(targetData.propName, targetData.dir);
  }
}