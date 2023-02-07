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
