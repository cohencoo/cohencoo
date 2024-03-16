let triggered = false
let items = [
    {
        name: "HTML",
        icon: "assets/icons/html.png",
    },
    {
        name: "CSS",
        icon: "assets/icons/css.png",
    },
    {
        name: "JavaScript",
        icon: "assets/icons/js.png",
    },
    {
        name: "React",
        icon: "assets/icons/react.png",
    },
    {
        name: "Typescript",
        icon: "assets/icons/typescript.png",
    },
    {
        name: "NodeJS",
        icon: "assets/icons/node.png",
    },
    {
        name: "Python",
        icon: "assets/icons/python.png",
    },
    {
        name: "Socket.io",
        icon: "assets/icons/socket.svg",
    },
    {
        name: "MongoDB",
        icon: "assets/icons/mongo.png",
    },
    {
        name: "Electron",
        icon: "assets/icons/electron.png",
    },
    {
        name: "Git",
        icon: "assets/icons/git.png",
    },
    {
        name: "SCSS",
        icon: "assets/icons/scss.png",
    },
]

items.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("swiper-slide")
    div.innerHTML = `
        <img style="width: 8rem; height: 8rem" src="${item.icon}" draggable="false" alt="${item.name}" />
        <p>${item.name}</p>
    `
    document.querySelector(".swiper-wrapper").appendChild(div)
})

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
        triggered = true
        new Swiper(".swiper", {
            loop: true,
            allowTouchMove: false,
            spaceBetween: 50,
            slidesPerView: 5,
            speed: 800,
            autoplay: { delay: 800 },
        })
    }
})
observer.observe(document.querySelector(".swiper-wrapper"))
