let total = 25;
let mode = 'word';
let style = 'flow'
let difficulty = {current: 6}
const script = document.querySelector('#input');
const prompter = document.querySelector('#prompt');
const count = document.querySelector('#counted');
const completed = document.querySelector('.completed')

let inView = 500;
let started = false;
let autoFail = false;
let menuFocused = false;
let counted = 0, timer = 0, wpm = 0, errors = 0, index = 0, autoCount = 0;
let result = {
    wpm: new Array(), 
    elapsed: new Array(),
    errors: new Array(),
};
let tmpTime;
let trackError = [];
let passed = new String();
let freeWrite = new String();
let current = script.value.substring(index, index + inView);

window.addEventListener('keydown', function(e) {
    if (menuFocused) {
        if (e.key == 'Enter') {Menu.close(); reset()}; return
    }
    if (!started) {start(); started = true}
    if (e.getModifierState("CapsLock")) document.querySelector('.capital').style.display = 'block';
    else document.querySelector('.capital').style.display = 'none';

    var char = e.key
    if (char == "Shift" || char == "Control" || char == "Alt" || char == "Meta" || char == "CapsLock" || char == "Tab" || char == "Enter" || char == "ArrowLeft" || char == "ArrowRight" || char == "ArrowUp" || char == "ArrowDown") return
    if (mode == 'custom') {
        if (char == "Backspace") {
            freeWrite = freeWrite.substring(0, freeWrite.length - 1)
            prompter.innerHTML = `${freeWrite}<div class="caret"></div>`
            return
        }
        if (char == " ") {
            counted++; count.innerHTML = counted
        }; freeWrite += char; 
        prompter.innerHTML = `${freeWrite}<div class="caret"></div>`
        return
    }
    if (char == "Backspace") {
        if (style == 'flow') prompter.innerHTML = `${passed}<div style="margin-left: -0.35rem" class="caret"></div>${current}`;
        else prompter.innerHTML = `<div class="caret"></div>${current}`;
        return
    }
    if (char == script.value.charAt(index)) {
        if (char == " ") {counted++; count.innerHTML = counted}
        completed.style.width = (Math.round((counted / total) * 100) + '%')
        index++;

        let cut = total >= 100000 ? '...' : '';
        current = script.value.substring(index, index + inView) + cut
        let currentWord = current.split(' ')[0]

        passed += `<span style="color: var(--text)">${char}</span>`; trackError.push(false);
        if (style == 'flow') prompter.innerHTML = `${passed}<div style="margin-left: -0.35rem" class="caret"></div><span style="color: var(--theme-orange)">${currentWord}</span> ${current.slice(currentWord.length)}`
        else prompter.innerHTML = `<div class="caret"></div><span style="color: var(--theme-orange)">${currentWord}</span> ${current.slice(currentWord.length)}`
        
        if (index == script.value.length) {
            counted++;
            count.innerHTML = counted
            wpm = Math.round(counted / (timer / 60));
            document.querySelector('#wpm').innerHTML = wpm
            end();
        }
    } else {
        trackError.push(true);
        if (current.charAt(0) == " ") prompter.innerHTML = `${style == 'flow' ? passed : ""}<div style="margin-right: 0.1rem" class="caret wrong"></div>${current.slice(1)}`
        else prompter.innerHTML = `${style == 'flow' ? passed : ""}<div class="caret wrong" style="margin-right: -0.35rem"></div><span style="color: var(--theme-red)">${current.charAt(0)}</span>${current.slice(1)}`

        if (autoFail) {errors = 100; end(); return}
        if (!trackError[trackError.length - 2]) errors++;
    }
});
function settings() {
    Menu.open({title: 'Settings', content: `<br><strong>Difficulty:</strong>
    <span style="color: var(--subtext)">
        Change the maximum word length for the test. Allowing maximum of <b id="difficulty-value">${difficulty.current}</b> letters per word.
    </span><br><br>
    <input type="range" class="difficulty-slider" min="2" max="15" value="${difficulty.current}" oninput="difficulty.current=Math.round(this.value); document.querySelector('#difficulty-value').innerHTML=Math.round(this.value)">
    <hr>
    <strong>Auto Fail:</strong>
    <span style="color: var(--subtext)">
        Automatically fail the test if the user makes a mistake.
    </span>
    <br><br>
    <label class="toggle">
        <input onchange="autoFail = this.checked" ${autoFail ? "checked" : ""} type="checkbox"/>
        <span class="toggle-slider"></span>
    </label>
    <br><br>
    <button onclick="Menu.close(); reset()" class="menu-button">Continue</button>`}, false, true, 'custom')
}
function start() {
    document.querySelector('.logo').style.opacity = '0.5';
    document.querySelector('.tools').style.opacity = '0.5';
    tmpTime = setInterval(function() {
        timer++;
        wpm = Math.round(counted / (timer / 60))
        document.querySelector('#wpm').innerHTML = wpm
        result['wpm'].push(wpm); result['elapsed'].push(timer+'s'); result['errors'].push(errors);
    }, 1000)
}
function reset() {
    document.querySelector('.logo').style.opacity = '1';
    document.querySelector('.tools').style.opacity = '1';
    document.querySelector('#switch').style.display = 'none';
    completed.style.width = '0%'

    if (mode == 'word') {
        script.value = generate(total, difficulty.current);
        document.querySelector('#switch').style.display = 'flex';
    } 
    
    if (mode == 'quote') script.value = quote();
    autoCount = input.value.trim().replace(/\s+/gi, ' ').split(' ').length;

    if (total >= 100000 && mode == 'word' || mode == 'custom') document.querySelector('.wpm-display').style.opacity = '1';
    else document.querySelector('.wpm-display').style.opacity = '0';
    if (mode == 'word') document.getElementById('total-words').innerHTML = total >= 100000 ? "/ ∞" : "/" + total;
    else document.getElementById('total-words').innerHTML = "/" + autoCount;
    if (mode == 'custom') {document.getElementById('total-words').innerHTML = null; script.value = null; prompter.innerHTML = null}
    if (total >= 100000 && mode == 'word') style = 'track'
    else style = 'flow'

    document.querySelectorAll('#mode div').forEach(e=>e.style.background = 'transparent')
    document.querySelectorAll('.selector div').forEach(e=>e.style.background = 'transparent')
    if (total == 25) document.querySelector('#switch div:nth-child(2)').style.background = 'var(--shade-2)'
    if (mode == 'word') document.querySelector('#mode div:nth-child(1)').style.background = 'var(--shade-2)'

    clearInterval(tmpTime)
    started = false
    
    document.querySelector('#wpm').innerHTML = 0, count.innerHTML = 0, 
    index = 0, errors = 0, counted = 0, timer = 0, wpm = 0,
    result['errors'] = new Array(), 
    result['elapsed'] = new Array(), 
    result['wpm'] = new Array();
    passed = new String();
    
    current = script.value.substring(index, index + inView)
    let currentWord = current.split(' ')[0]
    prompter.innerHTML = `<div class="caret"></div><span style="color: var(--theme-orange)">${currentWord}</span> ${current.slice(currentWord.length)}`
}; reset()

