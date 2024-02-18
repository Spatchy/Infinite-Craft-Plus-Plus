const speedrunTimerSrc = chrome.runtime.getURL("scripts/speedrunTimer.js")
const particleToggleSrc = chrome.runtime.getURL("scripts/particleToggle.js")
const discoveryCounterSrc = chrome.runtime.getURL("scripts/discoveryCounter.js")
const middleClickDuplicateSrc = chrome.runtime.getURL("scripts/middleClickDuplicate.js")

const main = async () => {
    const speedrunTimer = await import(speedrunTimerSrc)
    const particleToggle = await import(particleToggleSrc)
    const discoveryCounter = await import(discoveryCounterSrc)
    const middleClickDuplicate = await import(middleClickDuplicateSrc)

    const sidebarItems = document.querySelector(".sidebar > .items")

    // LISTEN FOR CRAFT
    var observer = new MutationObserver(() => {
        const mostRecentDiscoveryNode = sidebarItems.lastElementChild.childNodes[1]
        const mostRecentDiscoveryString = mostRecentDiscoveryNode.wholeText.replace(/\s/g,'').toLowerCase()
        speedrunTimer.compareToTargetString(mostRecentDiscoveryString)

        discoveryCounter.refresh()
    })
    observer.observe(sidebarItems, {childList: true})

    middleClickDuplicate.start()
    discoveryCounter.inject()
    particleToggle.injectParticleToggle()
    speedrunTimer.injectMenu()
}

main()
