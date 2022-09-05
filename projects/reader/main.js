var pause = false;
var destructure
function reset() {
    pause = true
    document.getElementById('read-button').removeAttribute('hidden')
    document.getElementById('read-now').innerHTML = null;
    document.getElementById('read-ahead').innerHTML = null;
}
function getWordTime(content) {
    if (content.includes(".")) return 1000
    if (content.includes(",")) return 800
    let timeNeeded = content.length * 100;
    if (timeNeeded < 300) return 300;
    if (timeNeeded > 600) return 600;
    return timeNeeded
}
async function readAhead() {
    for (let i=1;i<destructure.length;i++) {
        if (pause == true) return
        document.getElementById('read-ahead').innerHTML = `${destructure[i]}`;
        await new Promise(resolve => {setTimeout(resolve, getWordTime(destructure[i]))});
    };
}
async function read(content) {
    document.getElementById('read-button').setAttribute('hidden', true)
    pause = false
    destructure = content.split(' ');
    readAhead(destructure)
    for (let i=0;i<destructure.length;i++) {
        if (pause == true) return
        document.getElementById('read-now').innerHTML = `${destructure[i]}`;
        await new Promise(resolve => {setTimeout(resolve, getWordTime(destructure[i]))});
    }; reset()
}