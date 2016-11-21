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
