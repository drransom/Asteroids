(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function(game, pos, vel) {
    var args = {
      shape: "Circle",
      pos: pos,
      color: "green",
      radius: 6,
      vel: vel,
      game: game,
      wrappable: false,
      collides: true,
      explodes: false,
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Bullet = Asteroids.Bullet;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos().x, this.pos().y, this.radius(), 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

})();
