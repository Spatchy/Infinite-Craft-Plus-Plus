const starIcon = document.createElement("img")
starIcon.src = chrome.runtime.getURL("images/star-solid.svg")
starIcon.classList.add("ICPP_favouriteStar")

const toggleFavourite = (element) => {
  if (element.classList.contains("ICPP_isFavourite")) {
    element.classList.remove("ICPP_isFavourite")
  } else {
    element.classList.add("ICPP_isFavourite")
  }
}

const insertStarIcon = (element) => {
  const insertedStarIcon = starIcon.cloneNode()
  element.appendChild(insertedStarIcon)

  // Block default mouse listeners causing unwanted behaviour
  insertedStarIcon.addEventListener("mousedown", (event) => {
    event.stopImmediatePropagation()
  })

  insertedStarIcon.addEventListener("click", () => {
    toggleFavourite(insertedStarIcon.parentNode)
  })
}

const applyStarToAll = (pageElems) => {
  Array.from(pageElems.sidebarItems.children).forEach(async (element) => {
    insertStarIcon(element)
  })
}

const inject = (pageElems) => {
  const viewFavouritesBtn = document.createElement("div")
  viewFavouritesBtn.classList.add("ICPP_viewFavouritesBtn")
  viewFavouritesBtn.classList.add("sidebar-sorting-item")
  viewFavouritesBtn.innerText = " Favourites "
  viewFavouritesBtn.insertBefore(starIcon, viewFavouritesBtn.firstChild)

  viewFavouritesBtn.addEventListener("click", (event) => {
    if(viewFavouritesBtn.classList.contains("ICPP_sortingItemSelected")) {
      viewFavouritesBtn.classList.remove("ICPP_sortingItemSelected")
      pageElems.sidebarItems.classList.remove("ICPP_showOnlyFavourites")
    } else {
      viewFavouritesBtn.classList.add("ICPP_sortingItemSelected")
      pageElems.sidebarItems.classList.add("ICPP_showOnlyFavourites")
    }
  })

  pageElems.discoveriesBtn.addEventListener("click", (event) => {
    applyStarToAll(pageElems)
  })
  
  pageElems.sidebarSorting.insertBefore(viewFavouritesBtn, pageElems.sidebarSorting.firstChild)

  applyStarToAll(pageElems)
}

export { inject, insertStarIcon }