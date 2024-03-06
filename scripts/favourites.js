const starIcon = document.createElement("img")
starIcon.src = chrome.runtime.getURL("images/star-solid.svg")
starIcon.classList.add("ICPP_favouriteStar")

let favourites = []

const loadFavourites = async () => {
  favourites = (await chrome.storage.local.get(["favourites"])).favourites

  // Init favourites if not stored
  if (favourites === undefined) {
    favourites = []
    saveFavourites()
  }
}

const saveFavourites = () => {
  chrome.storage.local.set({ favourites })
}

const toggleFavourite = (element) => {
  if (element.classList.contains("ICPP_isFavourite")) {
    element.classList.remove("ICPP_isFavourite")
    favourites = favourites.filter(e => {
      const [emoji, text] = Array.from(element.childNodes)
      const comboString = `${emoji.innerText.trim()} ${text.wholeText.trim()}`
      return e !== comboString
    })
    saveFavourites()
  } else {
    element.classList.add("ICPP_isFavourite")
    const [emoji, text] = Array.from(element.childNodes)
    const comboString = `${emoji.innerText.trim()} ${text.wholeText.trim()}`
    favourites.push(comboString)
    saveFavourites()
  }
}

const reimplementDiscoveriesBtn = (pageElems, refreshElementCounter) => {
  const replacementDiscoveriesBtn = pageElems.discoveriesBtn.cloneNode(true)

  pageElems.discoveriesBtn.replaceWith(replacementDiscoveriesBtn)

  replacementDiscoveriesBtn.addEventListener("click", (event) => {
    event.stopImmediatePropagation()
    event.preventDefault()

    if (replacementDiscoveriesBtn.classList.contains("sidebar-discoveries-active")) {
      replacementDiscoveriesBtn.classList.remove("sidebar-discoveries-active")
      pageElems.sidebarItems.classList.remove("ICPP_showOnlyDiscoveries")
    } else {
      replacementDiscoveriesBtn.classList.add("sidebar-discoveries-active")
      pageElems.sidebarItems.classList.add("ICPP_showOnlyDiscoveries")
    }

    refreshElementCounter(pageElems)
  })
}

const insertStarIcon = (element, pageElems, refreshElementCounter) => {
  if (!element.querySelector("img")) {
    const insertedStarIcon = starIcon.cloneNode()
    element.appendChild(insertedStarIcon)

    if (favourites.includes(element.innerText.trim())) {
      element.classList.add("ICPP_isFavourite")
    }

    // Block default mouse listeners causing unwanted behaviour
    insertedStarIcon.addEventListener("mousedown", (event) => {
      event.stopImmediatePropagation()
    })

    insertedStarIcon.addEventListener("click", () => {
      toggleFavourite(insertedStarIcon.parentNode)
      refreshElementCounter(pageElems)
    })
  }
}

const applyStarToAll = (pageElems, refreshElementCounter) => {
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        insertStarIcon(entry.target, pageElems, refreshElementCounter)
        observer.unobserve(entry.target)
      }
    })
  }, {
    root: null
  })

  Array.from(pageElems.sidebarItems.children).forEach(async (element) => {
    intersectionObserver.observe(element)

    if (favourites.includes(element.innerText)) {
      element.classList.add("ICPP_isFavourite")
    }
  })
}

const clearAllStars = () => {
  Array.from(document.querySelectorAll(".ICPP_isFavourite")).forEach((element) => {
    element.classList.remove("ICPP_isFavourite")
  })
}

const reimplementSearchClearBtn = (pageElems, refreshElementCounter) => {
  const replacementSearchClearBtn = pageElems.sidebarSearchClearBtn.cloneNode(true)

  pageElems.sidebarSearchClearBtn.replaceWith(replacementSearchClearBtn)

  replacementSearchClearBtn.style.display = "inherit"

  replacementSearchClearBtn.addEventListener("click", (event) => {
    pageElems.sidebarSearch.select()
    pageElems.sidebarSearch.value = ""
    pageElems.sidebarSearch.dispatchEvent(new Event('input', {
      bubbles: true,
      cancelable: true,
    }))
    setTimeout(() => {
      applyStarToAll(pageElems, refreshElementCounter)
    }, 100)
  })
}

const inject = async (pageElems, refreshElementCounter) => {
  await loadFavourites()

  const viewFavouritesBtn = document.createElement("div")
  viewFavouritesBtn.classList.add("ICPP_viewFavouritesBtn")
  viewFavouritesBtn.classList.add("sidebar-sorting-item")
  viewFavouritesBtn.innerText = " Favourites "
  viewFavouritesBtn.insertBefore(starIcon, viewFavouritesBtn.firstChild)

  viewFavouritesBtn.addEventListener("click", (event) => {
    if (viewFavouritesBtn.classList.contains("ICPP_sortingItemSelected")) {
      viewFavouritesBtn.classList.remove("ICPP_sortingItemSelected")
      pageElems.sidebarItems.classList.remove("ICPP_showOnlyFavourites")
    } else {
      viewFavouritesBtn.classList.add("ICPP_sortingItemSelected")
      pageElems.sidebarItems.classList.add("ICPP_showOnlyFavourites")
    }

    refreshElementCounter(pageElems)
  })

  pageElems.resetBtn.addEventListener("mousedown", (event) => {
    event.stopImmediatePropagation()
    if (confirm("Your favourites must be cleared in order to reset the game. Clear your favourites?")) {
      favourites = []
      saveFavourites()
      clearAllStars()

      const clickEvent = new MouseEvent("click", {
        bubbles: false,
        cancelable: true
      })

      event.target.dispatchEvent(clickEvent)
    }
  })

  pageElems.sidebarSearch.addEventListener("input", (event) => {
    setTimeout(() => {
      applyStarToAll(pageElems, refreshElementCounter)
    }, 100)
  })

  pageElems.sidebarSorting.insertBefore(viewFavouritesBtn, pageElems.sidebarSorting.firstChild)

  reimplementSearchClearBtn(pageElems, refreshElementCounter)
  reimplementDiscoveriesBtn(pageElems, refreshElementCounter)
  applyStarToAll(pageElems, refreshElementCounter)
}

export { inject, insertStarIcon }
