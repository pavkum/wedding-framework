var Wedding = Wedding || {};
(function () {
  'use strict';

  let animations = {};
  let defaults = {
    duration: 1000,
    easing: 'easeIn',
    loop: false,
    queue: false,
    delay: 0
  };

  Wedding.Animations = {
    processAnimations: function (config) {
      let deferred = Q.defer();

      config = config || {};

      for (let animName in config) {
        let animation = Wedding.Utils.extend({}, defaults, config[animName]);

        animations[animName] = animation;
      }

      deferred.resolve();

      return deferred.promise;
    },

    getAnimation: function (animName) {
      return animations[animName] || defaults;
    }
  };
})();

var Wedding = Wedding || {};
(function () {
  'use strict';

  Wedding.Elements = {
    createElements: function (config) {
      let deferred = Q.defer();

      config = config || {};

      for (let elemName in config) {
        let elemConfig = config[elemName];

        let elem;

        // set text or background
        if (elemConfig.image) {
          elem = document.createElement('img');
          elem.src = elemConfig.image;
          //elem.style.backgroundImage = 'url(' + elemConfig.image + ')';
        } else {
          elem = document.createElement('div');
          elem.innerText = elemConfig.text;
        }

        for (let styleName in elemConfig.style) {
          elem.style[styleName] = elemConfig.style[styleName];
        }

        elem.setAttribute('name', elemName);

        let position = elemConfig.style.position || [];
        let left = (position[0] || '0rem');
        let top = (position[1] || '0rem');

        elem.style.left = left;
        elem.style.top = top;

        elem.setAttribute('left', left);
        elem.setAttribute('top', top);

        // make position absolute
        elem.style.position = 'absolute';

        // set page info
        elem.setAttribute('page', elemConfig.page);

        // set animation info
        let animation = elemConfig.animation || {};
        elem.setAttribute('animation-enter', animation.enter);
        elem.setAttribute('animation-exit', animation.exit);

        // hide the element
        elem.style.display = 'none';

        // add to body
        document.body.appendChild(elem);
      }

      deferred.resolve();

      return deferred.promise;
    }
  };
})();

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

/* global WebFont, Q */
var Wedding = Wedding || {};

(function () {
  'use strict';

  Wedding.Fonts = {
    applyFonts: function (config) {
      let deferred = Q.defer();
      config = config || {};

      // supports only google fonts as of now;
      let fontStyle = document.createElement('style');
      let googleFamilies = [];
      let style = '';

      for (let faceName in config) {
        let font = config[faceName];
        if (font.type === 'google') {
          googleFamilies.push(font.id);
        }

        style += '@font-face {';
        style += 'font-family: ' + faceName + ';';

        if (font.weight) {
          style += 'font-weight:' + font.weight + ';';
        }

        if (font.style) {
          style += 'font-style:' + font.style + ';';
        }

        style += '}';
      }

      // append to fontStyleElement
      fontStyle.innerText = style;

      // add to head
      document.head.appendChild(fontStyle);

      WebFont.load({
        google: {
          families: googleFamilies
        },
        active: function () {
          deferred.resolve();
        },
        inactive: function () {
          deferred.reject();
        }
      });

      return deferred.promise;
    }
  };

})();

var Wedding = Wedding || {};
(function () {
  'use strict';

  Wedding.initialize = function () {
    let promises = [];

    promises.push(Wedding.Elements.createElements(Wedding.Config.elements));
    promises.push(Wedding.Animations.processAnimations(Wedding.Config.animations));
    promises.push(Wedding.Fonts.applyFonts(Wedding.Config.fonts));

    Q.all(promises).then(function () {
      // render page
      Wedding.Utils.trigger('initialize');
    }).fail(function () {
      console.error('An error occurred while initilizing the page');
    });
  };

})();

var Wedding = Wedding || {};

