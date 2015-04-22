(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function(game, pos, vel) {
    var args = {
      pos: pos,
      color: "black",
      radius: 4,
      vel: [vel[0] * 2, vel[1] * 2],
      game: game,
      wrappable: false
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Bullet = Asteroids.Bullet;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
