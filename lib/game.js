(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.lives = 3;
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = this.addAsteroids(this.NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
    var img = new Image();
    // img.onload = function () {
    //   ctx.drawImage(img, 0, 0);
    // };
    img.src = 'spaceImage.jpeg';
    this.background = img;
  };

  Asteroids.Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Asteroids.Game.prototype.addAsteroids = function (num) {
    var asteroids = [];
    for (var i = 0; i < num; i++) {
      var position = this.randomPosition();
      asteroids.push(new Asteroids.Asteroid(position, this));
    }
    return asteroids;
  };

  Asteroids.Game.prototype.randomPosition = function () {
    return new SAT.Vector(Math.random() * this.DIM_X, Math.random() * this.DIM_Y);
  };

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.background, 0, 0);
    var gameObjects = this.allObjects();
    for (var i = 0; i < gameObjects.length; i++) {
      gameObjects[i].draw(ctx);
    }
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
    var gameObjects = this.allObjects();
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
    } else {
      objectArray = this.asteroids;
    }
    var objectIndex = objectArray.indexOf(object);
    objectArray.splice(objectIndex, 1);
  };

  Asteroids.Game.prototype.isOutOfBounds = function (pos) {
    return pos.x < 0 || pos.x < 0 ||
           pos.x >= this.DIM_X || pos.y >= this.DIM_Y;
  };

  Asteroids.Game.prototype.wonGame = function () {
    return this.asteroids.length === 0;
  };
})();
