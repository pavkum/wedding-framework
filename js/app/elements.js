var Wedding = Wedding || {};
(function () {
  'use strict';

  Wedding.Elements = {
    createElements: function (config) {
      let deferred = Q.defer();

      config = config || {};

      for (let elemName in config) {
        let elemConfig = config[elemName];

        let elem = document.createElement('div');
        elem.setAttribute('name', elemName);

        // set text or background
        if (elemConfig.image) {
          elem.style.backgroundImage = elemConfig.image;
        } else {
          elem.innerText = elemConfig.text;
        }

        if (elemConfig.style.font) {
          elem.style.fontFamily = elemConfig.style.font;
        }

        if (elemConfig.style['font-size']) {
          elem.style.fontSize = elemConfig.style['font-size'];
        }

        elem.style.width = elemConfig.style.width;
        elem.style.height = elemConfig.style.height;

        let position = elemConfig.style.position || [];
        let left = (position[0] || 0) + 'rem';
        let top = (position[1] || 0) + 'rem';

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
