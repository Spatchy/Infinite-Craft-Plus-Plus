const discoverCounterItemCountElem = document.createElement("span")
const discoverCounterElem = document.createElement("div")

const getItemCount = (pageElems) => {
  return Array.from(pageElems.sidebarItems.children).filter(el => {
    return window.getComputedStyle(el).display !== "none"
  }).length
}

const refresh = (pageElems) => {
  const prefixString = 
    pageElems.sidebarItems.classList.contains("ICPP_showOnlyFavourites") 
      && pageElems.sidebarItems.classList.contains("ICPP_showOnlyDiscoveries") ? "Favourite First Discoveries: " : 
    pageElems.sidebarItems.classList.contains("ICPP_showOnlyFavourites") ? "Favourite Elements: " : 
    pageElems.sidebarItems.classList.contains("ICPP_showOnlyDiscoveries") ? "First Discoveries: " : 
    "Elements Crafted: ";
  
  discoverCounterElem.childNodes[0].nodeValue = prefixString
  discoverCounterItemCountElem.innerText = getItemCount(pageElems)
}

const inject = (pageElems) => {
  // DELETE INSTRUCTION LABEL (interferes with item count)
  if (pageElems.instructionLabel) {
    pageElems.instructionLabel.remove()
  }

  // CREATE DISCOVERY COUNTER DIV
  discoverCounterElem.classList.add("ICPP_discoveryCounter")
  discoverCounterElem.innerText = "Elements Crafted: "

  discoverCounterItemCountElem.classList.add("ICPP_itemCount")
  discoverCounterItemCountElem.innerText = getItemCount(pageElems)

  discoverCounterElem.appendChild(discoverCounterItemCountElem)

  pageElems.sidebarControls.insertBefore(discoverCounterElem, pageElems.sidebarControls.firstChild)
}

export { inject, refresh }
