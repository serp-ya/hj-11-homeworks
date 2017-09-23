'use strict';
const planeSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
[btnSetFull, btnSetEmpty].forEach(btn => btn.disabled = true);

btnSeatMap.addEventListener('click', changeScheme);

function changeScheme(event) {
  event.preventDefault();
  return fetch(`https://neto-api.herokuapp.com/plane/${planeSelect.value}`)
    .then(res => res.json())
    .then(showSchemeEngine)
    .catch(console.error);
}

function showSchemeEngine(data) {
  cleanContent();
  setTitle();
  insertScheme();
  numberingRows();
  changeCounts();

  if ([btnSetFull, btnSetEmpty].some(btn => btn.disabled === true)) {
    enableControlBtns();
  }

  const seatsElements = document.querySelectorAll('.seat');
  seatsElements.forEach(el => el.addEventListener('click', selectSeatEngine));

  btnSetFull.addEventListener('click', setFullSeats);
  btnSetEmpty.addEventListener('click', setEmptySeats);

  function cleanContent() {
    const oldRows = seatMapDiv.querySelectorAll('*');
    if (oldRows) {
      oldRows.forEach(el => el.remove());
    }
  }

  function setTitle() {
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
  }

  function insertScheme() {
    data.scheme.forEach(layout => {
      if (layout === 6) {
        seatMapDiv.appendChild(createSeatRow(data.letters6));
      } else if (layout === 4) {
        seatMapDiv.appendChild(createSeatRow(data.letters4));
      } else {
        seatMapDiv.appendChild(createSeatRow());
      }
    });
  }

  function numberingRows() {
    const seatMapTitles = seatMapDiv.querySelectorAll('h2');
    seatMapTitles.forEach((el, i) => el.textContent = ++i);
  }

  function enableControlBtns() {
    [btnSetFull, btnSetEmpty].forEach(btn => btn.disabled = false);
  }

  function selectSeatEngine(event) {
    event.preventDefault();
    if (event.altKey) {
      this.classList.toggle('half');
      this.classList.remove('adult');
    } else {
      this.classList.toggle('adult');
      this.classList.remove('half');
    }

    changeCounts();
  }

  function changeCounts() {
    const adultSeats = document.querySelectorAll('.adult');
    const halfPriceSeats = document.querySelectorAll('.half');

    if (adultSeats) {
      totalAdult.textContent = adultSeats.length;
    } else {
      totalAdult.textContent = 0;
    }

    if (halfPriceSeats) {
      totalHalf.textContent = halfPriceSeats.length;
    } else {
      totalHalf.textContent = 0;
    }

    totalPax.textContent = (data.passengers - +totalHalf.textContent - +totalAdult.textContent);
  }

  function setFullSeats(event) {
    event.preventDefault();
    const seatsList = document.querySelectorAll('.seat');
    seatsList.forEach(seat => {
      seat.classList.remove('half');
      seat.classList.add('adult');
      changeCounts();
    });
  }

  function setEmptySeats(event) {
    event.preventDefault();
    const seatsList = document.querySelectorAll('.seat');
    seatsList.forEach(seat => {
      seat.classList.remove('half');
      seat.classList.remove('adult');
      changeCounts();
    });
  }
}

function createSeatRow(labels) {
  // Логика всей функции
  const row = document.createElement('div');
  ['row', 'seating-row', 'text-center']
    .forEach(className => row.classList.add(className));

  const rowNumberBlock = document.createElement('div');
  ['col-xs-1', 'row-number']
    .forEach(className => rowNumberBlock.classList.add(className));

  rowNumberBlock.appendChild(document.createElement('h2'));

  [rowNumberBlock, createSeats(labels)]
    .forEach(node => row.appendChild(node));

  // Реализация создания ряда
  function createSeats(labelsList) {
    const fragment = document.createDocumentFragment();
    const halfRowContainer = document.createElement('div');
    halfRowContainer.classList.add('col-xs-5');

    const classesSeat = ['col-xs-4', 'seat'];
    const classesNoSeat = ['col-xs-4', 'no-seat'];

    // Флаг проверки создания первой половины ряда
    let halfCycleFlag = false;

    const filledHalfsOfRow = [halfRowContainer.cloneNode(), halfRowContainer.cloneNode()]
        .map(el => {
          el.appendChild(fillSeats(labelsList));
          return el;
        });

    filledHalfsOfRow.forEach(halfPart => fragment.appendChild(halfPart));

    function fillSeats(labelsList) {
      const seatsFragment = document.createDocumentFragment();
      const seatElement = document.createElement('div');

      const label = document.createElement('span');
      label.classList.add('seat-label');

      // заполняемость ряда зависит от переданного массива с лейблами
      if (!labelsList) {
        classesNoSeat.forEach(className => seatElement.classList.add(className));

        for (let i = 0; i <= 3; i++) {
          seatsFragment.appendChild(seatElement.cloneNode());
        }
      } else if (labelsList.length === 6) {
        const halfLabelsCount = (labelsList.length / 2) - 1;
        classesSeat.forEach(className => seatElement.classList.add(className));

        if (!halfCycleFlag) {
          for (let i = 0; i <= halfLabelsCount; i++) {
            createAndPushSeatPlace(i);
          }

          halfCycleFlag = true;
        } else {
          for (let i = halfLabelsCount + 1; i < labelsList.length; i++) {
            createAndPushSeatPlace(i);
          }
        }

      } else {
        const halfLabelsCount = (labelsList.length / 2) - 1;
        const emptySeat = seatElement.cloneNode();
        classesNoSeat.forEach(className => emptySeat.classList.add(className));

        classesSeat.forEach(className => seatElement.classList.add(className));

        if (!halfCycleFlag) {
          seatsFragment.appendChild(emptySeat);
          for (let i = 0; i <= halfLabelsCount; i++) {
            createAndPushSeatPlace(i);
          }

          halfCycleFlag = true;
        } else {
          for (let i = halfLabelsCount + 1; i < labelsList.length; i++) {
            createAndPushSeatPlace(i);
          }
          seatsFragment.appendChild(emptySeat);
        }
      }

      function createAndPushSeatPlace(labelCount) {
        const thatSeat = seatElement.cloneNode();
        const thatLabel = label.cloneNode();
        thatLabel.textContent = labelsList[labelCount];

        thatSeat.appendChild(thatLabel);
        seatsFragment.appendChild(thatSeat);
      }

      return seatsFragment;
    }

    return fragment;
  }

  return row;
}
