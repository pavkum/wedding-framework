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
      },
      'my-animation-two': {
        duration: '900',
        easing: 'easeIn',
        // slide-left, slide-right, slide-top, slide-bottom, fadeOut, fadeIn
        command: 'slide-top',
        loop: false,
        delay: 0
      },
      'my-animation-three': {
        duration: '900',
        easing: 'easeIn',
        // slide-left, slide-right, slide-top, slide-bottom, fadeOut, fadeIn
        command: 'slide-right',
        loop: false,
        delay: 0
      },
      'my-animation-four': {
        duration: '900',
        easing: 'easeIn',
        // slide-left, slide-right, slide-top, slide-bottom, fadeOut, fadeIn
        command: 'slide-bottom',
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
      'my-photo-page-one': {
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
      'my-photo-page-two': {
        text: 'hello',
        style: {
          fontSize: '2.2rem',
          fontFamily: 'Roboto',
          color: 'red',
          // x, y
          position: [15, 15],
          width: 10,
          height: 10
        },
        page: 1,
        animation: {
          enter: 'my-animation-two',
          exit: 'my-animation-two'
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
          enter: 'my-animation-three',
          exit: 'my-animation-three'
        }
      },
      'my-photo-two-page-two': {
        text: 'hello000',
        style: {
          font: 'my-font',
          'font-size': 1.2,
          // x, y
          position: [20.1, 20.2],
          width: 10,
          height: 10
        },
        page: 2,
        animation: {
          enter: 'my-animation-four',
          exit: 'my-animation-four'
        }
      }
    }
  };

})();
