'use strict';
const tableHeaders = document.getElementsByTagName('th');

function handleTableClick(event) {
  let targetData = event.target.dataset;
  let sortOrder = targetData.propName;

  if (!targetData.dir) {
      targetData.dir = 1;
  } else {
      targetData.dir *= -1;
  }
  event.stopPropagation();
  table.dataset.sortBy = sortOrder;
  sortTable(sortOrder, targetData.dir);
}

for (let header of tableHeaders) {
    header.addEventListener('click', handleTableClick)
}