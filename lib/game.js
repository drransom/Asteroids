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
      asteroids.push(new Asteroids.Asteroid(position));
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
})();
