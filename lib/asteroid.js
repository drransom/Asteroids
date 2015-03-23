(function(){
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
      game: game
    };
    Asteroids.MovingObject.call(this, args)
  };
  var Asteroid = Asteroids.Asteroid;
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  //
  // testAsteroid = new Asteroid([150, 150]);
  // var canvas = document.getElementById('canvas');
  // var context = canvas.getContext('2d');
  // testAsteroid.draw(context);
})();
