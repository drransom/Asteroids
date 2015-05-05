(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var radius = game.rescale(45);
    this.originalColor = "pink";
    this.speedUpColor = "red";
    var args = {
      shape: "Polygon",
      pos: game.randomCentralPosition(),
      color: this.originalColor,
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
      collides: false,
      explodes: true,
    };
    this.hasRotated = false;
    this.speedUpTurns = 0;
    this.maxSpeedUpTurns = 10;
    this.coastTurns = 0;
    this.maxCoastTurns = 25;
    this.waitTurnsRemaining = 0;
    this.baseWaitTurns = 50;
    this.invincibilityTurns = 100;
    this.invincibilityTurnsRemaining = 100;
    this.throttled = false;
    this.takeAction = true;
    this.maxSpeed = 5;
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
      this.explode(10);
      this.relocate();
    } else {
      this.explode(20);
      this.game.lost = true;
      this.game.ship = null;
    }
  };

  Ship.prototype.relocate = function () {
    this.setPosition(this.game.randomCentralPosition());
    this.setVelocity(0, 0);
    this.resetInvincibility();
  };

  Ship.prototype.adjustSpeed = function (direction) {
    if (this.hasRotated) {
      this.changeDirection(direction, this.vel.len());
      this.hasRotated = false;
    }
    if (direction) {
      this.speedUpTurns = direction * this.maxSpeedUpTurns;
      this.coastTurns = this.maxCoastTurns;
    } else {
      this.speedUpTurns = 0;
    }
  };

  Ship.prototype.changeDirection = function (direction, speed) {
    speed = speed || 0;
    this.hasRotated = false;
    var newDirection = this.calcDirection(-direction);
    this.setVelocity(speed*newDirection[0], speed*newDirection[1]);
  };


  Ship.prototype.fireBullet = function () {
    if (!this.throttled) {
      this.throttled = true;
      this.createBullet();
      window.setTimeout( function () {
        this.throttled = false;
      }.bind(this), 325);
    }
  };

  Ship.prototype.createBullet = function () {
    if (this.takeAction) {
      this.takeAction = false;
      var direction = this.calcDirection();
      var baseVelocity = this.vel.clone();
      var speed = this.game.rescale(5);
      var velocity = (new SAT.Vector(-direction[0]*speed, -direction[1]*speed)).
                                    add(baseVelocity);
      var bullet = new Asteroids.Bullet(this.game,
                                        this.calcTop(),
                                        velocity
                                       );
      this.game.bullets.push(bullet);

      window.setTimeout(function() {
        this.takeAction = true;
      }.bind(this), 250);
    }
  };

  Ship.prototype.updateInvincibility = function() {
    if (this.waitTurnsRemaining) {
      this.waitTurnsRemaining -= 1;
    } else {
      this.invincibilityTurnsRemaining -= 1;
      if (this.invincibilityTurnsRemaining === 0) {
        this.collides = true;
        this.visible = true;
      } else if (this.invincibilityTurnsRemaining % 10 === 0) {
        this.visible = !this.visible;
      }
    }
  };

  Ship.prototype.move = function () {
    if (!this.collides) {
      this.updateInvincibility();
    }
    if (this.speedUpTurns > 0) {
      this.speedUp();
    } else if (this.coastTurns) {
      this.coastTurns -= 1;
    } else {
      this.slowDown();
    }
    Asteroids.MovingObject.prototype.move.call(this);
  };

  Ship.prototype.slowDown = function () {
    this.color = this.originalColor;
    this.speedUpTurns = Math.min(this.speedUpTurns + 1, 0);
    var rescaleFactor = this.speedUpTurns ? 2 : 1;
    this.rescaleVelocity(-0.05*rescaleFactor);
  };

  Ship.prototype.speedUp = function () {
    this.color = this.speedUpColor;
    this.speedUpTurns -= 1;
    if (this.vel.len()) {
      this.rescaleVelocity(this.maxSpeed/this.maxSpeedUpTurns);
      console.log("remaining speedUpTurns = " + this.speedUpTurns);
      console.log("current speed = " + this.vel.len());
    } else {
      this.changeDirection(1, 1);
    }
  };

  Ship.prototype.resetInvincibility = function () {
    this.visible = false;
    this.collides = false;
    this.invincibilityTurnsRemaining = this.invincibilityTurns;
    this.waitTurnsRemaining = this.baseWaitTurns;
  };


})();
