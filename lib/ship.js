(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var radius = 25;
    var args = {
      shape: "Polygon",
      pos: game.randomPosition(),
      color: "pink",
      radius: radius,
      vel: new SAT.Vector(0, 0),
      game: game,
      wrappable: true,
      angle: Math.PI,
      rotationRate: 0.1,
      alwaysRotates: false,
      rotationTurns: 5,
      remainingRotationTurns: 0,
      distanceToTop: radius/2
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Ship = Asteroids.Ship;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.calcTop = function () {
    var direction = this.calcDirection();
    var displacement = new SAT.Vector(-direction[0], -direction[1]).normalize();
    displacement.scale(this.distanceToTop);
    return displacement.add(this.pos());
  };

  Ship.prototype.relocate = function () {
    this.setPosition(this.game.randomPosition());
    this.setVelocity(0, 0);
  };

  Ship.prototype.changeDirection = function (direction) {
    var newDirection = this.calcDirection(direction);
    this.setVelocity(newDirection[0], newDirection[1]);
  };

  Ship.prototype.fireBullet = function () {
    var direction = this.calcDirection();
    var velocity = (new SAT.Vector(-direction[0]*2, -direction[1]*2)).add(this.vel);
    var bullet = new Asteroids.Bullet(this.game,
                                      this.calcTop(),
                                      velocity
                                     );
    this.game.bullets.push(bullet);
  };

})();
