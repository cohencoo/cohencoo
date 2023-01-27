const nav = document.querySelector('nav')
const footer = document.querySelector('footer')
const carousel = document.querySelector(".carousel")
const currentYear = new Date().getFullYear()

function isHome() {
    return window.location.pathname == '/' || window.location.pathname == '/index.html'
}

function contact() {
    Menu.open({
        title: 'Contact links',
        content: `
        Contact me via linkedin or email.
        <br><br>
        <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        <a style="font-size: 1.1rem; font-weight: 500;" href="https://www.linkedin.com/in/cohencoombs/" target="_blank"> www.linkedin.com/in/cohencoombs</a>
        <br><br>
        <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
        <a style="font-size: 1.1rem; font-weight: 500;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>`
    }, true)
}

nav.innerHTML = `
<a href="/"><img src="assets/icons/logo.png" alt="logo"></a>
<ul>
    <li><a style="color: var(--subtext)" href="/#about">About</a></li>
    <li><a style="color: var(--subtext)" href="/projects/">Projects</a></li>
    <li><a style="color: var(--subtext)" href="/services/">Services</a></li>
    <li onclick="contact()"><a style="color: var(--subtext)" href="#">Contact</a></li>

    <li>
        <a href="/services/">
            <button id="services-cta" style="margin: 0; font-size: 0.9rem; padding: 0rem 1rem !important; opacity: 0.5; background: var(--theme); border-radius: 100rem; font-weight: 600">See Freelance Services</button>
        </a>
    </li>
</ul>`


footer.innerHTML = `
<div class="contact">
    <h2>Get In Touch</h2><br>
    You can send me a message at <a style="font-size: 1.1rem; font-weight: 600" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>
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

if (isHome()) for (i = 0; i < 5; i++)
    document.getElementById("rating-section").innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 0.3rem; width: 1.3rem; height: 1.3rem; color: #ffc800;" viewBox="0 0 24 24" fill="#ffc800" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`

let variation = 0

let inc = 0.04;
let scl = 40;
let cols, rows, flow;
let offset = 0;
let particles = [];
const banner = "canvas"

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
};

function setup() {
    particles = [];
    createCanvas(windowWidth, windowHeight).parent(banner);
    colorMode(HSB, 360);
    cols = floor(width / scl);
    rows = floor(height / scl);
    flow = new Array(cols * rows);
    for (let i = 0; i < 3000; i++) particles[i] = new Particle();
}

function draw() {
    let y_offset = 0;
    for (let y = 0; y < rows; y++) {
        let x_offset = 0;
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(x_offset, y_offset, offset) * TWO_PI * 4;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(3);
            flow[index] = v;
            x_offset += inc;
            // rotate(v.heading());
        }
        y_offset += inc;
        offset += 0.0001;
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flow);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}

let minRange = 225;
let maxRange = 270;

function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 11; // default 8
    this.alternate = false;

    this.prevPos = this.pos.copy();

    this.h = minRange;
    this.colour = color(0, 0, 0, 20);

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.alternate) {
            this.h += 0.5;
            if (this.h > maxRange) this.alternate = false;
        } else {
            this.h -= 0.5;
            if (this.h < minRange) this.alternate = true;
        }

        this.colour = color(this.h, 360, 360, 8);
    };

    this.follow = function (vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    };

    this.applyForce = (force) => this.acc.add(force)

    this.show = function () {
        stroke(this.colour);
        strokeWeight(0.5);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    };

    this.updatePrev = function () {
        this.prevPos.x = this.pos.x
        this.prevPos.y = this.pos.y
    };

    this.edges = function () {
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
    if (isHome()) {
        const banner = document.getElementById(banner);
        banner.style.transition = "0.5s";
        banner.style.opacity = "0";
        setTimeout(() => {
            variation++
            if (variation % 2 == 0) {
                minRange = 225;
                maxRange = 270;
            }
            else {
                minRange = 5;
                maxRange = 80;
            }
            setup();
            banner.style.opacity = "1"
        }, 500);
    }
}, 9000);

document.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const card = document.querySelector('.card');
    const banner = document.querySelector(".banner");

    if (scroll > 10) {
        nav.style.background = "var(--nav)"
        nav.style.backdropFilter = "blur(1rem)"
        nav.style.webkitBackdropFilter = "blur(1rem)"
        document.querySelector("#services-cta").style.opacity = "1"
        if (isHome()) card.style.opacity = "1"
    } else {
        nav.style.background = "none"
        nav.style.backdropFilter = "none"
        nav.style.webkitBackdropFilter = "none"
        document.querySelector("#services-cta").style.opacity = "0.5"
        if (isHome()) card.style.opacity = "0"
    }

    if (isHome()) {
        document.getElementById("canvas").style.scale = 1 + scroll / 2000;
        banner.style.borderRadius = `0 0 5rem 5rem`;
        banner.style.scale = 1 - scroll / 4000;
        banner.style.boxShadow = `inset 0px 0px ${scroll / 1.5 }px 0px rgba(255,255,255,0.02)`;
    
        card.style.transition = '0.1s';
        if (window.scrollY >= 10) {
            if (window.innerWidth <= 1024) {
                card.style.transform = `translate(0%, -${window.scrollY-50/0.8}px)`
            } else card.style.transform = `translate(-50%, -${window.scrollY-50/0.8}px)`
        }
    }
})

let items = [{
        name: "HTML",
        icon: "html.png",
    },
    {
        name: "CSS",
        icon: "css.png",
    },
    {
        name: "JavaScript",
        icon: "js.png",
    },
    {
        name: "React",
        icon: "react.png",
    },
    {
        name: "Typescript",
        icon: "typescript.png",
    },
    {
        name: "NodeJS",
        icon: "node.png",
    },
    {
        name: "Python",
        icon: "python.png",
    },
    {
        name: "Socket.io",
        icon: "socket.svg",
    },
    {
        name: "MongoDB",
        icon: "mongo.png",
    },
]

function nextRender() {
    const group = document.createElement("div")
    group.className = "group"

    items.forEach((item) => {
        const card = document.createElement("div")
        card.innerHTML = `
            <div class="item">
                <img src="assets/icons/${item.icon}" draggable="false" alt="${item.name}" />
                <span>${item.name}</span>
            </div>`
        group.appendChild(card)
    })

    carousel.appendChild(group)
};

if (isHome()) for (let i = 0; i < 6; i++) nextRender()

setInterval(() => {
    if (isHome()) {
        nextRender()
        if (carousel.children && carousel.children.length > 10) {
            for (let i = 0; i < 4; i++) carousel.removeChild(carousel.children[i])
        }
    }
}, 1000)