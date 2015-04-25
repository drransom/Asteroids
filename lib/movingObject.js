(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.MovingObject = function (args) {
    this.shape = args.shape;
    if (this.shape === "Circle") {
      this.satObject = new SAT.Circle(args.pos, args.radius);
    } else if (this instanceof Asteroids.Ship) {
      this.satObject = new Asteroids.Util.Triangle(args.pos, args.radius, args.angle);
    } else {
      this.satObject = new Asteroids.Util.randomPolygon(5, args.pos, args.radius);
    }
    this.vel = args.vel;
    this.color = args.color;
    this.game = args.game;
    this.wrappable = args.wrappable;
    this.angVel = args.angVel || 0;
    this.rotationRate = args.rotationRate || 0;
    this.alwaysRotates = args.alwaysRotates || false;
    this.rotationTurns = args.rotationTurns || 0;
    this.remainingRotationTurns = args.rotationTurns || 0;
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
    if (this.shape === "Circle") {
      this.drawCircle(ctx);
    } else {
      this.drawPolygon(ctx);
    }
  };

  MovingObject.prototype.drawCircle = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos().x, this.pos().y, this.radius(), 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  MovingObject.prototype.drawPolygon = function (ctx) {
    var sides = [];
    this.satObject.calcPoints.forEach(function(point) {
      sides.push(point.clone());
    });
    sides = sides.concat((sides[0].clone()));
    sides.forEach(function (side) {
      side.add(this.pos());
    }.bind(this));
    ctx.beginPath();
    ctx.moveTo(sides[0].x, sides[0].y);
    for (var i = 1; i < sides.length; i++) {
      ctx.lineTo(sides[i].x, sides[i].y);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  };

  MovingObject.prototype.move = function() {
    this.movePosition();
    if (this.shape === "Polygon") {
      this.rotate();
    }
  };

  MovingObject.prototype.movePosition = function() {
    var tempPos = this.pos().clone().add(this.vel);
    if (this.wrappable) {
      this.setPosition(this.game.wrap(tempPos));
    } else if (this.game.isOutOfBounds(tempPos)) {
      this.game.remove(this);
    } else {
      this.setPosition(tempPos);
    }
  };

  MovingObject.prototype.rotate = function() {
    if (this.alwaysRotates || this.remainingRotationTurns > 0) {
      this.satObject.setAngle(this.satObject.angle + this.angVel);
      this.remainingRotationTurns -= 1;
    }
  };

  MovingObject.prototype.resetRotation = function (direction) {
      this.angVel = direction * this.rotationRate;
      this.remainingRotationTurns = this.rotationTurns;
  };

  MovingObject.prototype.rotateLeft = function () {
    this.resetRotation(-1);
  };

  MovingObject.prototype.rotateRight = function () {
    this.resetRotation(1);
  };

  // MovingObject.prototype.movePolygon = function() {
  //   this.satObject.translate(this.vel.x, this.vel.y);
  //   if (this.wrappable) {
  //     this.setPosition(this.game.wrap(this.pos()));
  //   } else if (this.game.isOutOfBounds(tempPos)) {
  //     this.game.remove(this);
  //   }
  // };


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var typeString = "test" + this.shape + otherObject.shape;
    var response = new SAT.Response();
    return SAT[typeString](this.satObject, otherObject.satObject, response);
  };

  MovingObject.prototype.collideWith = function(otherObject) {
  };

  MovingObject.prototype.isOutOfBounds = function () {
    return this.game.isOutOfBounds(this.pos);
  };

  MovingObject.prototype.calcDirection = function (direction) {
    direction = direction || 1;
    return [-direction * Math.sin(this.satObject.angle),
            direction * Math.cos(this.satObject.angle)];
  };

})();
