/*==================================================
 * main.js
 * Cohen Coombs 2022 (c) All Rights Reserved
 * Written by Cohen Coombs, 2022
==================================================*/
const currentYear = new Date().getFullYear()

function contact() {
  Menu.open({
      title: 'Contact links',
      content: `
Send me a message, inquiry or collaborate in a project. Hope to hear from you.
<br><br>
<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
<a style="font-size: 1.1rem; font-weight: 500;" href="https://www.linkedin.com/in/cohencoombs/" target="_blank"> www.linkedin.com/in/cohencoombs</a>
<br><br>
<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
<a style="font-size: 1.1rem; font-weight: 500;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>`}, true)}

var $CONTAINER, $POPUP
var menus = []
const Menu = {
  "closeIcon": `<svg onclick="Menu.close()" class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  "closeBtn": '<button style="margin-bottom: 0; color: var(--subtext); font-weight: 500; background: var(--shade-3)" onclick="Menu.close()">Cancel</button>',
  close: function() {
      try {
          $CONTAINER.style.opacity = "0%";
          $POPUP.style.opacity = "0%";
          $POPUP.style.transform = "translate(-50%, 80%)"
          try {
              document.getElementById(menus[menus.length - 1][0]).remove()
              document.getElementById(menus[menus.length - 1][1]).remove()
          } catch (err) {}
      } catch (err) {}
  },
  open: function(data, actions = true, close = true) {
      Menu.close()
      const [title, content, cid, pid] = [data.title, data.content, Date.now(), Date.now() + 10000];
      menus.push([cid, pid])
      $CONTAINER = document.createElement('div');
      $POPUP = document.createElement('div');
      $CONTAINER.className = 'menu-container';
      $POPUP.className = 'menu-popup';
      $CONTAINER.id = cid;
      $POPUP.id = pid;

      if (close == true) $CONTAINER.onclick = () => this.close();
      setTimeout(() => {
          $CONTAINER.style.opacity = "100%";
          $POPUP.style.opacity = "100%";
          $POPUP.style.transform = "translate(-50%, -50%)";
      }, 100);
      let head = `<h2 style="font-weight: 600">${title}${close?this.closeIcon:""}</h2>`;
      !title ? head = null : null
      $POPUP.innerHTML = `${head}<p>${content}</p>${actions==true&&close == true?this.closeBtn:""}`;
      document.body.appendChild($POPUP);
      document.body.appendChild($CONTAINER);
  }
}

window.addEventListener('scroll', () => {
    try {
        let card = document.querySelector('.card')
        card.style.transition = '0.1s';
        if (window.scrollY >= 10) {
            if (window.innerWidth <= 1024) card.style.transform = `translate(0%, -${window.scrollY-50/0.8}px)`
            else card.style.transform = `translate(-50%, -${window.scrollY-50/0.8}px)`
        }
    } catch(err) {}
})

document.querySelector('nav').innerHTML = `
<a href="/"><img src="../assets/icons/logo.png" alt="logo"></a>
<ul>
<li><a href="/#about">About</a></li>
<li><a href="/projects/">Projects</a></li>
<li onclick="contact()"><a href="#">Contact</a></li>
</ul>`
document.querySelector('footer').innerHTML = `
<div class="contact">
    <h2>Get In Touch</h2><br>
    Send me a message, inquiry or collaboration - <a style="font-size: 1.1rem; font-weight: 600" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>
</div>
    <center>
        <div class="container" style="style="width: 90vw; display: flex; width: fit-content; margin: 5rem 0 0 0">
            <a href="../projects/"><span class="button" style="margin-right: 2rem">
                Projects
            </span></a>
            <span onclick="contact()" class="button">
                <span class="link">Contact</span>
            </span>
        </div>
        <br><br>
            <p style="color: var(--subtext)">© Cohen Coombs ${currentYear}. All Rights Reserved</p>
        <br><br>
        <br><br>
    </center>
`

var inc = 0.1;
var scl = 30;
var cols, rows, flow;
var offset = 0;
var particles = [];
const banner = "canvas"

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
};

function setup() {
  createCanvas(windowWidth, windowHeight).parent(banner);
  colorMode(HSB, 460); // Otherwise: 360
  cols = floor(width / scl);
  rows = floor(height / scl);
  flow = new Array(cols * rows);
  for (var i = 0; i < 2000; i++) particles[i] = new Particle();
}

function draw() {
  var y_offset = 0;
  for (var y = 0; y < rows; y++) {
      var x_offset = 0;
      for (var x = 0; x < cols; x++) {
          var index = x + y * cols;
          var angle = noise(x_offset, y_offset, offset) * TWO_PI * 4;
          var v = p5.Vector.fromAngle(angle);
          v.setMag(3);
          flow[index] = v;
          x_offset += inc;
          // rotate(v.heading());
      }
      y_offset += inc;
      offset += 0.0003;
  }
  for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flow);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
  }
}

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 8;

  this.prevPos = this.pos.copy();

  this.h = 0;
  this.colour = color(0, 0, 0, 5);

  this.update = function() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.h = (this.h + 1) % 360;
      this.colour = color(this.h, 360, 360, 5);
  };

  this.follow = function(vectors) {
      var x = floor(this.pos.x / scl);
      var y = floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
  };

  this.applyForce = function(force) {
      this.acc.add(force);
  };

  this.show = function() {
      stroke(this.colour);
      strokeWeight(0.8);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
  };

  this.updatePrev = function() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
  };

  this.edges = function() {
      if (this.pos.x > width) {
          this.pos.x = 0;
          this.updatePrev();
      }
      if (this.pos.x < 0) {
          this.pos.x = width;
          this.updatePrev();
      }
      if (this.pos.y > height) {
          this.pos.y = 0;
          this.updatePrev();
      }
      if (this.pos.y < 0) {
          this.pos.y = height;
          this.updatePrev();
      }
  };
}

setInterval(() => {
  document.getElementById(banner).style.transition = "1s";
  document.getElementById(banner).style.opacity = "0";
  setTimeout(() => {
      setup();
      document.getElementById(banner).style.opacity = "1"
  }, 1000);
}, 9000);
