var Wedding = Wedding || {};
(function () {
  'use strict';

  Wedding.Config = {
    animations: {
      'my-animation': {
        duration: '900',
        easing: 'easeIn',
        // slide-left, slide-right, slide-top, slide-bottom, fadeOut, fadeIn
        command: 'slide-left',
        loop: false,
        delay: 0
      }
    },
    fonts: {
      'roboto': {
        type: 'google',
        id: 'Roboto',
        weight: 'normal'
      }
    },
    elements: {
      'my-photo': {
        text: 'hello',
        style: {
          font: 'my-font',
          'font-size': 1.2,
          // x, y
          position: [10, 10],
          width: 10,
          height: 10
        },
        page: 1,
        animation: {
          enter: 'my-animation',
          exit: 'my-animation'
        }
      },
      'my-photo-two': {
        text: 'hello',
        style: {
          font: 'my-font',
          'font-size': 1.2,
          // x, y
          position: [20, 20],
          width: 10,
          height: 10
        },
        page: 2,
        animation: {
          enter: 'my-animation',
          exit: 'my-animation'
        }
      }
    }
  };

})();
