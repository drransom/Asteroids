(function () {
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.GameView = function (ctx) {
    var dimension = this.setDimensions();
    this.game = new Asteroids.Game(dimension);
    this.ctx = ctx;
  };

  Asteroids.GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function () {
        ship.changeDirection(-1);
      });
    key('down', function () {
        ship.changeDirection(1);
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
    this.setDimensions();
    this.bindKeyHandlers();

    this.game.background.onload = this.playGame.bind(this);

  };

  Asteroids.GameView.prototype.setDimensions = function () {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    c = d.getElementById('canvas'),
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight,
    smallDimension = Math.min(x, y),
    size = Math.min(smallDimension - 30, 700);
    c.width = size;
    c.height = size;
    return size;
  };

  Asteroids.GameView.prototype.playGame = function () {
    var game = this.game, context = this.ctx;
    var interval = setInterval(function() {
      game.moveObjects();
      game.checkCollisions();
      game.draw(context);
      if (game.wonGame()) {
        context.font="30px Georgia";
        context.fillStyle="white";
        context.fillText("YOU WIN!", game.DIM_X/3, game.DIM_Y/3);
        clearInterval(interval);
      } else if (game.lostGame()) {
        context.font="30px Georgia";
        context.fillStyle="white";
        context.fillText("YOU LOSE!", game.DIM_X/3, game.DIM_Y/3);
        clearInterval(interval);
      }
    }, 20);
  };
})();
