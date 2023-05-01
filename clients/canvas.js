const canvas = document.getElementById("bannerCanvas")
const ctx = canvas.getContext("2d")

const images = [
    "banner/1.webp",
    "banner/2.webp",
    "banner/3.webp",
    "banner/4.webp",
    "banner/5.webp",
    "banner/6.webp",
    "banner/1.png",
    "banner/2.png",
    "banner/3.png",
    "banner/4.png",
    "banner/5.png",
]

const imageObjects = []
const displayedImages = []

images.forEach((src) => {
    const img = new Image()
    img.src = src
    imageObjects.push(img)
})

const maxDisplayedImages = 40
const maxSimultaneousImages = 10

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawImage(imgObj) {
    const size = randomBetween(100, 300)
    const x = randomBetween(0, canvas.width - size)
    const y = randomBetween(0, canvas.height - size)
    const opacity = randomBetween(7, 9) / 10

    displayedImages.push({
        img: imgObj,
        x: x,
        y: y,
        size: size,
        opacity: 0,
        targetOpacity: opacity,
        fade: "in",
        fadeInSpeed: 0.05,
        fadeOutSpeed: 0.003,
    })
}

function updateCanvasSize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    displayedImages.forEach((image, i) => {
        ctx.globalAlpha = image.opacity
        ctx.drawImage(image.img, image.x, image.y, image.size, image.size)

        if (image.fade === "in") {
            image.opacity += image.fadeInSpeed
            if (image.opacity >= image.targetOpacity) {
                image.fade = "out"
            }
        } else if (image.fade === "out" && image.opacity > 0) {
            image.opacity -= image.fadeOutSpeed
            if (image.opacity <= 0) {
                displayedImages.splice(i, 1)
            }
        }
    })

    window.requestAnimationFrame(draw)
}

function startBanner() {
    updateCanvasSize()
    draw()

    setInterval(() => {
        if (
            displayedImages.length < maxDisplayedImages &&
            displayedImages.filter((img) => img.fade === "in").length < maxSimultaneousImages
        ) {
            drawImage(imageObjects[randomBetween(0, imageObjects.length - 1)])
        }
    }, 400)
}

window.addEventListener("resize", updateCanvasSize)
window.addEventListener("load", startBanner)
