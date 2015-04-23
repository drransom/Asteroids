(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.MovingObject = function (args) {
    this.shape = args.shape;
    if (this.shape === "Circle") {
      this.satObject = new SAT.Circle(args.pos, args.radius);
    }
    this.vel = args.vel;
    this.color = args.color;
    this.game = args.game;
    this.wrappable = args.wrappable;
  };

  var MovingObject = Asteroids.MovingObject;

  MovingObject.prototype.pos = function () {
    return this.satObject.pos;
  };

  MovingObject.prototype.radius = function () {
    return this.satObject.r;
  };

  MovingObject.prototype.setPosition = function (newPos) {
    this.satObject.pos = newPos;
  };

  MovingObject.prototype.setVelocity = function (x, y) {
    this.vel.x = x;
    this.vel.y = y;
  };


  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    try {
      ctx.arc(this.pos().x, this.pos().y, this.radius(), 0, 2 * Math.PI);
    }
    catch (e) {
      debugger;
    }
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  MovingObject.prototype.move = function() {
    var tempPos = this.pos().add(this.vel);
    if (this.wrappable) {
      this.setPosition(this.game.wrap(tempPos));
    } else if (this.game.isOutOfBounds(tempPos)) {
      this.game.remove(this);
    } else {
      this.setPosition(tempPos);
    }
  };


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var typeString = "test" + this.shape + otherObject.shape;
    return SAT[typeString](this.satObject, otherObject.satObject);
  };

  MovingObject.prototype.collideWith = function(otherObject) {
  };

  MovingObject.prototype.isOutOfBounds = function () {
    return this.game.isOutOfBounds(this.pos);
  };
})();
