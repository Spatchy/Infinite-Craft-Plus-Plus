const speedrunTimerSrc = chrome.runtime.getURL("scripts/speedrunTimer.js")
const particleToggleSrc = chrome.runtime.getURL("scripts/particleToggle.js")
const discoveryCounterSrc = chrome.runtime.getURL("scripts/discoveryCounter.js")
const middleClickDuplicateSrc = chrome.runtime.getURL("scripts/middleClickDuplicate.js")
const pageElemsSrc = chrome.runtime.getURL("scripts/mainPageElementSelectors.js")
const resizeSidebarSrc = chrome.runtime.getURL("scripts/resizeSidebar.js")
const favouritesSrc = chrome.runtime.getURL("scripts/favourites.js")

const main = async () => {
  const speedrunTimer = await import(speedrunTimerSrc)
  const particleToggle = await import(particleToggleSrc)
  const discoveryCounter = await import(discoveryCounterSrc)
  const middleClickDuplicate = await import(middleClickDuplicateSrc)
  const pageElems = (await import(pageElemsSrc)).pageItems
  const resizeSidebar = await import(resizeSidebarSrc)
  const favourites = await import(favouritesSrc)

  // LISTEN FOR CRAFT
  const observer = new MutationObserver(() => {
    const mostRecentDiscoveryNode = pageElems.sidebarItems.lastElementChild
    const mostRecentDiscoveryString = mostRecentDiscoveryNode.childNodes[1].wholeText.replace(/\s/g, "").toLowerCase()
    speedrunTimer.compareToTargetString(mostRecentDiscoveryString)

    discoveryCounter.refresh(pageElems)
    if (pageElems.sidebarItems.children.length > 4) { // prevent weird issues on game reset
      favourites.insertStarIcon(mostRecentDiscoveryNode, pageElems, discoveryCounter.refresh)
    }
  })
  observer.observe(pageElems.sidebarItems, { childList: true })

  middleClickDuplicate.start(pageElems)
  discoveryCounter.inject(pageElems)
  particleToggle.injectParticleToggle(pageElems)
  speedrunTimer.injectMenu(pageElems)
  resizeSidebar.inject(pageElems)
  favourites.inject(pageElems, discoveryCounter.refresh)
}

main()
