(function() {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.COLORS = ["#CACE4E", "Brown", "#5F6C65"];
  Asteroids.RADIUS = 50;

  Asteroids.Asteroid = function (pos, game) {
    var type = Math.floor(Math.random() * Asteroids.COLORS.length);
    var args = {
      shape: "Polygon",
      pos: pos,
      color: Asteroids.COLORS[type],
      radius: game.rescale(Asteroids.RADIUS),
      vel: Asteroids.Util.randomVec(game.rescale(1)),
      game: game,
      wrappable: true,
      angVel: Math.random() * 0.1,
      alwaysRotates: true,
      collides: true,
      explodes: true
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Asteroid = Asteroids.Asteroid;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.takeHit();
    } else if (this instanceof Asteroids.Asteroid &&
               otherObject instanceof Asteroids.Asteroid) {
      var response = this.calculateResponse(otherObject);
      this.bounce(otherObject, response);
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Asteroid.prototype.bounce = function (otherObject, response) {
    var overlapV = response.overlapV;
    this.resetVelocityToResponse(overlapV.clone().rotate(Math.PI));
    otherObject.resetVelocityToResponse(overlapV);
  };

  Asteroid.prototype.resetVelocityToResponse = function (responseVector) {
    var speed = this.vel.len();
    var newVel = responseVector.normalize().scale(speed);
    this.setVelocity(newVel.x, newVel.y);
  };
})();
