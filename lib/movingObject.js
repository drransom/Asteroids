(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.MovingObject = function (args) {
    this.pos = args["pos"];
    this.vel = args["vel"];
    this.radius = args["radius"];
    this.color = args["color"];
    this.game = args["game"]
  };

  var MovingObject = Asteroids.MovingObject;

  MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  MovingObject.prototype.move = function() {
    var tempPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = this.game.wrap(tempPos);
  };


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var testAsteroid = new Asteroids.MovingObject( {
    pos: [200, 200],
    vel: [20, 20],
    color: "green",
    radius: 100
  });
  // testAsteroid.draw(context);

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var distanceCenter = Math.pow(
                          Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                          Math.pow(this.pos[1] - otherObject.pos[1], 2),
                          1/2);
    return (distanceCenter < (this.radius + otherObject.radius));
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }

})();