(function () {
  'use strict';

  let currentPage = 0;

  let opposite = {
    'slide-left': 'slide-right',
    'slide-right': 'slide-left',
    'slide-up': 'slide-down',
    'slide-down': 'slide-up',
    'fade-in': 'fade-in',
    'fade-out': 'fade-out'
  };

  let animateElement = function (elem, isEnter, isForward) {
    let animation = isEnter ? 'animation-enter' : 'animation-exit';
    animation = elem.getAttribute(animation);
    animation = Wedding.Animations.getAnimation(animation) || {};
    animation = Wedding.Utils.extend({}, animation, {
      display: isEnter ? 'block' : 'none'
    });

    let command = animation.command;

    if (!isForward) {
      command = opposite[command];
    }

    let commandOptions = {};
    switch (command) {
    case 'slide-left':
      if (isEnter) {
        commandOptions.translateX = [elem.getAttribute('left'), '100rem'];
      } else {
        commandOptions.translateX = ['-100rem', elem.getAttribute('left')];
      }
      break;
    case 'slide-right':
      if (isEnter) {
        commandOptions.translateX = [elem.getAttribute('left'), '-100rem'];
      } else {
        commandOptions.translateX = ['100rem', elem.getAttribute('left')];
      }
      break;
    case 'slide-down':
      if (isEnter) {
        commandOptions.translateY = [elem.getAttribute('top'), '-100rem'];
      } else {
        commandOptions.translateY = ['100rem', elem.getAttribute('top')];
      }
      break;
    case 'slide-up':
      if (isEnter) {
        commandOptions.translateY = [elem.getAttribute('top'), '100rem'];
      } else {
        commandOptions.translateY = ['-100rem', elem.getAttribute('top')];
      }
      break;

    case 'fade-in':
      if (isEnter) {
        commandOptions = 'fadeIn';
      } else {
        commandOptions = 'fadeOut';
      }
      break;

    case 'fade-out':
      if (isEnter) {
        commandOptions = 'fadeOut';
      } else {
        commandOptions = 'fadeIn';
      }
    }

    Velocity(elem, commandOptions, animation);
  };

  let animateElements = function (elems, isEnter, isForward) {
    for (let i = 0; i < elems.length; i++) {
      animateElement(elems[i], isEnter, isForward);
    }
  };

  let getElems = function (pageNumber) {
    return document.querySelectorAll('[page="' + pageNumber + '"]');
  };

  let nextPage = function () {
    // exit previous elems
    let nextPage = currentPage + 1;
    let nextPageElems = getElems(nextPage);
    let currentPageElems = getElems(currentPage);

    if (nextPageElems.length > 0) {
      // next page exists. Proceed

      if (currentPageElems.length > 0) {
        animateElements(currentPageElems, false, true);
      }

      animateElements(nextPageElems, true, true);
      currentPage = nextPage;
    }
  };

  let previousPage = function () {
    let previousPage = currentPage - 1;
    let previousPageElems = getElems(previousPage);
    let currentPageElems = getElems(currentPage);

    if (previousPageElems.length > 0) {
      // if previous page exists then only proceed

      if (currentPageElems.length > 0) {
        animateElements(currentPageElems, false, false);
      }

      animateElements(previousPageElems, true, false);
      currentPage = previousPage;
    }
  };

  document.addEventListener('initialize', nextPage);
  document.addEventListener('next:page', nextPage);
  document.addEventListener('previous:page', previousPage);
})();

var Wedding = Wedding || {};

(function () {
  'use strict';

  Wedding.Utils = {
    extend: function () {
      let dest = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
          dest[prop] = source[prop];
        }
      }
      return dest;
    },

    trigger: function (name) {
      let event = new CustomEvent(name, {
        detail: {},
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(event);
    }
  };

})();

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
        image: 'images/pre-wedding.jpg',
        style: {
          width: 'auto',
          height: '100%',
          right: '0rem',
          margin: 'auto',
          position: ['0rem', '0rem']
        },
        animation: {
          enter: 'fade-in',
          exit: 'fade-in'
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
      'page-3-groom-info': {
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
      },
      'page-4-our-photos': {
        text: 'Ourselves...',
        style: {
          width: '25rem',
          fontSize: '4rem',
          color: 'Yellow',
          fontFamily: 'Great Vibes',
          textAlign: 'center',
          right: '0rem',
          position: ['0rem', '2.5rem']
        },
        animation: {
          enter: 'slide-right',
          exit: 'slide-right'
        },
        page: 4
      },
      'page-4-vidya-vishwa': {
        image: 'images/page-4-vidya-vishwa.h',
        style: {
          width: '30rem',
          height: '30rem',
          borderRadius: '100%',
          right: '0rem',
          bottom: '0rem',
          margin: 'auto',
          position: ['0rem', '0rem']
        },
        animation: {
          enter: 'slide-left',
          exit: 'slide-left'
        },
        page: 4
      },
      'page-5-venue': {
        text: 'Venue',
        style: {
          width: '25rem',
          fontSize: '4rem',
          fontFamily: 'Great Vibes',
          textAlign: 'center',
          color: 'Yellow',
          right: '0rem',
          position: ['0rem', '2.5rem']
        },
        animation: {
          enter: 'slide-right',
          exit: 'slide-right'
        },
        page: 5
      },
      'page-6-thank-you': {
        text: 'Thank you',
        style: {
          width: '25rem',
          height: '20rem',
          margin: 'auto',
          fontSize: '4rem',
          fontFamily: 'Great Vibes',
          textAlign: 'center',
          color: 'white',
          right: '0rem',
          bottom: '0rem',
          position: ['0rem', '0rem']
        },
        animation: {
          enter: 'slide-right',
          exit: 'slide-right'
        },
        page: 6
      }
    }
  };

})();
