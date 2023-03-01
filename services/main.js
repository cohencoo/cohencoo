const banner = document.querySelector(".banner")
const progressContainer = document.querySelector(".progress-container")
const copyDate = document.querySelector("#copy-date")

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
        <a style="font-size: 1.1rem; font-weight: 500;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>`
    }, true)
}

const slideshow = {
    slide: 1,
    maxSlides: 7,
    slideClock: null,
    nextSlide: () => {
        slideshow.slide++
        if (slideshow.slide > slideshow.maxSlides) slideshow.slide = 1
        slideshow.setSlide()
    },
    setSlide: () => {
        banner.style.backgroundImage = `url(banner/${slideshow.slide}.webp)`
        document.querySelectorAll(".index").forEach((child, index) => {
            child.classList.remove("index-active")
            if (index + 1 === slideshow.slide) child.classList.add("index-active")
        })
    }
}

for (let i = 0; i < slideshow.maxSlides; i++) {
    const div = document.createElement("div")
    div.classList.add("index")
    div.addEventListener("click", () => {
        clearInterval(slideshow.slideClock)
        slideshow.slide = i + 1
        slideshow.setSlide()
        slideshow.slideClock = setInterval(() => slideshow.nextSlide(), 3000)
    })
    progressContainer.appendChild(div)
}
slideshow.setSlide()
slideshow.slideClock = setInterval(() => slideshow.nextSlide(), 3000)

copyDate.innerHTML = new Date().getFullYear()