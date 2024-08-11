const text = document.querySelector(".text");
const secretDiv = document.querySelector('.secret-div');

const keys = [];
const secretCode = ["h", "a", "c", "k"];

function keysDetector(e) {
  console.log(e.key); // Check which key got pressed in the console

  keys.push(e.key);
  if (keys.length > secretCode.length) {
    keys.shift();
  }

  if (JSON.stringify(keys) === JSON.stringify(secretCode)) {
    secretDiv.style.display = "block";
    text.innerHTML = "Identity Verified!";
    activateZdogAnimation();
  }
}

window.addEventListener('keyup', keysDetector);

function activateZdogAnimation() {
  Zfont.init(Zdog);

  var illo = new Zdog.Illustration({
    element: '#hackclub-canvas',
    dragRotate: true,
    rotate: { x: -0.32, y: 0.64, z: 0 },
    resize: 'fullscreen',
    zoom: 1,
    onResize: function (width, height) {
      var minSize = Math.min(width, height);
      this.zoom = minSize / 420;
    },
  });

  const particleCount = 50;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = new Zdog.Shape({
      addTo: illo,
      translate: { x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, z: Math.random() * 400 - 200 },
      stroke: 5,
      color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
    });
    particles.push(particle);
  }

  function animateParticles() {
    particles.forEach(particle => {
      particle.translate.x += Math.random() * 2 - 1;
      particle.translate.y += Math.random() * 2 - 1;
      particle.translate.z += Math.random() * 2 - 1;
    });
  }

  new Zdog.Box({
    addTo: illo,
    width: 420,
    height: 100,
    color: '#ec3750',
    stroke: 20,
    translate: { z: -18 },
  });

  var font = new Zdog.Font({
    src: 'https://cdn.jsdelivr.net/gh/jaames/zfont/demo/fredokaone.ttf'
  });

  var text = new Zdog.Text({
    addTo: illo,
    font: font,
    value: "Hello, HackClub!",
    fontSize: 50,
    textAlign: 'center',
    textBaseline: 'middle',
    color: '#fff',
    fill: true,
  });

  var shadow = text.copy({
    addTo: illo,
    translate: { z: -6 },
    color: '#aab',
  });

  const starAnchor = new Zdog.Anchor({
    addTo: illo,
    translate: { x: 300, y: 0 },
    rotate: { z: Math.PI / 10 },
  });

  const starGroup = new Zdog.Group({
    addTo: starAnchor,
    translate: { x: -70, y: -170 },
  });

  new Zdog.Shape({
    addTo: starGroup,
    path: [
      { x: 0, y: 45 },
      { x: 45, y: 45 },
      { x: 70, y: 0 },
      { x: 95, y: 45 },
      { x: 140, y: 45 },
      { x: 105, y: 80 },
      { x: 120, y: 130 },
      { x: 70, y: 105 },
      { x: 20, y: 130 },
      { x: 35, y: 80 },
      { x: 0, y: 45 },
    ],
    stroke: 40,
    color: 'hsl(45, 100%, 58%)',
  });

  new Zdog.Rect({
    addTo: starGroup,
    width: 40,
    height: 50,
    stroke: 40,
    translate: { x: 70, y: 70 },
    color: 'hsl(45, 100%, 58%)',
  });

  const eyesGroup = new Zdog.Group({
    addTo: starGroup,
    translate: { x: 70, y: 72.5, z: 20 },
  });

  const eye = new Zdog.Ellipse({
    addTo: eyesGroup,
    diameter: 5,
    stroke: 15,
    translate: { x: -32.5 },
    color: 'hsl(0, 0%, 0%)',
  });
  eye.copy({
    translate: { x: 32.5 },
  });

  const leftEyeAnchor = new Zdog.Anchor({
    addTo: eyesGroup,
    translate: { x: -32.5, z: 0.5 },
  });
  const leftEye = new Zdog.Ellipse({
    addTo: leftEyeAnchor,
    diameter: 1,
    stroke: 5,
    color: 'hsl(0, 100%, 100%)',
    translate: { x: -3.5 },
  });

  const rightEyeAnchor = leftEyeAnchor.copyGraph({
    translate: { x: 32.5, z: 0.5 },
  });

  const mouthAnchor = new Zdog.Anchor({
    addTo: starGroup,
    translate: { x: 70, y: 95, z: 20 },
    scale: 0.8,
  });

  const mouth = new Zdog.Shape({
    addTo: mouthAnchor,
    path: [
      { x: -8, y: 0 },
      { x: 8, y: 0 },
      {
        arc: [
          { x: 4, y: 6 },
          { x: 0, y: 6 },
        ],
      },
      {
        arc: [
          { x: -4, y: 6 },
          { x: -8, y: 0 },
        ],
      },
    ],
    stroke: 10,
    color: 'hsl(358, 100%, 65%)',
  });

  function animate() {
    illo.rotate.y += 0.01;
    animateParticles();
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }
  animate();
}
