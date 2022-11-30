const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');

const exportBtn = document.getElementById("export");
const clearBtn = document.getElementById("clearBtn");
const fileName = document.getElementById("filename");
const preview = document.getElementById("preview");
const [xStatus, yStatus] = [document.getElementById("xStatus"), document.getElementById("yStatus")];

const baseArea = 180 // Predicted area of the canvas (Bounds)
const baseMultiplier = 3 // Only changes the scaled size of the canvas
const penOffset = 40 // 40mm from the actual nozzle

let plots = [];
let painting = false;

canvas.width = (baseArea * baseMultiplier);
canvas.height = (baseArea * baseMultiplier);

function startPosition(e) {
    painting = true;
    draw(e);
    plots.push(["G1 Z0"]) // Set pen to 0mm (Down)
    generatePreviews()
    canvas.style.boxShadow = "0 0 0 0.4rem rgba(255, 255, 255, 0.15)"
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
    plots.push(["G1 Z4"]) // Set pen to 4mm (Up)
    generatePreviews()
    canvas.style.boxShadow = "0 0 0 0.4rem rgba(255, 255, 255, 0.1)"
}

function draw(event) {
    if(!painting) return;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ffffff';
    if (event.offsetX >= baseArea * baseMultiplier || event.offsetY >= baseArea * baseMultiplier) return;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);

    let [x, y] = [Math.trunc(event.offsetY / baseMultiplier), Math.trunc(event.offsetX / baseMultiplier)]
    if (x < 5 && y < 5) return
    xStatus.innerText = Math.trunc(x)
    yStatus.innerText = Math.trunc(y)
    clearBtn.style.display = "block"

    plots.push([x, y, plots.length])
    generatePreviews()
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

function generatePreviews() {
    preview.innerHTML = ""
    let recentPlots = plots.slice(Math.max(plots.length - 40, 0))
    recentPlots.forEach((plot) => {
        if (plot[0] === "G1 Z4") {
            preview.innerHTML += `
            <div class="data">
                <span>[Pen up]</span> 
                <span class="info">
                    <span style="color: orange">G1</span>
                    Z <span style="color: lime">4</span>
                </span>
            </div>`
        } else if (plot[0] === "G1 Z0") {
            preview.innerHTML += `
            <div class="data">
                <span>[Pen down]</span> 
                <span class="info">
                    <span style="color: orange">G1</span>
                    Z <span style="color: lime">0</span>
                </span>
            </div>`
        } else {
            preview.innerHTML += `
            <div class="data">
                <span style="padding: 0.1rem 0.6rem; background: rgba(255, 255, 255, 0.05); border-radius: 3px">${plot[2]}</span>
                <span class="info">
                    <span style="color: orange">G1</span>
                    X <span style="color: aqua">${plot[0]}</span>
                    Y <span style="color: tomato">${plot[1]}</span>
                </span>
            </div>
            `
        }
    })
    document.querySelector(".preview").scrollTop = document.querySelector(".preview").scrollHeight
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    plots = []
    clearBtn.style.display = "none"
    preview.innerHTML = `<div style="color: #999; margin: 0 0 -1rem 0" class="data">No plot data yet.</div>`
} reset()

function generate(name, data) {
    const gcode = `;layer_height: 0.2
;base_print_speed: 200
;travel_speed: 200
;right_extruder_temperature: 30
;left_extruder_temperature: 0
;platform_temperature: 25
;right_extruder_temperature_raft0: 0
;left_extruder_temperature_raft0: 0
;right_extruder_temperature_reset: 
;left_extruder_temperature_reset: 
;start gcode
G92 E0 ; Reset Extruder
G28 ; Home all axes
G1 Z4
${data}
M107
;percent
;End of gcode
M18`
    if (!name) name = "plot"
    name = name.replace(/ /g, "_")
    const element = document.createElement("a")
    const file = new Blob([String(gcode)], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = name + ".gcode"
    document.body.appendChild(element)
    element.click()
}

exportBtn.addEventListener("click", () => {
    let fn = fileName.value.trim().toLowerCase()
    let format_gcode = ""
    plots.forEach(plot => {
        if (plot[0] === "G1 Z4") format_gcode += `\n${plot[0]}`
        else if (plot[0] === "G1 Z0") format_gcode += `\n${plot[0]}`
        else format_gcode += `\nG1 X${plot[0]+penOffset} Y${plot[1]+penOffset}`   
    })
    generate(fn, format_gcode)
})