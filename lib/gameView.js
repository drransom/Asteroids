(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  Asteroids.GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function () {
        ship.changeDirection(1);
      });
    key('down', function () {
        ship.changeDirection(-1);
      });
    key('left', function () {
        ship.rotateLeft();
      });
    key('right', function () {
        ship.rotateRight();
      });
    key('space', function () {
        ship.fireBullet();
      });
  };

  Asteroids.GameView.prototype.start = function () {
    var game = this.game;
    var context = this.ctx;
    this.bindKeyHandlers();

    setInterval(function() {
      game.moveObjects();
      game.checkCollisions();
      game.draw(context);
      if (game.wonGame()) {
        context.fillText("YOU WIN!", game.DIM_X/2, game.DIM_Y/2);
      }
    }, 20);
  };
})();
