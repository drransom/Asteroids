(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  Asteroids.GameView.prototype.start = function () {
    var game = this.game;
    var context = this.ctx;
    setInterval(function() {
      game.moveObjects();
      game.checkCollisions();
      game.draw(context);
    }, 20)
  }
})();
