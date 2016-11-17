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
