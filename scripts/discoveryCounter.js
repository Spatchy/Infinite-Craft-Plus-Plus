const discoverCounterItemCountElem = document.createElement("span")

const getItemCount = (pageElems) => {
    return pageElems.sidebarItems.children.length
}

const refresh = (pageElems) => {
    discoverCounterItemCountElem.innerText = getItemCount(pageElems)
}

const inject = (pageElems) => {
    // DELETE INSTRUCTION LABEL (interferes with item count)
    pageElems.instructionLabel ? pageElems.instructionLabel.remove() : null

    // CREATE DISCOVERY COUNTER DIV
    const discoverCounterElem = document.createElement("div")
    discoverCounterElem.classList.add("ICPP_discoveryCounter")
    discoverCounterElem.innerText = "Items Discovered: "

    discoverCounterItemCountElem.classList.add("ICPP_itemCount")
    discoverCounterItemCountElem.innerText = getItemCount(pageElems)

    discoverCounterElem.appendChild(discoverCounterItemCountElem)

    pageElems.sidebarControls.insertBefore(discoverCounterElem, pageElems.sidebarControls.firstChild)
}

export {inject, refresh}