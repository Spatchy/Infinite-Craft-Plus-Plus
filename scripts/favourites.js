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
    favourites = favourites.filter(e => e !== element.innerText)
    saveFavourites()
  } else {
    element.classList.add("ICPP_isFavourite")
    favourites.push(element.innerText)
    saveFavourites()
  }
}

const insertStarIcon = (element) => {
  if (!element.querySelector("img")) {
    const insertedStarIcon = starIcon.cloneNode()
    element.appendChild(insertedStarIcon)
  
    if (favourites.includes(element.innerText)) {
      element.classList.add("ICPP_isFavourite")
    }
  
    // Block default mouse listeners causing unwanted behaviour
    insertedStarIcon.addEventListener("mousedown", (event) => {
      event.stopImmediatePropagation()
    })
  
    insertedStarIcon.addEventListener("click", () => {
      toggleFavourite(insertedStarIcon.parentNode)
    })
  }
}

const applyStarToAll = (pageElems) => {
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            insertStarIcon(entry.target);
            observer.unobserve(entry.target);
        }
    })
  }, {
    root: null,
    threshold: 0.1
  })

  Array.from(pageElems.sidebarItems.children).forEach(async (element) => {
    intersectionObserver.observe(element)
  })
}

const clearAllStars = () => {
  Array.from(document.querySelectorAll(".ICPP_isFavourite")).forEach((element) => {
    element.classList.remove("ICPP_isFavourite")
  })
}

const inject = async (pageElems) => {
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
  })

  pageElems.discoveriesBtn.addEventListener("click", (event) => {
    applyStarToAll(pageElems)
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

  pageElems.sidebarSorting.insertBefore(viewFavouritesBtn, pageElems.sidebarSorting.firstChild)

  applyStarToAll(pageElems)
}

export { inject, insertStarIcon }
