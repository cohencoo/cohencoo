const video = document.getElementById("video");
const display = document.querySelector('.statistics');
let raw, identity
let ageRange = [];
let predictions = []

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("models"),
    faceapi.nets.faceExpressionNet.loadFromUri("models"),
    faceapi.nets.ageGenderNet.loadFromUri("models")
]).then(init);

function init() {
    display.innerHTML = `<p style="margin: 0" class="subtitle">Subject Statistics</p>
  <p style="margin: 0.5rem 0 0 0">(<span id="stats-identity">Adult</span>) <span id="stats-accuracy">0%</span></p>
  <p style="margin: 0" id="stats-age">Age: 0</p>
  <p style="margin: 0" id="stats-current">Expression: Neutral</p>
  <p style="margin: 1rem 0 0 0" class="subtitle">Emotions breakdown</p>
  <p style="margin: 0.5rem 0 0 0" id="stats-all"></p>`
    navigator.getUserMedia({video: {}},
        stream => (video.srcObject = stream),
        err => console.error(err)
    );
}
function roundTo(n, digits) {
    if (digits === undefined) digits = 0;
    var ml = Math.pow(10, digits);
    n = parseFloat((n * ml).toFixed(11));
    return Math.round(n) / ml;
}
video.addEventListener("playing", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {
        width: video.width,
        height: video.height
    };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
        try {
            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withAgeAndGender();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            
            raw = resizedDetections[0].expressions;
            predictions = (Object.keys(raw).map(function(key) {return [key, raw[key]]}))

            document.getElementById('stats-age').innerText = "Subject Age: " + roundTo(agePredict(resizedDetections[0].age), 1);
            document.getElementById('stats-identity').innerText = identity;
            document.getElementById('stats-accuracy').innerText = roundTo(predictions[0][1], 2) + "%";
            document.getElementById('stats-current').innerText = "Current: " + predictions.reduce((prev, curr) => (prev[1] > curr[1]) ? prev : curr)[0];
        } catch (err) {}
    });
});
setInterval(() => {
  try {
    document.getElementById('stats-all').innerHTML = null;
    Object.keys(raw).sort((a, b) => raw[b] - raw[a]).forEach(function(key) {
        document.getElementById('stats-all').innerHTML += key + ": " + roundTo(raw[key], 2) + "<br>"
    });
  } catch (err) {}
}, 1000);
function agePredict(age) {
    ageRange = [age].concat(ageRange).slice(0, 30);
    const avgPredictedAge = ageRange.reduce((total, a) => total + a) / ageRange.length;
    if (avgPredictedAge <= 18) identity = "Child"
    if (avgPredictedAge > 18) identity = "Adult"
    return avgPredictedAge;
}
