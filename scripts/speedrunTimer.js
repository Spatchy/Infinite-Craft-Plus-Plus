
let timer = null
let targetString = null

const start = () => {
    const startTime = Date.now()
    timer = setInterval(() => {
        const timeElapsed = new Date(Date.now() - startTime)
        
        const hours = String(timeElapsed.getHours()-1).padStart(2, '0')
        const minutes = String(timeElapsed.getMinutes()).padStart(2, '0')
        const seconds = String(timeElapsed.getSeconds()).padStart(2, '0')
        const milliseconds = String(timeElapsed.getMilliseconds()).padStart(3, '0')
        
        console.log(`${hours}:${minutes}:${seconds}:${milliseconds}`)
    }, 1)
}

const stop = () => {
    clearInterval(timer)
}

const setTargetString = (str) => {
    targetString = str.toLowerCase()
}

const compareToTargetString = (str) => {
    if (str === targetString) {
        stop()
    }
}

export {start, stop, setTargetString, compareToTargetString}