(function(){
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  window.Asteroids.Util = {};
  Asteroids.Util.inherits = function (subclass, superclass) {
    function Surrogate () {
    }
    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var theta = Math.random() * 2 * Math.PI;
    return [length * Math.cos(theta), length * Math.sin(theta)];
  }
})();
