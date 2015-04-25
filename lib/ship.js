(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var args = {
      shape: "Polygon",
      pos: game.randomPosition(),
      color: "pink",
      radius: 25,
      vel: new SAT.Vector(0, 0),
      game: game,
      wrappable: true,
      angle: Math.PI,
      rotationRate: 0.1,
      alwaysRotates: false,
      rotationTurns: 5,
      remainingRotationTurns: 0,
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Ship = Asteroids.Ship;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.setPosition(this.game.randomPosition());
    this.setVelocity(0, 0);
  };

  Ship.prototype.calcTop = function () {
    return this.pos().clone().add(this.satObject.points[0]);
  };

  Ship.prototype.changeDirection = function (direction) {
    var newDirection = this.calcDirection(direction);
    this.setVelocity(newDirection[0], newDirection[1]);
  };

  Ship.prototype.fireBullet = function () {
    var direction = this.calcDirection();
    var bullet = new Asteroids.Bullet(this.game,
                                      this.calcTop(),
                                      new SAT.Vector(-direction[0], -direction[1])
                                     );
    this.game.bullets.push(bullet);
  };

})();
