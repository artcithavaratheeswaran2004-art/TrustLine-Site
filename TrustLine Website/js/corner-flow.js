(function () {
  'use strict';

  var CONFIG = {
    speed: 0.00030,
    mouseStrength: 0.016,
    mouseEasing: 0.05,
    waveOpacity: 0.052,
    waveCount: 9,
  };

  var ORBS = [
    { color: 'rgba(25, 55, 195, 0.48)',  fade: 'rgba(25, 55, 195, 0)',  size: 0.52, speedMult: 1.00, ox: 0.0, oy: 0.5, rx: 0.16, ry: 0.14 },
    { color: 'rgba(0, 145, 220, 0.28)',  fade: 'rgba(0, 145, 220, 0)',  size: 0.42, speedMult: 0.70, ox: 1.8, oy: 2.1, rx: 0.20, ry: 0.17 },
    { color: 'rgba(95, 50, 215, 0.22)',  fade: 'rgba(95, 50, 215, 0)',  size: 0.38, speedMult: 1.25, ox: 3.5, oy: 1.2, rx: 0.22, ry: 0.18 },
    { color: 'rgba(0, 195, 190, 0.13)',  fade: 'rgba(0, 195, 190, 0)',  size: 0.32, speedMult: 0.88, ox: 2.2, oy: 4.0, rx: 0.26, ry: 0.20 },
    { color: 'rgba(50, 20, 145, 0.30)',  fade: 'rgba(50, 20, 145, 0)',  size: 0.46, speedMult: 0.58, ox: 5.1, oy: 0.4, rx: 0.18, ry: 0.15 },
  ];

  var canvas = document.getElementById('corner-flow');
  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, time = 0;

  var mouse = { x: 0.5, y: 0.5 };
  var smoothMouse = { x: 0.5, y: 0.5 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
  });

  function drawOrbs() {
    var mx = (smoothMouse.x - 0.5) * CONFIG.mouseStrength;
    var my = (smoothMouse.y - 0.5) * CONFIG.mouseStrength;

    ORBS.forEach(function (orb, i) {
      var t  = time * CONFIG.speed * orb.speedMult;
      var cx = W * (0.72 + Math.sin(t + orb.ox) * orb.rx + mx * (i * 0.18 + 0.5));
      var cy = H * (0.28 + Math.cos(t * 0.76 + orb.oy) * orb.ry + my * (i * 0.18 + 0.5));
      var r  = Math.max(W, H) * orb.size;

      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,   orb.color);
      grad.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, '0.04)'));
      grad.addColorStop(1,   orb.fade);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawWaves() {
    var mouseShift = (smoothMouse.x - 0.5) * 36;

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 4);

    var diag = Math.sqrt(W * W + H * H);

    for (var i = 0; i < CONFIG.waveCount; i++) {
      var yBase    = -diag * 0.5 + (diag / (CONFIG.waveCount - 1)) * i + mouseShift;
      var phase    = i * 0.88 + time * CONFIG.speed * 0.42;
      var edgeFade = Math.sin((i / (CONFIG.waveCount - 1)) * Math.PI);
      var alpha    = CONFIG.waveOpacity * edgeFade;

      ctx.beginPath();

      for (var x = -diag; x <= diag; x += 5) {
        var y = yBase
              + Math.sin(x * 0.0023 + phase)        * diag * 0.038
              + Math.sin(x * 0.0057 + phase * 1.28) * diag * 0.015
              + Math.sin(x * 0.0014 + phase * 0.62) * diag * 0.025;

        x === -diag ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(110, 168, 255, ' + alpha + ')';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    ctx.restore();
  }

  function applyMask() {
    var radius = Math.max(W, H) * 1.15;
    var grad = ctx.createRadialGradient(W, 0, 0, W, 0, radius);
    grad.addColorStop(0,    'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.30, 'rgba(0, 0, 0, 0.88)');
    grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(0.82, 'rgba(0, 0, 0, 0.06)');
    grad.addColorStop(1,    'rgba(0, 0, 0, 0)');

    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  }

  function draw() {
    smoothMouse.x += (mouse.x - smoothMouse.x) * CONFIG.mouseEasing;
    smoothMouse.y += (mouse.y - smoothMouse.y) * CONFIG.mouseEasing;

    ctx.clearRect(0, 0, W, H);
    drawOrbs();
    drawWaves();
    applyMask();

    time++;
    requestAnimationFrame(draw);
  }

  draw();

}());
