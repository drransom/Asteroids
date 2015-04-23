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
      vel: new SAT.Vector(vel.x * 2, vel.y * 2),
      game: game,
      wrappable: false
    };
    debugger;
    Asteroids.MovingObject.call(this, args);
  };

  var Bullet = Asteroids.Bullet;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
