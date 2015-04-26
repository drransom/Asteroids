(function() {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.COLOR = "brown";
  Asteroids.RADIUS = 50;

  Asteroids.Asteroid = function (pos, game) {
    var args = {
      shape: "Polygon",
      pos: pos,
      color: Asteroids.COLOR,
      radius: Asteroids.RADIUS,
      vel: Asteroids.Util.randomVec(1),
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
    this.game.remove(otherObject);
    this.game.remove(this);
  };
})();
