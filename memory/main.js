const display = document.getElementById('memory');
const value = document.getElementById('number');
const indicator = document.querySelector(".input-container");

const defaultLength = 6;
const defaultRange = [100000, 999999];
const flash = defaultLength / 2 * 1000;
var pause = false;
var secret;

const randomNumber = (range) => String(Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]))

for (let i = 0; i < defaultLength; i++) {
    let fields = document.createElement('div')
    fields.className = "field"
    indicator.appendChild(fields)
}

setInterval(() => {
    let useField = value.value.trim().split('')
    for (let i = useField.length; i < defaultLength; i++) useField.push('<span>-</span>')
    for (let i=0; i<defaultLength; i++) document.getElementsByClassName("field")[i].innerHTML = useField[i]
    value.onpaste = e => e.preventDefault()
    value.focus()
});

function newTest() {
    state("reset")
    secret = randomNumber(defaultRange)
    pause = false
    value.value = null
    display.innerHTML = secret

    setTimeout(() => {
        display.style.transform = "translateY(0%)"
        display.style.opacity = "100%"
        indicator.style.transform = "translateY(100%)"
        indicator.style.opacity = "0%"
    }, 400)

    value.setAttribute('disabled', 'disabled')
    value.setAttribute('maxLength', defaultLength)

    setTimeout(() => {
        value.removeAttribute('disabled')
        value.focus()
        display.style.transform = "translateY(-100%)"
        display.style.opacity = "0%"

        setTimeout(() => {
            display.innerHTML = null
            indicator.style.transform = "translateY(0%)"
            indicator.style.opacity = "100%"
        }, 400)
    }, flash);
}; newTest()

value.addEventListener('keyup', () => {
    if (pause == true) return
    if (value.value.length == defaultLength) {
        if (value.value == secret) {state("correct"); setTimeout(newTest, 1500)}
        else state("incorrect")
        pause = true
    }
})

function state(state) {
    switch (state) {
        case "reset":
            indicator.style.border = "rgb(0, 42, 179) 3px solid"
            indicator.style.boxShadow = "0 0 0 8px rgba(5, 63, 255, 0.2)"
            break
        case "correct":
            indicator.style.border = "rgb(0, 250, 20, 0.3) 3px solid"
            indicator.style.boxShadow = "0 0 0 8px rgba(0, 250, 20, 0.2)"
            break
        case "incorrect":
            Menu.open({title: 'Mismatch', content: `<p style="border: 0" class="subtitle">Your results</p>
                    <div class="result">
                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 3rem; height: 3rem; color: var(--theme-red); vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        <div style="margin-left: 3rem">
                            <p style="border: 0; margin-bottom: 0" class="subtitle">Your Input</p>
                            ${value.value}
                        </div>
                    </div>
                    <div class="result">
                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 3rem; height: 3rem; color: var(--theme-green); vertical-align: middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-right"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                        <div style="margin-left: 3rem">
                            <p style="border: 0; margin-bottom: 0" class="subtitle">Correct Input</p>
                            ${secret}
                        </div>
                    </div>
                    <button onclick="Menu.close(); setTimeout(newTest, 500)" style="margin: 1rem 0 -1rem 0; background: var(--shade-3)">Continue</button>
            `}, false, false)
            indicator.style.border = "rgb(255, 0, 0) 3px solid"
            indicator.style.boxShadow = "0 0 0 8px rgba(255, 0, 0, 0.2)"
            break
    }
}