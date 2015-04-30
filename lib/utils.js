(function(){
  "use strict";
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  window.Asteroids.Util = {};
  Asteroids.Util.inherits = function (subclass, superclass) {
    function Surrogate () {
    }
    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var theta = Math.random() * 2 * Math.PI;
    return new SAT.Vector(length * Math.cos(theta), length * Math.sin(theta));
  };

  Asteroids.Util.randomPolygon = function (nSides, center, radius) {
    var ellipse = Asteroids.Util.generateRandomEllipse(radius);
    var yRadius, offsetAngle;

    var angles = Asteroids.Util.generateRandomAngles(nSides);
    var vectors = [];
    for (var i = 0; i < nSides; i++) {
      vectors.push(ellipse.createVector(angles[i]));
    }
    return new SAT.Polygon(center, vectors);
  };

  Asteroids.Util.generateRandomAngles = function (n) {
    //generates n random numbers between 0 and 2*pi
    var angles = [];
    for (var i = 0; i < n; i++) {
      angles.push(Asteroids.Util.randomAngle(i, 6));
    }
    return angles.sort();
  };

  Asteroids.Util.randomAngle = function (offset_factor, num) {
    offset_factor = offset_factor || 0;
    num = num || 1;
    var angle_segment = 2 * Math.PI / num;
    return (Math.random() + offset_factor) * angle_segment;
  };

  Asteroids.Util.Triangle = function (position, height, angle) {
    var top = new SAT.Vector(0, height / 2);
    var bottomLeft = new SAT.Vector(-height/4, -height/2);
    var bottomRight = new SAT.Vector(height/4, -height/2);
    var triangle = new SAT.Polygon(position, [top, bottomLeft, bottomRight]);
    triangle.rotate(angle);
    return triangle;
  };

  Asteroids.Util.Ellipse = function (args) {
    this.xradius = args.xradius;
    this.yradius = args.yradius || this.xradius;
    this.offset = args.offset || 0;
  };

  var Ellipse = Asteroids.Util.Ellipse;

  Ellipse.prototype.createVector = function (theta) {
    var xcord = this.xradius * Math.cos(theta);
    var ycord = this.yradius * Math.sin(theta);
    return new SAT.Vector(xcord, ycord).rotate(this.offset);
  };

  Asteroids.Util.generateRandomEllipse = function (radius) {
    var xradius = ((Math.random() * 0.2) + 0.5) * radius;
    var yradius = radius - xradius;
    var offset = Math.random() * 2 * Math.PI;
    return new Ellipse({xradius: xradius, yradius: yradius, offset: offset});
  };

  Asteroids.Util.randomNumber = function (min, max) {
    return min + (Math.random() * (max - min));
  };

})();
