const decoy = document.createElement("div")
document.body.appendChild(decoy)
const bwd = document.createElement("a")
bwd.setAttribute("href", "https://bespokewebdev.com")
bwd.setAttribute("target", "_blank")
bwd.style = `
    width: fit-content; height: fit-content; display: flex; align-items: center; color: #999
    !important; border-radius: 6px; background: rgba(255, 255, 255, 0.05); font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    sans-serif z-index: 9999; margin-top: calc(${decoy.offsetHeight}px - 4rem); margin-right: 4rem;
    text-decoration: none; float: right;
`

bwd.innerHTML = `
    <span style="font-size: 13px; padding: 3px 6px">Developed by</span>
    <span
        style="font-weight: 600; color: white; background: rgba(0, 0, 0, 0.4); font-size: 13px; padding: 3px 6px; height: 100%; display: flex; align-items: center; border-radius: 0 5px 5px 0;"
        >Bespoke Web Dev</span
    >
`

document.body.appendChild(bwd)
