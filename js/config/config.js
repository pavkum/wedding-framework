var Wedding = Wedding || {};
(function () {
  'use strict';

  Wedding.Config = {
    animations: {
      'slide-down': {
        duration: '800',
        easing: 'easeIn',
        command: 'slide-down',
        loop: false,
        delay: 0
      },
      'slide-up': {
        duration: '800',
        easing: 'easeIn',
        command: 'slide-up',
        loop: false,
        delay: 0
      },
      'slide-left': {
        duration: '800',
        easing: 'easeIn',
        command: 'slide-left',
        loop: false,
        delay: 0
      },
      'slide-right': {
        duration: '800',
        easing: 'easeIn',
        command: 'slide-right',
        loop: false,
        delay: 0
      },
      'fade-in': {
        duration: '2000',
        easing: 'easeIn',
        command: 'fade-in',
        loop: false,
        delay: 0
      },
      'fade-out': {
        duration: '800',
        easing: 'easeIn',
        command: 'fade-out',
        loop: false,
        delay: 0
      }
    },
    fonts: {
      'roboto': {
        type: 'google',
        id: 'Roboto',
        weight: 'normal'
      },
      'great-vibes': {
        type: 'google',
        id: 'Great Vibes',
        weight: 'regular'
      }
    },
    elements: {
      'page-1-pre-wedding-image': {
        image: 'images/kalash.png',
        style: {
          width: '96rem',
          height: '60rem',
          right: '0rem',
          margin: 'auto',
          position: ['0rem', '2.5rem']
        },
        animation: {
          enter: 'slide-down',
          exit: 'slide-down'
        },
        page: 1
      },
      'page-1-vidya': {
        text: 'Vidya',
        style: {
          width: '20rem',
          color: 'white',
          fontSize: '4.5rem',
          fontFamily: 'Great Vibes',
          right: '0rem',
          margin: 'auto',
          textAlign: 'center',
          position: ['0rem', '70rem']
        },
        animation: {
          enter: 'slide-right',
          exit: 'slide-right'
        },
        page: 1
      },
      'page-1-weds': {
        text: 'Weds',
        style: {
          width: '20rem',
          color: 'white',
          fontSize: '2.5rem',
          fontFamily: 'Great Vibes',
          right: '0rem',
          margin: 'auto',
          textAlign: 'center',
          position: ['0rem', '77.5rem']
        },
        animation: {
          enter: 'fade-in',
          exit: 'fade-in'
        },
        page: 1
      },
      'page-1-vishwa': {
        text: 'Vishwa',
        style: {
          width: '20rem',
          color: 'white',
          fontSize: '4.5rem',
          fontFamily: 'Great Vibes',
          right: '0rem',
          margin: 'auto',
          textAlign: 'center',
          position: ['0rem', '82.5rem']
        },
        animation: {
          enter: 'slide-left',
          exit: 'slide-left'
        },
        page: 1
      },
      'page-2-pic': {
        image: 'images/vidya-2nd-page.jpg',
        style: {
          width: '40rem',
          height: '50rem',
          bottom: '0rem',
          margin: 'auto',
          borderRadius: '2.5rem',
          position: ['5rem', '0rem']
        },
        animation: {
          enter: 'slide-down',
          exit: 'slide-down'
        },
        page: 2
      },
      'page-2-excited-bride': {
        text: 'The excited bride...',
        style: {
          width: '35rem',
          fontSize: '4.5rem',
          fontFamily: 'Great Vibes',
          color: 'yellow',
          position: ['2.5rem', '2.5rem']
        },
        animation: {
          enter: 'slide-left',
          exit: 'slide-left'
        },
        page: 2
      },
      'page-2-bride-info': {
        text: 'who always day dreams about her fairy tale and over expressive. Simple talktive girl who loves to create memories all over the world. Very fond of photography who can be so crazy enough to go to the window, look up, and smile for a satellite pic',
        style: {
          width: '35rem',
          height: '45rem',
          fontSize: '4rem',
          fontFamily: 'Great Vibes',
          color: 'white',
          margin: 'auto',
          bottom: '0rem',
          right: '10rem',
          position: ['null', '0rem']
        },
        animation: {
          enter: 'slide-up',
          exit: 'slide-up'
        },
        page: 2
      },
      'page-3-pic': {
        image: 'images/vishwa-page-3.h',
        style: {
          width: '40rem',
          height: '50rem',
          margin: 'auto',
          bottom: '0rem',
          right: '5rem',
          borderRadius: '10rem',
          position: ['null', '0rem']
        },
        animation: {
          enter: 'slide-up',
          exit: 'slide-up'
        },
        page: 3
      },
      'page-3-handsome-groom': {
        text: 'The handsome groom...',
        style: {
          width: '45rem',
          fontSize: '4.5rem',
          fontFamily: 'Great Vibes',
          right: '5rem',
          color: 'yellow',
          textAlign: 'right',
          position: ['null', '2.5rem']
        },
        animation: {
          enter: 'slide-right',
          exit: 'slide-right'
        },
        page: 3
      },
      'page-4-groom-info': {
        text: 'Vishwa is more realistic and practical guy but super cool. He is fond of adventure and extremely confident guy. But very lazy to trim his beard ... He is fond of super bikes and cars and get crazy like anything.',
        style: {
          width: '35rem',
          height: '35rem',
          fontSize: '4rem',
          fontFamily: 'Great Vibes',
          color: 'white',
          bottom: '0rem',
          margin: 'auto',
          position: ['10rem', '0rem']
        },
        animation: {
          enter: 'slide-down',
          exit: 'slide-down'
        },
        page: 3
      }
    }
  };

})();
