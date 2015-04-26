(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var radius = 45;
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
      distanceToTop: radius/2,
      collides: true,
      explodes: true,
    };
    this.movingBackwards = false;
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

  Ship.prototype.takeHit = function () {
    this.game.lives -= 1;
    if (this.game.lives > 0) {
      this.relocate();
    } else {
      this.explode(20);
      this.game.lost = true;
      this.game.ship = null;
    }
  };

  Ship.prototype.relocate = function () {
    this.setPosition(this.game.randomPosition());
    this.setVelocity(0, 0);
  };

  Ship.prototype.changeDirection = function (direction) {
    this.movingBackwards = (direction < 0);
    var newDirection = this.calcDirection(direction);
    this.setVelocity(2*newDirection[0], 2*newDirection[1]);
  };

  Ship.prototype.fireBullet = function () {
    var direction = this.calcDirection();
    var baseVelocity = this.vel.clone();
    var velocity = (new SAT.Vector(-direction[0]*5, -direction[1]*5)).
                                  add(baseVelocity);
    var bullet = new Asteroids.Bullet(this.game,
                                      this.calcTop(),
                                      velocity
                                     );
    this.game.bullets.push(bullet);
  };


})();
