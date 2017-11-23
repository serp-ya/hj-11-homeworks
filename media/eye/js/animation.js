'use strict';
const eyeBall = document.querySelector('.big-book__eye');
const eyePupil = document.querySelector('.big-book__pupil');

window.addEventListener('mousemove', event => {
  // Размеры и позиция тела сайта
  const bodyBCR = document.body.getBoundingClientRect();

  // Размены окна браузера
  const windowSize = {
    width: window.innerWidth,
    height: document.documentElement.clientHeight
  };

  // Размеры и позиция глазного яблока
  const eyeBallBCR = eyeBall.getBoundingClientRect();
  const eyeBallSize = {
    width: eyeBallBCR.width,
    height: eyeBallBCR.height
  };

  // Определение положения центра глазного яблока
  const eyeBallCenterPosition = {
    //// Левая граница глаза - левая граница body + половина ширины глаза
    x: (eyeBallBCR.left - bodyBCR.left) + (eyeBallSize.width / 2),
    //// Верхняя граница глаза - верхняя граница body + половина высоты глаза
    y: (eyeBallBCR.top - bodyBCR.top) + (eyeBallSize.height / 2)
  };

  // Позиция курсора мыши
  const mousePos = {
    x: event.pageX,
    y: event.pageY
  };

  const pupilPositionX = function() {
    // Определяем отступы слева и справа от центра глаза до края экрана
    const positionXOffsetRange = {
      //// От отрицательное значение отслупа слева до центра глаза
      from: -eyeBallCenterPosition.x,
      //// Полная ширина экрана минус отступ слева до центра глаза
      to: windowSize.width - eyeBallCenterPosition.x
    };

    // Положение мышки относительно центра глаза по оси X
    const differenceX = mousePos.x - eyeBallCenterPosition.x;

    // Рассчитываем соотношение координат в процентах относительно центра глаза по оси X
    const positionXPercent = (function () {
      // Если положение от центра глаза отрицательное (смещенеие курсора влево)
      if (differenceX < 0) {
        //// Возвращаем отрицательное процентное соотношение смещения курсора от центра глаза
        //// к началу отсчёта смещения слева
        return (-(differenceX / positionXOffsetRange.from) * 100);

        // Если положение от центра глаза положительное (смещенеие курсора вправо)
      } else if (differenceX > 0) {
        //// Возвращаем процентное соотношение смещения курсора к крайней правой точке экрана
        return ((differenceX / positionXOffsetRange.to) * 100);
      }

      // Если значение === 0, возвращаем 0
      return 0;
    })();

    return positionXPercent;
  };

  const pupilPositionY = function() {
    // Положение мышки относительно центра глаза по оси Y
    const differenceY = mousePos.y - eyeBallCenterPosition.y;

    // Рассчитываем соотношение координат в процентах относительно центра глаза по оси Y
    const positionYPercent = (function () {
      // Если положение от центра глаза отрицательное (смещение курсора вверх)
      if (differenceY < 0) {
        //// Рассчитываем разницу от верхнего края окна браузера + половина высоты глаза
        const eyeBallOffsetFromWindowTop = (eyeBallBCR.top + (eyeBallSize.height / 2));
        //// Возвращаем разницу смещения курсора к отступу от верхней части окна браузера * 100%
        return ((differenceY / eyeBallOffsetFromWindowTop) * 100);

      // Если положение от центра глаза положительное (смещение курсора вниз)
      } else if (differenceY > 0) {
        //// Рассчитываем разницу от нижнего края окна браузера + половина высоты глаза
        const eyeBallOffsetFromWindowBottom = windowSize.height - (eyeBallBCR.bottom - (eyeBallSize.height / 2));
        //// Возвращаем разницу смещения курсора к отступу от нижней части окна браузера * 100%
        return ((differenceY / eyeBallOffsetFromWindowBottom) * 100);
      }

      return 0;
    })();

    return positionYPercent;
  };

  const pupilPositionXPercent =  pupilPositionX();
  const pupilPositionYPercent =  pupilPositionY();

  const pupilSize = function () {
    // Приводим полученные проценты соотношения сторон глаза с курсором к положительным числам
    const pointX = pupilPositionXPercent * Math.sign(pupilPositionXPercent);
    const pointY = pupilPositionYPercent * Math.sign(pupilPositionYPercent);

    // Формула - 100% минус сумма процентов координат, деленных на 2 (т.к. два числа), умноженное на 0.03,
    // чтобы полученное число приводить к максимально допустимому по ТЗ - к трём
    const calculatedSize = ((100 - ((pointX + pointY) / 2)) * 0.03);

    // Если высчитанное число меньше 1, возвращаем 1, в соответствие с ТЗ
    return calculatedSize >= 1 ? calculatedSize : 1;
  };

  eyePupil.style.setProperty('--pupil-x', `${pupilPositionXPercent * 0.3}px`);
  eyePupil.style.setProperty('--pupil-y', `${pupilPositionYPercent * 0.3}px`);
  eyePupil.style.setProperty('--pupil-size', pupilSize());
});