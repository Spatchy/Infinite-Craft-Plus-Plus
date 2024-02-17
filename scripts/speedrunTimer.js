const sideControls = document.querySelector(".side-controls")

let timer = null
let targetString = null
const timeElement = document.createElement("span")
timeElement.innerText = "00:00:00.000"

const start = () => {
    const startTime = Date.now()
    timer = setInterval(() => {
        const timeElapsed = new Date(Date.now() - startTime)
        
        const hours = String(timeElapsed.getHours()-1).padStart(2, '0')
        const minutes = String(timeElapsed.getMinutes()).padStart(2, '0')
        const seconds = String(timeElapsed.getSeconds()).padStart(2, '0')
        const milliseconds = String(timeElapsed.getMilliseconds()).padStart(3, '0')
        
        timeElement.innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`
    }, 1)
}

const stop = () => {
    clearInterval(timer)
}

const setTargetString = (str) => {
    targetString = str.toLowerCase()
}

const injectMenu = () => {
    // BUTTON
    const button = document.createElement("div")
    button.classList.add("ICPP_speedrunTimerMenuButton")
    const timerIcon = document.createElement("img")
    timerIcon.src = chrome.runtime.getURL("images/stopwatch-solid.svg")
    timerIcon.classList.add("ICPP_timerIcon")
    button.appendChild(timerIcon)

    // MENU
    const menuContainer = document.createElement("div")
    const startStopBtn = document.createElement("div")
    const targetInput = document.createElement("input")

    menuContainer.classList.add("ICPP_timerMenuContainer")
    menuContainer.classList.add("ICPP_hidden")
    startStopBtn.innerText = "start/stop"
    targetInput.placeholder = "Target"

    menuContainer.appendChild(timeElement)
    menuContainer.appendChild(startStopBtn)
    menuContainer.appendChild(targetInput)

    // INSERT CONTENT
    sideControls.insertBefore(button, sideControls.firstChild)
    sideControls.insertBefore(menuContainer, sideControls.firstChild)
    
    // ADD EVENT LISTENERS
    button.addEventListener("click", () => {
        menuContainer.classList.remove("ICPP_hidden")
    })

    startStopBtn.addEventListener("click", () => {
        start()
    })

    targetInput.addEventListener("keyup", () => {
        setTargetString(targetInput.value)
        console.log(targetString)
    })

}

const compareToTargetString = (str) => {
    console.log("comparing", str, "to", targetString)
    if (str === targetString) {
        stop()
    }
}

export {start, stop, setTargetString, compareToTargetString, injectMenu}