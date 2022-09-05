function inViewport(el) {
    var H = window.innerHeight;
    r = el.getBoundingClientRect(),t = r.top,b = r.bottom;
    return Math.max(0, t > 0 ? H - t : b < H ? b : H);
}

document.addEventListener("scroll", function () {
    var window_offset = inViewport(document.getElementsByClassName('intro')[0]);
    document.getElementsByClassName('overlay')[0].style.height = window_offset + "px";
    document.getElementsByClassName('caption')[0].style.bottom = window_offset / 2 + "px";
})

AOS.init();