var Wedding = Wedding || {};

(function () {
  'use strict';

  let currentPage = 0;

  let opposite = {
    'slide-left': 'slide-right',
    'slide-right': 'slide-left',
    'slide-top': 'slide-bottom',
    'slide-bottom': 'slide-top'
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
    case 'slide-top':
      if (isEnter) {
        commandOptions.translateY = [elem.getAttribute('top'), '-100rem'];
      } else {
        commandOptions.translateY = ['100rem', elem.getAttribute('top')];
      }
      break;
    case 'slide-bottom':
      if (isEnter) {
        commandOptions.translateY = [elem.getAttribute('top'), '100rem'];
      } else {
        commandOptions.translateY = ['-100rem', elem.getAttribute('top')];
      }
      break;
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
