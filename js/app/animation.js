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
