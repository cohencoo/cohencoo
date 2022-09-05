var noise = new SimplexNoise();

var vizInit = function() {
  var file = document.getElementById("file-upload");
  var audio = document.getElementById("audio");
  var fileLabel = document.querySelector("label.file");

  document.onload = function(e) {
    console.log(e);
    audio.play();
    play();
  };
  file.onchange = function() {
    fileLabel.classList.add('normal');
    audio.classList.add('active');
    var files = this.files;

    audio.src = URL.createObjectURL(files[0]);

    audio.load();
    audio.play();
    play();
  };

  function play() {
    document.body.style.cursor = 'none'
    document.getElementById('upload-audio').style.display = 'none'

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var scene = new THREE.Scene();
    var group = new THREE.Group();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // var planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    var planeGeometry = new THREE.PlaneGeometry(0, 0, 0, 0);

    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x2800f0,
      side: THREE.DoubleSide,
      wireframe: true
    });


    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 30, 0);
    group.add(plane);

    var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -30, 0);
    group.add(plane2);

    var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0x5900ff,
      wireframe: true
    });


    var ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.set(0, 0, 0);
    group.add(ball);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControls.autoRotate = true;

    scene.add(group);

    document.getElementById('out').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    render();

    function render() {
      analyser.getByteFrequencyData(dataArray);

      var lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
      var upperHalfArray = dataArray.slice(dataArray.length / 2 - 1, dataArray.length - 1);

      var overallAvg = avg(dataArray);
      var lowerMax = max(lowerHalfArray);
      var lowerAvg = avg(lowerHalfArray);
      var upperMax = max(upperHalfArray);
      var upperAvg = avg(upperHalfArray);

      var lowerMaxFr = lowerMax / lowerHalfArray.length;
      var lowerAvgFr = lowerAvg / lowerHalfArray.length;
      var upperMaxFr = upperMax / upperHalfArray.length;
      var upperAvgFr = upperAvg / upperHalfArray.length;

      makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
      makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));

      makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));

      group.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeRoughBall(mesh, bassFr, treFr) {
      mesh.geometry.vertices.forEach(function(vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.00001;
        var distance = offset + bassFr + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * treFr;
        vertex.multiplyScalar(distance);
      });
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
    }

    function makeRoughGround(mesh, distortionFr) {
      mesh.geometry.vertices.forEach(function(vertex, i) {
        var amp = 2;
        var time = Date.now();
        var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
        vertex.z = distance;
      });
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.normalsNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      mesh.geometry.computeFaceNormals();
    }

    audio.play();
  };
};

window.onload = vizInit();

document.body.addEventListener('touchend', function(ev) {
  context.resume();
});

function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + fr * delta;
}

function avg(arr) {
  var total = arr.reduce(function(sum, b) {
    return sum + b;
  });
  emitter(total / arr.length);
  return total / arr.length;
}

function max(arr) {
  return arr.reduce(function(a, b) {
    return Math.max(a, b);
  });
}

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min
  return Math.floor(r)
}


