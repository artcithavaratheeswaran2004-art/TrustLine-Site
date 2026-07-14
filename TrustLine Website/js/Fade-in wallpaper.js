(function () {
  'use strict';
  var CONFIG = {
    speed:         0.00038,  // overall animation speed
    mouseStrength: 0.025,    // how much the mouse shifts the orbs
    waveOpacity:   0.048,    // max opacity of wave lines
    waveCount:     10,       // number of horizontal waves
    mouseEasing:   0.04,     // how slowly smooth mouse chases real mouse (lower = laggier)
  };

  // Each orb: color/fade = center/edge of radial gradient, size = radius fraction,
  // speedMult = individual drift speed, ox/oy = phase offsets, rx/ry = ellipse half-axes
  var ORBS = [
    { color: 'rgba(22, 40, 160, 0.50)',   fade: 'rgba(22, 40, 160, 0)',   size: 0.76, speedMult: 1.00, ox: 0.00, oy: 1.57, rx: 0.28, ry: 0.22 },
    { color: 'rgba(90, 30, 200, 0.28)',   fade: 'rgba(90, 30, 200, 0)',   size: 0.64, speedMult: 0.71, ox: 2.09, oy: 0.70, rx: 0.38, ry: 0.32 },
    { color: 'rgba(0, 155, 200, 0.22)',   fade: 'rgba(0, 155, 200, 0)',   size: 0.54, speedMult: 1.28, ox: 4.19, oy: 3.14, rx: 0.44, ry: 0.38 },
    { color: 'rgba(130, 60, 220, 0.18)',  fade: 'rgba(130, 60, 220, 0)',  size: 0.58, speedMult: 0.83, ox: 1.05, oy: 4.71, rx: 0.33, ry: 0.28 },
    { color: 'rgba(0, 200, 180, 0.13)',   fade: 'rgba(0, 200, 180, 0)',   size: 0.46, speedMult: 1.57, ox: 3.49, oy: 2.27, rx: 0.48, ry: 0.42 },
    { color: 'rgba(55, 20, 140, 0.32)',   fade: 'rgba(55, 20, 140, 0)',   size: 0.68, speedMult: 0.60, ox: 5.20, oy: 0.40, rx: 0.36, ry: 0.30 },
    { color: 'rgba(20, 120, 180, 0.16)',  fade: 'rgba(20, 120, 180, 0)',  size: 0.42, speedMult: 1.40, ox: 1.80, oy: 5.50, rx: 0.50, ry: 0.44 },
  ];

  var canvas = document.getElementById('wave-bg');
  var ctx    = canvas.getContext('2d');
  var W = 0, H = 0, time = 0; // canvas dimensions + frame counter

  var mouse       = { x: 0.5, y: 0.5 }; // raw mouse position (0-1 normalized)
  var smoothMouse = { x: 0.5, y: 0.5 }; // eased mouse position used for drawing

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize(); // set W/H before first frame

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX / W; // store as 0-1 fraction so it's resolution-independent
    mouse.y = e.clientY / H;
  });

  function drawOrbs() {
    var mx = (smoothMouse.x - 0.5) * CONFIG.mouseStrength; // signed mouse offset (-0.5 → center)
    var my = (smoothMouse.y - 0.5) * CONFIG.mouseStrength;

    ORBS.forEach(function (orb, i) {
      var t  = time * CONFIG.speed * orb.speedMult; // per-orb time value

      // Elliptical drift path via sin/cos; mouse nudges each orb by a different amount
      var cx = W * (0.5 + Math.sin(t        + orb.ox) * orb.rx  +  mx * (i * 0.22 + 0.8));
      var cy = H * (0.5 + Math.cos(t * 0.79 + orb.oy) * orb.ry  +  my * (i * 0.22 + 0.8));
      var r  = Math.max(W, H) * orb.size; // radius relative to the larger canvas dimension

      
      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,    orb.color);
      grad.addColorStop(0.55, orb.color.replace(/[\d.]+\)$/, '0.04)')); // swap in low opacity
      grad.addColorStop(1,    orb.fade);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawWaves() {
    var mouseOffsetY = (smoothMouse.y - 0.5) * H * 0.018; // vertical mouse shifts all waves slightly

    for (var i = 0; i < CONFIG.waveCount; i++) {
      var yBase    = (H / (CONFIG.waveCount - 1)) * i + mouseOffsetY; // evenly-spaced baseline
      var phase    = i * 0.92 + time * CONFIG.speed * 0.44;           // time-based phase, unique per wave
      var edgeFade = Math.sin((i / (CONFIG.waveCount - 1)) * Math.PI); // 0 at edges, 1 in the middle
      var alpha    = CONFIG.waveOpacity * edgeFade;                    // top/bottom waves are more transparent

      ctx.beginPath();

      for (var x = 0; x <= W; x += 5) {
        // Three sine waves at different frequencies layered for an organic look
        var y = yBase
              + Math.sin(x * 0.0024 + phase)         * H * 0.038  // slow, wide
              + Math.sin(x * 0.0058 + phase * 1.31)  * H * 0.015  // medium
              + Math.sin(x * 0.0013 + phase * 0.61)  * H * 0.026; // very slow, large

        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(100, 165, 255, ' + alpha + ')';
      ctx.lineWidth   = 1.1;
      ctx.stroke();
    }
  }

  function draw() {
    // Lerp smooth mouse toward real mouse, creates the lag/easing effect
    smoothMouse.x += (mouse.x - smoothMouse.x) * CONFIG.mouseEasing;
    smoothMouse.y += (mouse.y - smoothMouse.y) * CONFIG.mouseEasing;

    ctx.fillStyle = '#07090f'; // near-black background
    ctx.fillRect(0, 0, W, H); // clear canvas each frame

    drawOrbs();   // layer 1: glowing color blobs
    drawWaves();  // layer 2: thin sine-wave lines on top

    time++;
    requestAnimationFrame(draw); // schedule next frame
  }

  draw(); // start the loop

}());
