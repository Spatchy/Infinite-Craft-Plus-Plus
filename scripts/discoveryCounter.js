const sidebarItems = document.querySelector(".sidebar > .items")
const sidebarControls = document.querySelector(".sidebar > .sidebar-controls")

const discoverCounterItemCountElem = document.createElement("span")

const getItemCount = () => {
    return sidebarItems.children.length
}

const refresh = () => {
    discoverCounterItemCountElem.innerText = getItemCount()
}

const inject = () => {
    // DELETE INSTRUCTION LABEL (interferes with item count)
    const instructionlabel = document.querySelector(".sidebar > .items > .instruction")
    instructionlabel ? instructionlabel.remove() : null

    // CREATE DISCOVERY COUNTER DIV
    const discoverCounterElem = document.createElement("div")
    discoverCounterElem.classList.add("ICPP_discoveryCounter")
    discoverCounterElem.innerText = "Items Discovered: "

    discoverCounterItemCountElem.classList.add("ICPP_itemCount")
    discoverCounterItemCountElem.innerText = getItemCount()

    discoverCounterElem.appendChild(discoverCounterItemCountElem)

    sidebarControls.insertBefore(discoverCounterElem, sidebarControls.firstChild)
}

export {inject, refresh}