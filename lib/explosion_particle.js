(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.ExplosionParticle = function(game, pos) {
    var minSpeed = game.rescale(1);
    var maxSpeed = game.rescale(5);
    var minRadius = game.rescale(3);
    var maxRadius = game.rescale(8);
    var args = {
      shape: "Circle",
      pos: pos,
      color: "white",
      radius: Asteroids.Util.randomNumber(minRadius, maxRadius),
      vel: Asteroids.ExplosionParticle.randomVel(minSpeed, maxSpeed),
      game: game,
      wrappable: false,
      collides: false
    };
    Asteroids.MovingObject.call(this, args);
  };

  var ExplosionParticle = Asteroids.ExplosionParticle;
  Asteroids.Util.inherits(ExplosionParticle, Asteroids.MovingObject);


  ExplosionParticle.randomVel = function (minSpeed, maxSpeed) {
    var speed = Asteroids.Util.randomNumber(minSpeed, maxSpeed);
    return Asteroids.Util.randomVec(speed);
  };

  ExplosionParticle.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.call(this);
    this.reduceRadius();
    if (this.satObject.r <= 0) {
      this.game.remove(this);
    }
  };

  ExplosionParticle.prototype.reduceRadius = function () {
    this.satObject.r -= 0.1;
  };

})();
