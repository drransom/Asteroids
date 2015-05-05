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
        ship.adjustSpeed(1);
      });
    key('down', function () {
        ship.adjustSpeed(-1);
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

    this.game.background.onload = this.startGame.bind(this);

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

  Asteroids.GameView.prototype.startGame = function () {
    this.game.displayStartMessage(this.ctx);
    var canvas = document.getElementById('canvas');
    var view = this;
    function callback() {
      canvas.removeEventListener("click", callback);
      view.playGame();
    }
    canvas.addEventListener("click", callback);
  };

  Asteroids.GameView.prototype.playGame = function () {
    var game = this.game, context = this.ctx;
    var interval = setInterval(function() {
      game.moveObjects();
      game.checkCollisions();
      game.draw(context);
      if (game.wonGame()) {
        this.printEndGameMessage("YOU WIN!", interval);
      } else if (game.lostGame()) {
        this.printEndGameMessage("YOU LOSE!", interval);
      }
    }.bind(this), 20);
  };

  Asteroids.GameView.prototype.resetGame = function () {
    this.game = new Asteroids.Game(this.game.DIM_X);
    this.bindKeyHandlers();
    this.playGame();
  };

  Asteroids.GameView.prototype.printEndGameMessage = function (message, interval) {
    this.ctx.font="30px Georgia";
    this.ctx.fillStyle="white";
    this.ctx.fillText(message, this.game.DIM_X/3, this.game.DIM_Y/3);
    this.ctx.font = "20px Georgia";
    this.ctx.fillText("Click to play again", this.game.DIM_X/3, this.game.DIM_Y/3 + 30);
    var view = this;
    clearInterval(interval);
    function callback() {
      canvas.removeEventListener("click", callback);
      view.resetGame();
    }
    canvas.addEventListener("click", callback);
  };
})();
