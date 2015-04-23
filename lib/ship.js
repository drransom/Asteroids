(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function(game) {
    var args = {
      shape: "Circle",
      pos: game.randomPosition(),
      color: "pink",
      radius: 8,
      vel: new SAT.Vector(0, 0),
      game: game,
      wrappable: true
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Ship = Asteroids.Ship;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.setPosition(this.game.randomPosition());
    this.setVelocity(0, 0);
  };

  Ship.prototype.power = function (impulse) {
    this.vel = this.vel.add(impulse);
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet(this.game, this.pos(), this.vel);
    this.game.bullets.push(bullet);
  };

})();
