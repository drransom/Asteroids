Asteroids
=========
The classic Asteroids game as interpreted by me.

[Live Demo][live demo]

[live demo]: http://drransom.github.io/Asteroids/

The Code
===========
The app is implemented in HTML5 Canvas using [SAT.js][sat js]. SAT.js is just
intended as a  lightweight colission detection algorithm for convex polygons
and circles, but I adapted it for use as the entire basis of the physics engine.

The Ship and Asteroids
----------------------
The ship and the asteroids are all SAT.js `Polygon` objects. The ship is simply
a triangle of predetermined dimensions. The asteroids are constructed inscribing
an irregular pentagon in a randomly generated ellipse. The ellipse eccentricity
is limited to prevent asteroids from being pathologically long. The asteroids
are also assigned a random radial velocity, which is constant throughout the
lifetime of the game.

The asteroids bounch off each other when they hit each other. This is accomplished
by resetting the velocities to be parallel to the SAT.js `Response#overlapV` vector,
as rotated to adjust for the difference in reference frames.

Bullets and Explosions
----------------
The bullets and explosions are all generated as SAT.js `Circles`. The bullets
have predetermined dimensions and a velocity calculated to keep them moving
along the same trajectory as the ship at the point they are fired. Each explosion
consists of multiple `ExplosionObjects`, which in turn contain an SAT.js `Circle`.
The `ExplosionObjects` are assigned random velocities, which are always radial from the center of the `Polygon`. The radius decreases linearly and the `ExplosionObject` is removed from
the game when the radius is <= 0.

Input
-----
Input is based on [Keymaster][keymaster]. Spacebar files bullets and arrows
rotate and/or move the ship. The bullet firing rate is throttled to 325 ms using
`Window#SetTimeout`.

Todos
==============
* Instructions and "play again"
* Score counter
* Music
* Attacking aliens
* More elaborate Canvas styling.

[sat js]: https://github.com/jriecken/sat-js
[keymaster]: https://github.com/madrobby/keymaster
