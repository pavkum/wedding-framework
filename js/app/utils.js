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