function emitter(data) {
  console.log("Magnitude: " + Math.trunc(data))
  if (data < 15) {
    document.body.style.filter = `saturate(40%)`
    document.getElementById('out').style.transform = "scale(1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 15 && data < 30) {
    document.body.style.filter = `saturate(60%)`
    document.getElementById('out').style.transform = "scale(1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 30 && data < 60) {
    document.body.style.filter = `saturate(70%)`
    document.getElementById('out').style.transform = "scale(1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 60 && data < 70) {
    document.body.style.filter = `saturate(80%)`
    document.getElementById('out').style.transform = "scale(1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 70 && data < 80) {
    document.body.style.filter = `hue-rotate(${randomNumber(-100, 100)}deg) saturate(90%)`
    document.getElementById('out').style.transform = "scale(1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 80 && data < 100) {
    document.body.style.filter = `hue-rotate(${randomNumber(-200, 0)}deg) saturate(100%) brightness(150%)`
    document.getElementById('out').transform = "scale(1.1)"
    document.body.style.background = "hsla(240, 90%, 10%, 1)"

    return
  }
  if (data > 100 && data < 110) {
    document.body.style.filter = `hue-rotate(${randomNumber(-100, 30)}deg) saturate(100%) brightness(200%)`
    document.getElementById('out').style.transform = "scale(1.2)"
    document.body.style.background = "hsla(240, 150%, 30%, 1)"
    return
  }
  if (data > 110 && data < 130) {
    document.body.style.filter = `invert(1) hue-rotate(30deg) saturate(100%) brightness(500%)`
    document.getElementById('out').style.transform = "scale(1.4)"
    document.body.style.background = "hsla(240, 150%, 30%, 1)"
    return
  }
  if (data > 150) {
    document.body.style.background = "hsla(240, 150%, 30%, 1)"
    party.addsmoke(randomNumber(0, window.innerWidth), randomNumber(0, window.innerHeight), 1, Math.floor(Math.random() * 80))
    console.log("Initializing smoke")
    return
  }
}


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
    module.exports.default = module.exports
  } else {
    root.smokemachine = root.SmokeMachine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {


  var opacities = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 7, 4, 4, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 17, 27, 41, 52, 56, 34, 23, 15, 11, 4, 9, 5, 1, 0, 0, 0, 0, 0, 0, 1, 45, 63, 57, 45, 78, 66, 52, 41, 34, 37, 23, 20, 0, 1, 0, 0, 0, 0, 1, 43, 62, 66, 64, 67, 115, 112, 114, 56, 58, 47, 33, 18, 12, 10, 0, 0, 0, 0, 39, 50, 63, 76, 87, 107, 105, 112, 128, 104, 69, 64, 29, 18, 21, 15, 0, 0, 0, 7, 42, 52, 85, 91, 103, 126, 153, 128, 124, 82, 57, 52, 52, 24, 1, 0, 0, 0, 2, 17, 41, 67, 84, 100, 122, 136, 159, 127, 78, 69, 60, 50, 47, 25, 7, 1, 0, 0, 0, 34, 33, 66, 82, 113, 138, 149, 168, 175, 82, 142, 133, 70, 62, 41, 25, 6, 0, 0, 0, 18, 39, 55, 113, 111, 137, 141, 139, 141, 128, 102, 130, 90, 96, 65, 37, 0, 0, 0, 2, 15, 27, 71, 104, 129, 129, 158, 140, 154, 146, 150, 131, 92, 100, 67, 26, 3, 0, 0, 0, 0, 46, 73, 104, 124, 145, 135, 122, 107, 120, 122, 101, 98, 96, 35, 38, 7, 2, 0, 0, 0, 50, 58, 91, 124, 127, 139, 118, 121, 177, 156, 88, 90, 88, 28, 43, 3, 0, 0, 0, 0, 30, 62, 68, 91, 83, 117, 89, 139, 139, 99, 105, 77, 32, 1, 1, 0, 0, 0, 0, 0, 16, 21, 8, 45, 101, 125, 118, 87, 110, 86, 64, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 79, 79, 117, 122, 88, 84, 54, 46, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6, 55, 61, 68, 71, 30, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 23, 25, 20, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0]
  var smokeSpriteSize = 20

  var polyfillAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  function floatInRange(start, end) {
    return start + Math.random() * (end - start)
  }

  function makeSmokeSprite(color) {
    color = color || [255, 255, 255]
    var smokeSprite = document.createElement('canvas'),
      ctx = smokeSprite.getContext('2d'),
      data = ctx.createImageData(smokeSpriteSize, smokeSpriteSize),
      d = data.data

    for (var i = 0; i < d.length; i += 4) {
      d[i] = color[0]
      d[i + 1] = color[1]
      d[i + 2] = color[2]
      d[i + 3] = opacities[i / 4]
    }

    smokeSprite.width = smokeSpriteSize
    smokeSprite.height = smokeSpriteSize

    ctx.putImageData(data, 0, 0)

    return smokeSprite
  }

  function createParticle(x, y, options) {
    options = options || {}
    var lifetime = options.lifetime || 4000
    var particle = {
      x: x,
      y: y,
      vx: floatInRange(options.minVx || -4 / 100, options.maxVx || 4 / 100),
      startvy: floatInRange(options.minVy || -4 / 10, options.maxVy || -1 / 10),
      scale: floatInRange(options.minScale || 0, options.maxScale || 0.5),
      lifetime: floatInRange(options.minLifetime || 2000, options.maxLifetime || 8000),
      age: 0,
    }
    particle.finalScale = floatInRange(
      options.minScale || 25 + particle.scale,
      options.maxScale || 30 + particle.scale
    )
    particle.vy = particle.startvy
    return particle
  }

  function updateParticle(particle, deltatime) {
    particle.x += particle.vx * deltatime
    particle.y += particle.vy * deltatime
    var frac = Math.sqrt(particle.age / particle.lifetime)
    particle.vy = (1 - frac) * particle.startvy
    particle.age += deltatime
    particle.scale = frac * particle.finalScale
  }

  function drawParticle(particle, smokeParticleImage, context) {
    context.globalAlpha = (1 - Math.abs(1 - 2 * particle.age / particle.lifetime)) / 8
    var off = particle.scale * smokeSpriteSize / 2
    var xmin = particle.x - off
    var xmax = xmin + off * 2
    var ymin = particle.y - off
    var ymax = ymin + off * 2
    context.drawImage(smokeParticleImage, xmin, ymin, xmax - xmin, ymax - ymin)
  }


  return function SmokeMachine(context, color) {
    var smokeParticleImage = makeSmokeSprite(color),
      particles = [],
      preDrawCallback = function() {}

    function updateAndDrawParticles(deltatime) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      particles.forEach(function(p) {
        updateParticle(p, deltatime)
      })
      particles = particles.filter(function(p) {
        return p.age < p.lifetime
      })

      preDrawCallback(deltatime, particles)
      particles.forEach(function(p) {
        drawParticle(p, smokeParticleImage, context)
      })
    }

    var running = false,
      lastframe = performance.now()

    function frame(time) {
      if (!running) return
      var dt = time - lastframe
      lastframe = time;

      updateAndDrawParticles(dt)
      polyfillAnimFrame(frame)
    }

    function addParticles(x, y, numParticles, options) {
      numParticles = numParticles || 10
      if (numParticles < 1) return Math.random() <= numParticles && particles.push(createParticle(x, y, options));
      for (var i = 0; i < numParticles; i++) particles.push(createParticle(x, y, options))
    }

    return {
      step: function step(dt) {
        dt = dt || 16
        console.log(dt)
        updateAndDrawParticles(dt)
      },
      start: function start() {
        running = true
        lastframe = performance.now()
        polyfillAnimFrame(frame)
      },
      setPreDrawCallback: function(f) {
        preDrawCallback = f
      },
      stop: function stop() {
        running = false
      },
      addsmoke: addParticles,
      addSmoke: addParticles,
    }
  }

}))



var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

var party = smokemachine(ctx, [100, 100, 100])
party.start()
party.setPreDrawCallback(function(dt) {
  canvas.width = innerWidth
  canvas.height = innerHeight
})