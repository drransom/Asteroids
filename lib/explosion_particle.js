(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.ExplosionParticle = function(game, pos) {
    var minSpeed = 1;
    var maxSpeed = 5;
    var minRadius = 3;
    var maxRadius = 8;
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
