(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function(game, pos, vel) {
    var args = {
      shape: "Circle",
      pos: pos,
      color: "black",
      radius: 4,
      vel: vel,
      game: game,
      wrappable: false
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Bullet = Asteroids.Bullet;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
