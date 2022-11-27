let temperature = 0;
const birthday = "September 13 2023"
const birthDate = 31556900000;

window.addEventListener("scroll", function() {
  let scrollPosition = window.scrollY;
  let a = (500 / scrollPosition);
  if (a >= 1 && a <= 8) document.getElementsByClassName("app-container")[0].style.padding = `0 ${a}vw 0  ${a}vw`;
})

const search = document.getElementById("search")
setInterval(() => search.focus(), 200)
search.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    window.open("https://www.google.com/search?q=" + search.value.replaceAll(" ", "+"))
  }
})

let currentBattery = "N/A";
if (navigator.getBattery) navigator.getBattery().then((battery) => currentBattery = (battery.level * 100))
setInterval(document.title = time.date(), 200)

weather('Adelaide', (data) => temperature = data.feels)
setInterval(() => {
  let count = time.countdown(birthday)
  count = count.days + " : " + count.hours + " : " + count.minutes + " : " + count.seconds
  var countAge = (new Date() - 1158105600000) / birthDate;
  countAge = countAge.toFixed(9).toString().split('.');

  document.getElementById('current-time').innerHTML = time.time()
  document.getElementById('current-date').innerHTML = time.date()
  document.getElementById('current-day').innerHTML = time.day()
  document.getElementById('current-complete').innerHTML = time.complete()
  document.getElementById('current-complete-status').style.width = time.complete()
  document.getElementById('current-complete-year').innerHTML = time.yearComplete()
  document.getElementById('current-complete-year-status').style.width = time.yearComplete()
  document.getElementById('current-countdown').innerHTML = count
  document.getElementById('current-weather').innerHTML = temperature + "°C"
  document.getElementById('current-battery').innerHTML = Math.trunc(currentBattery) + "%"
  document.getElementById('current-age').innerHTML = countAge[0] + '.' + countAge[1]
});