function end() {
    clearInterval(tmpTime); /* Pause */ started = false;
    errors = Math.round((counted - errors) / counted * 100)

    Menu.open({title: ' ', content: `<div class="display-result" style="display: flex; justify-content: space-between; margin-top: -1rem">
        <div>
            <h1>WPM</h1><span class="result">${wpm}</span>
            <h1>ACCURACY</h1><span class="result">${errors < 0 ? 0 : errors}%</span>
            <h1>WORDS</h1><span class="result">${counted}/${autoCount >= 100000 ? '∞' : autoCount}</span>
            <h1>TIME</h1><span class="result">${timer}s</span>
        </div>
        <div class="chart-container"><canvas style="width: 100%; height: 100%" class="wpm-chart"></canvas></div>
    </div>
    <button onclick="Menu.close(); reset()" class="menu-button">Continue</button> <span style="margin-left: 1rem; color: var(--subtext)">Or press <kbd>enter</kbd> to continue.</span>`}, false, false)
    new Chart(document.querySelector('.wpm-chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: result['elapsed'],
            datasets: [{
              label: 'WPM',
              data: result['wpm'],
              fill: true,
              borderColor: 'rgb(255, 200, 30)',
              tension: 0.3,
            },
            {
                label: 'Errors (cumulative)',
                data: result['errors'],
                fill: true,
                borderColor: 'rgb(255, 100, 20)',
                tension: 0.3,
            }]
        },
    })
}