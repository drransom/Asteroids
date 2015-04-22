require(['../scripts'], function (common) {

  var testAsteroid = new Asteroids.Asteroid([150, 150]);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var testView = new Asteroids.GameView(context);
  testView.start();
});
