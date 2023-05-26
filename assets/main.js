const nav = document.querySelector("nav")
const footer = document.querySelector("footer")
const carousel = document.querySelector(".carousel")
const currentYear = new Date().getFullYear()
const isHome = () => window.location.pathname == "/" || window.location.pathname == "/index.html"

function contact() {
    Menu.open(
        {
            title: "Contact me via:",
            content: `
        <br>
        <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        <a style="font-size: 1.1rem; font-weight: 500;" href="https://www.linkedin.com/in/cohencoombs/" target="_blank"> www.linkedin.com/in/cohencoombs</a>
        <br><br>
        <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 1rem; width: 1.2rem; height: 1.2rem; vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
        <a style="font-size: 1.1rem; font-weight: 500;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>`,
        },
        true
    )
}

function openMenu() {
    Menu.open(
        {
            title: "Menu",
            content: `
        
        <a href="/#about">About</a>
        <br><br>
        <a href="/projects/">Projects</a>

        <p>Contact</p>
        <a style="font-size: 1.1rem; font-weight: 500;" href="https://www.linkedin.com/in/cohencoombs/" target="_blank"> www.linkedin.com/in/cohencoombs</a>
        <br><br>
        <a style="font-size: 1.1rem; font-weight: 500;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>

        <br><br>
        <p>Web Design Services</p>
        <a href="https://bespokewebdev.com">See Services</a>
        `,
        },
        false
    )
}

nav.innerHTML = `
<a href="/"><img src="assets/icons/logo.png" alt="logo"></a>
<ul>
    <li><a href="/#about">About</a></li>
    <li><a href="/projects/">Projects</a></li>
    <li onclick="contact()"><a href="#">Contact</a></li>
    <li>
        <a href="https://bespokewebdev.com">
            <button id="services-cta" style="margin: 0; font-size: 0.9rem; padding: 0rem 1rem !important; opacity: 0.5; background: var(--theme); border-radius: 100rem; font-weight: 600">Web Design Services</button>
        </a>
    </li>
</ul>
<div onclick="openMenu()" class="mobile-menu">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
</div>`

footer.innerHTML = `
    <h2>Contact</h2>
    <div class="contact-methods">
        <div class="item">
            <span class="contact-method">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Email
            </span>
            <a class="link" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>
        </div>
        <div class="item">
            <span class="contact-method">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LinkedIn
            </span>
            <a class="link" target="_blank" href="https://www.linkedin.com/in/cohencoombs/"> www.linkedin.com/in/cohencoombs </a>
        </div>
    </div>

    <hr>

    <h2>Links</h2>
    <div class="link-container">
        <a class="link" target="_blank" href="../projects/">Projects</a>
        <a class="link" target="_blank" href="https://bespokewebdev.com">Web Design Services</a>
    </div>
    <br>
    <p style="color: var(--subtext)"> © Cohen Coombs ${currentYear}. All Rights Reserved </p>
`

if (isHome())
    for (i = 0; i < 5; i++)
        document.getElementById(
            "rating-section"
        ).innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 0.3rem; width: 1.3rem; height: 1.3rem; color: #ffc800;" viewBox="0 0 24 24" fill="#ffc800" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`

let variation = 0
let inc = 0.04
let scl = 40
let cols, rows, flow
let offset = 0
let particles = []
const banner = "canvas"

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function setup() {
    particles = []
    createCanvas(windowWidth, windowHeight).parent(banner)
    colorMode(HSB, 360)
    cols = floor(width / scl)
    rows = floor(height / scl)
    flow = new Array(cols * rows)
    for (let i = 0; i < 3000; i++) particles[i] = new Particle() // set to 900000
}

function draw() {
    let y_offset = 0
    for (let y = 0; y < rows; y++) {
        let x_offset = 0
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols
            let angle = noise(x_offset, y_offset, offset) * TWO_PI * 4
            let v = p5.Vector.fromAngle(angle)
            v.setMag(3)
            flow[index] = v
            x_offset += inc
            // rotate(v.heading());
        }
        y_offset += inc
        offset += 0.0001
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flow)
        particles[i].update()
        particles[i].edges()
        particles[i].show()
    }
}

let minRange = 225
let maxRange = 270

function Particle() {
    this.pos = createVector(random(width), random(height))
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.maxspeed = 11 // default 8
    this.alternate = false

    this.prevPos = this.pos.copy()

    this.h = minRange
    this.colour = color(0, 0, 0, 20)

    this.update = function () {
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel)
        this.acc.mult(0)

        if (this.alternate) {
            this.h += 0.5
            if (this.h > maxRange) this.alternate = false
        } else {
            this.h -= 0.5
            if (this.h < minRange) this.alternate = true
        }

        this.colour = color(this.h, 360, 360, 8)
    }

    this.follow = function (vectors) {
        let x = floor(this.pos.x / scl)
        let y = floor(this.pos.y / scl)
        let index = x + y * cols
        let force = vectors[index]
        this.applyForce(force)
    }

    this.applyForce = (force) => this.acc.add(force)

    this.show = function () {
        stroke(this.colour)
        strokeWeight(0.5)
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.updatePrev()
    }

    this.updatePrev = function () {
        this.prevPos.x = this.pos.x
        this.prevPos.y = this.pos.y
    }

    this.edges = function () {
        if (this.pos.x > width) {
            this.pos.x = 0
            this.updatePrev()
        }
        if (this.pos.x < 0) {
            this.pos.x = width
            this.updatePrev()
        }
        if (this.pos.y > height) {
            this.pos.y = 0
            this.updatePrev()
        }
        if (this.pos.y < 0) {
            this.pos.y = height
            this.updatePrev()
        }
    }
}

async function softFadeOpacity(element, duration, targetOpacity) {
    const start = performance.now()
    const startOpacity = parseFloat(window.getComputedStyle(element).opacity)
    const delta = targetOpacity - startOpacity
    return new Promise((resolve) => {
        function step(timestamp) {
            const progress = (timestamp - start) / duration
            element.style.opacity = startOpacity + delta * progress
            if (progress < 1) {
                window.requestAnimationFrame(step)
            } else {
                resolve()
            }
        }
        window.requestAnimationFrame(step)
    })
}

setInterval(async () => {
    if (isHome()) {
        const banner = document.getElementById("canvas")
        await softFadeOpacity(banner, 500, 0)
        variation++
        if (variation % 2 == 0) {
            minRange = 225
            maxRange = 270
        } else {
            minRange = 5
            maxRange = 80
        }
        setup()
        await softFadeOpacity(banner, 500, 1)
    }
}, 6000)

document.addEventListener("scroll", () => {
    const scroll = window.scrollY

    if (scroll > 10) {
        nav.classList = "nav-active"
        document.querySelector("#services-cta").style.opacity = "1"
    } else {
        nav.classList = "nav-inactive"
        document.querySelector("#services-cta").style.opacity = "0.5"
    }
})

let items = [
    {
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
}

if (isHome()) for (let i = 0; i < 6; i++) nextRender()

setInterval(() => {
    if (isHome()) {
        nextRender()
        if (carousel.children && carousel.children.length > 10) {
            for (let i = 0; i < 4; i++) carousel.removeChild(carousel.children[i])
        }
    }
}, 1000)
