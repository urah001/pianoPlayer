const whiteKeys = ['z', 'x','c','v','b','n','m',',']
const blackKeys =['s', 'd', 'g','h','j']

const keys = document.querySelectorAll('.key')
const getAllWhhitekeys = document.querySelectorAll('.key.white')
const getAllBlackkeys = document.querySelectorAll('.key.black')
keys.forEach(key => {
    key.addEventListener("click", () => playNote(key) )
})

document.addEventListener('keydown',e => {
    const key = e.key;
    const whiteKeyIndex = whiteKeys.indexOf(key)
    const blackKeyIndex = blackKeys.indexOf(key)

    if(whiteKeyIndex > -1) playNote(getAllWhhitekeys[whiteKeyIndex ])
    if(blackKeyIndex > -1) playNote(getAllBlackkeys[blackKeyIndex ])

})

function playNote(key){
    const audioNote = document.getElementById(key.dataset.note)
    audioNote.currentTime = 0;
    audioNote.play()

key.classList.add('active')
audioNote.addEventListener('ended', () => {
    key.classList.remove('active')
})
}

const canvas = document.getElementById('canvas')
const canvasCtx = canvas.getContext('2d')
const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaStreamSource(stream)
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);

CanvasRenderingContext2D.clearRect(0, 0, WIDTH, HEIGHT)

function draw(){
    const drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
 canvasCtx.fillStyle = "rgb(200, 200, 200)";
 canvasCtx.fillRect(0,0, WIDTH, HEIGHT) 
 canvasCtx.lineWidth = 2;
 canvasCtx.strokeStyle = "rgb(0,0,0)";
 canvasCtx.beginPath()
 
 const sliceWidth = WIDTH / bufferLength; 
let x = 0;
for (let i = 0; index < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * (HEIGHT / 2);

    if (i === 0) {
        canvasCtx.moveTo(x, y);
    }else{
        canvasCtx.lineTo(x, y);
    }
    x += sliceWidth;
}

canvasCtx.lineTo(WIDTH, HEIGHT / 2)
canvasCtx.stroke()

}

draw()
