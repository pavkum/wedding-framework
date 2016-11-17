var Wedding = Wedding || {};

(function () {
  'use strict';

  let wheelDelta = 0;
  let throttle = null;

  let scrollCheck = function () {
    throttle = null;

    if (wheelDelta > 0) {
      // next page
      Wedding.Utils.trigger('next:page');
    } else {
      // previousPage
      Wedding.Utils.trigger('previous:page');
    }

    wheelDelta = 0;
  };

  document.addEventListener('wheel', function (event) {
    wheelDelta = event.wheelDelta;

    if (throttle) {
      clearTimeout(throttle);
      throttle = setTimeout(scrollCheck, 100);
    }
  });

  document.addEventListener('keyup', function (event) {
    let keyCode = event.keyCode;

    if (keyCode === 37 || keyCode === 38) {
      // previous page
      Wedding.Utils.trigger('previous:page');
    }

    if (keyCode === 39 || keyCode === 40) {
      // next page
      Wedding.Utils.trigger('next:page');
    }
  });
})();
