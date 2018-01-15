window.onload = function() {

    var username = "";



    var canvas, context, graph,
        frame = 1000 / 30,
        now,
        delta,
        then = Date.now();

    var count = 0;


    var mainColors = ["#1C476D", "#8EC2FF", "#FFE600"];


    var cubes = {},
        cubesettings = {
            density: 20,
            particleSize: 100,
            startingX: window.innerWidth / 2,
            startingY: window.innerHeight / 4,
            friction: 0.95,
            gravity: 0.7,
            radius: 400
        };

    var particles = {},
        particleIndex = 0,
        settings = {
            density: 50,
            particleSize: 10,
            gravity: 0.3
        };


    var Debugger = function() {};
    Debugger.log = function(message) {
        try {
            console.log(message);
        } catch (exception) {
            return;
        }
    };

    function canvasSupport() {
        return !!document.createElement('canvas').getContext;
    }


    function init() {
        Debugger.log("De pagina is ingeladen");

        startTheApp();
    }

    function startTheApp() {
        if (!canvasSupport()) {

            Debugger.log("Something went wrong :(!");
            return false;
        }

        canvas = document.getElementById("cnvs");
        context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = $(document).height();


        for (var i = 0; i < cubesettings.density; i++) {
            new Cube();
        }

        animate();
    }

    function animate() {
        // Setup for looping animation
        now = Date.now();
        delta = now - then;

        if (delta > frame) {
            then = now - (delta % frame);
        }

        window.requestAnimationFrame(animate);

        /*context.fillStyle = rgba(0,0,0,0);
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "";*/
        context.clearRect(0, 0, canvas.width, canvas.height);


        for (var i in cubes) {
          cubes[i].draw();
        }


    }

    function Cube() {
      // Establish starting positions and velocities
      this.x = Math.random()*window.innerWidth;
      this.y = Math.random()*$(document).height();
      console.log(mainColors[Math.round(Math.random() * mainColors.length)]);
      this.color = mainColors[Math.round(Math.random()*(mainColors.length))];
      // Determine original X-axis speed based on setting limitation
      this.vx = 0;
      this.vy = Math.random() * 1 - 0.5;

      this.size = Math.random() * 80 - 40;

      // Add new particle to the index
      // Object used as it's simpler to manage that an array
      particleIndex ++;
      cubes[particleIndex] = this;
      this.id = particleIndex;
    }

    // Some prototype methods for the particle's "draw" function
    Cube.prototype.draw = function() {
      this.y += this.vy;

      // Adjust for gravity
      //this.vy += 0;


      // If Particle is old, it goes in the chamber for renewal
      if (this.y <= 0) {
        this.x = Math.random()*window.innerWidth;
        this.y = $(document).height();
      }

      // Create the shapes
      context.clearRect(cubesettings.leftWall, cubesettings.groundLevel, canvas.width, canvas.height);
      context.beginPath();
      context.strokeStyle=this.color;
      context.lineWidth = 8;
      // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
      context.strokeRect(this.x, this.y, this.size, this.size);
      context.closePath();
      context.fill();

    }


    init();

};
