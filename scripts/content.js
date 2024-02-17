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

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "responseReceived") {
        setTimeout(() => {
            discoverCounterItemCountElem.innerText = getItemCount()
        }, 100)
    }
})