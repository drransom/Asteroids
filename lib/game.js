(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function (dimensions) {
    this.lives = 3;
    this.DIM_X = dimensions[0];
    this.DIM_Y = dimensions[1];
    this.NUM_ASTEROIDS = 30 + Math.floor(Math.max(0, (this.DIM_X - 700)/20 ));
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
    this.explosionParticles = [];
    this.addAsteroids(this.NUM_ASTEROIDS);
    var img = new Image();
    img.src = './lib/spaceImage.jpeg';
    this.background = img;
    this.lost = false;
  };

  Asteroids.Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.shipArray()).
                          concat(this.bullets).
                          concat(this.explosionParticles);
  };

  Asteroids.Game.prototype.collidingObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.shipArray());
  };

  Asteroids.Game.prototype.shipArray = function () {
    if (this.ship) {
      return [this.ship];
    } else {
      return [];
    }
  };

  Asteroids.Game.prototype.addAsteroids = function (num) {
    this.asteroids = [];
    var asteroid;
    for (var i = 0; i < num; i++) {
      while (this.asteroids.length <= i) {
        var position = this.randomPosition();
        asteroid = new Asteroids.Asteroid(position, this);
        if (this.noConflicts(asteroid)) {
          this.asteroids.push(new Asteroids.Asteroid(position, this));
        }
      }
    }
  };

  Asteroids.Game.prototype.randomPosition = function () {
    return new SAT.Vector(Math.random() * this.DIM_X, Math.random() * this.DIM_Y);
  };

  Asteroids.Game.prototype.randomCentralPosition = function () {
    return new SAT.Vector((0.7 * Math.random() + 0.15) * this.DIM_X,
                          (0.7 * Math.random() + 0.15) * this.DIM_Y);
  };

  Asteroids.Game.prototype.draw = function (ctx) {
    this.clearAndDisplayBackground(ctx);
    this.drawObjects(ctx);
    this.drawLives(ctx);
  };

  Asteroids.Game.prototype.drawObjects = function (ctx) {
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length; i++) {
      if (gameObjects[i].visible) {
        gameObjects[i].draw(ctx);
      }
    }
  };

  Asteroids.Game.prototype.clearAndDisplayBackground = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.background, 0, 0);
  };

  Asteroids.Game.prototype.moveObjects = function() {
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length; i++) {
      gameObjects[i].move();
    }
  };

  Asteroids.Game.prototype.wrap = function(pos) {
    var newX = (this.DIM_X + pos.x) % this.DIM_X;
    var newY = (this.DIM_Y + pos.y) % this.DIM_Y;
    if (pos.x > this.DIM_X || pos.y > this.DIM_Y) {
    }
    return new SAT.Vector(newX, newY);
  };

  Asteroids.Game.prototype.checkCollisions = function () {
    var gameObjects = this.collidingObjects();
    for (var i = 0; i < gameObjects.length - 1; i++) {
      if (gameObjects[i].collides) {
        for (var j = i + 1; j < gameObjects.length; j++) {
          if (gameObjects[j].collides &&
              gameObjects[i].isCollidedWith(gameObjects[j])) {
            gameObjects[i].collideWith(gameObjects[j]);
          }
        }
      }
    }
  };

  Asteroids.Game.prototype.remove = function (object) {
    var objectArray;
    if (object instanceof Asteroids.Bullet) {
      objectArray = this.bullets;
    } else if (object instanceof Asteroids.ExplosionParticle) {
      objectArray = this.explosionParticles;
    } else {
      objectArray = this.asteroids;
    }
    var objectIndex = objectArray.indexOf(object);
    objectArray.splice(objectIndex, 1);
    if (!object.isOutOfBounds() && object.explodes) {
      object.explode(10);
    }
  };

  Asteroids.Game.prototype.isOutOfBounds = function (pos) {
    return pos.x < 0 || pos.x < 0 ||
           pos.x >= this.DIM_X || pos.y >= this.DIM_Y;
  };

  Asteroids.Game.prototype.wonGame = function () {
    return this.asteroids.length === 0 && this.explosionParticles.length === 0;
  };

  Asteroids.Game.prototype.lostGame = function () {
    return this.lost && this.explosionParticles.length === 0;
  };

  Asteroids.Game.prototype.noConflicts = function (newObject) {
    var collidingObjects = this.collidingObjects();
    for (var i = 0; i < this.collidingObjects.length; i++) {
      if (collidingObjects[i].isCollidedWith(newObject)) {
        return false;
      }
    }
    return true;
  };

  Asteroids.Game.prototype.drawLives = function (ctx) {
    ctx.font="20px Georgia";
    ctx.fillStyle="white";
    var lives = Math.max(this.lives-1, 0);
    ctx.fillText("Lives Remaining: " + lives, 10,30);
  };

  Asteroids.Game.prototype.rescale = function (num) {
    return num * (this.DIM_X + 0.5*(this.DIM_Y)) / 2100;
  };

  Asteroids.Game.prototype.displayStartMessage = function (ctx) {
    this.clearAndDisplayBackground(ctx);
    this.drawObjects(ctx);
    var xval = (this.DIM_X/2 + this.DIM_X/3)/2;
    ctx.font = "30px Georgia";
    ctx.fillStyle="white";
    ctx.fillText("Asteroids!", xval, this.DIM_Y/3);
    ctx.fillText("Click to Start", xval, this.DIM_Y/3 + 35);
    ctx.font="25px Georgia";
    ctx.fillText("Up/Down to move", xval, this.DIM_Y/3+ 80);
    ctx.fillText("left/right to rotate", xval, this.DIM_Y/3 + 110);
    ctx.fillText("spacebar to fire", xval, this.DIM_Y/3 + 140);
  };

})();
