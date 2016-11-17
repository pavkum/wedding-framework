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

  let animateElement = function (elem, isEnter, delay) {
    let animation = isEnter ? 'animation-enter' : 'animation-exit';
    animation = elem.getAttribute(animation);
    animation = Wedding.Animations.getAnimation(animation) || {};
    animation = Wedding.Utils.extend({}, animation, {
      delay: delay,
      display: isEnter ? 'block' : 'none'
    });

    //elem.style.display = 'block';

    let command = animation.command;

    if (!isEnter) {
      command = opposite[command];
      command = animation.command;
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
      commandOptions.translateX = [elem.getAttribute('left'), '-100rem'];
      break;
    case 'slide-top':
      commandOptions.translateY = [elem.getAttribute('top'), '-100rem'];
      break;
    case 'slide-bottom':
      commandOptions.translateY = [elem.getAttribute('top'), '100%'];
      break;
    }

    Velocity(elem, commandOptions, animation);
  };

  let animateElements = function (elems, isForward, isExit) {
    // gather delays
    let delays = [];
    for (let i = 0; i < elems.length; i++) {
      let delay = elems[i].getAttribute('delay') || 0;
      delays.push(delay);
    }

    // lets think about delay reversal later

    for (let i = 0; i < elems.length; i++) {
      let delay = elems[i].getAttribute('delay') || 0;
      animateElement(elems[i], isForward, delay, isExit);
    }
  };

  let getElems = function (pageNumber) {
    return document.querySelectorAll('[page="' + pageNumber + '"]');
  };

  let nextPage = function () {
    // exit previous elems
    let elems = getElems(currentPage);

    if (elems.length > 0) {
      animateElements(elems, false);
    }

    let page = currentPage + 1;
    elems = getElems(page);

    if (elems.length > 0) {
      // next page exists. Proceed
      animateElements(elems, true);
      currentPage = page;
    }
  };

  let previousPage = function () {
    let elems = getElems(currentPage);

    if (elems.length > 0) {
      animateElements(elems, false);
    }

    let page = currentPage - 1;
    elems = getElems(page);

    if (elems.length > 0) {
      animateElements(elems, false);
      currentPage = page;
    }
  };

  document.addEventListener('initialize', nextPage);
  document.addEventListener('next:page', nextPage);
  document.addEventListener('previous:page', previousPage);
})();
