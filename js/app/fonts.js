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
