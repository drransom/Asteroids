(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function () {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 50;
    this.asteroids = this.addAsteroids(this.NUM_ASTEROIDS);
  };

  Asteroids.Game.prototype.addAsteroids = function (num) {
    var asteroids = [];
    for (var i = 0; i < num; i++) {
      var position = this.randomPosition();
      asteroids.push(new Asteroids.Asteroid(position, this));
    }
    return asteroids;
  }

  Asteroids.Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  }

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
  }

  Asteroids.Game.prototype.moveObjects = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  }

  Asteroids.Game.prototype.wrap = function(pos) {
    var newX = (this.DIM_X + pos[0]) % this.DIM_X;
    var newY = (this.DIM_Y + pos[1]) % this.DIM_Y;
    return [newX, newY];
  }

  Asteroids.Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length - 1; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  }

  Asteroids.Game.prototype.remove = function (asteroid) {
    var asteroidIndex = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroidIndex, 1);
  }
})();
