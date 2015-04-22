(function(){
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.COLOR = "brown";
  Asteroids.RADIUS = 10;

  Asteroids.Asteroid = function (pos, game) {
    var args = {
      pos: pos,
      color: Asteroids.COLOR,
      radius: Asteroids.RADIUS,
      vel: Asteroids.Util.randomVec(1),
      game: game,
      wrappable: true
    };
    Asteroids.MovingObject.call(this, args);
  };

  var Asteroid = Asteroids.Asteroid;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };
})();
