const sidebar = document.querySelector(".sidebar")
const sidebarItems = document.querySelector(".sidebar > .items")
const sidebarControls = document.querySelector(".sidebar > .sidebar-controls")

const getItemCount = () => {
    return sidebarItems.children.length
}

// DELETE INSTRUCTION LABEL (interferes with item count)
const instructionlabel = document.querySelector(".sidebar > .items > .instruction")
instructionlabel ? instructionlabel.remove() : null

// CREATE DISCOVERY COUNTER DIV
const discoverCounterElem = document.createElement("div")
discoverCounterElem.classList.add("ICPP_discoveryCounter")
discoverCounterElem.innerText = "Items Discovered: "

const discoverCounterItemCountElem = document.createElement("span")
discoverCounterItemCountElem.classList.add("ICPP_itemCount")
discoverCounterItemCountElem.innerText = getItemCount()

discoverCounterElem.appendChild(discoverCounterItemCountElem)

sidebarControls.insertBefore(discoverCounterElem, sidebarControls.firstChild)


// MIDDLE CLICK TO DUPLICATE
document.addEventListener('mousedown', function(event) {
    if (event.button === 1) { 
        var doubleClickEvent = new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
        })
        event.target.dispatchEvent(doubleClickEvent)
    }
})


const speedrunTimerSrc = chrome.runtime.getURL("scripts/speedrunTimer.js")
const particleToggleSrc = chrome.runtime.getURL("scripts/particleToggle.js")
import(speedrunTimerSrc).then((speedrunTimer) => {
    import(particleToggleSrc).then((particleToggle) => {
        // LISTEN FOR CRAFT
        var observer = new MutationObserver(() => {
            discoverCounterItemCountElem.innerText = getItemCount()
            const mostRecentDiscoveryNode = sidebarItems.lastElementChild.childNodes[1]
            const mostRecentDiscoveryString = mostRecentDiscoveryNode.wholeText.replace(/\s/g,'').toLowerCase()
            speedrunTimer.compareToTargetString(mostRecentDiscoveryString)
            console.log(mostRecentDiscoveryString)
        })
        observer.observe(sidebarItems, {childList: true})

        particleToggle.injectParticleToggle()
        speedrunTimer.injectMenu()
    })
})

