(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.ExplosionParticle = function(movingObject) {
    var radius = 5;
    var minSpeed = 1;
    var maxSpeed = 5;
    var minRadius = 3;
    var maxRadius = 8;
    var args = {
      shape: "Circle",
      pos: movingObject.pos(),
      color: "white",
      radius: Asteroids.ExplosionParticle.randomRadius(minRadius, maxRadius),
      vel: Asteroids.ExplosionParticle.randomVel(minSpeed, maxSpeed),
      game: movingObject.game,
      wrappable: false,
      angle: Math.PI,
      rotationRate: 0,
      alwaysRotates: false,
      rotationTurns: 0,
      remainingRotationTurns: 0,
      distanceToTop: 0,
      collides: false
    };
    Asteroids.MovingObject.call(this, args);
  };

  var ExplosionParticle = Asteroids.ExplosionParticle;

  ExplosionParticle.prototype.randomVel = function (minSpeed, maxSpeed) {
    speed = Asteroids.Util.randomNumber(minSpeed, maxSpeed);
    return Asteroids.Util.randomVec(speed);
  };

})();
