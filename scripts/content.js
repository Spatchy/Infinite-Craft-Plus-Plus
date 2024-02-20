const speedrunTimerSrc = chrome.runtime.getURL("scripts/speedrunTimer.js")
const particleToggleSrc = chrome.runtime.getURL("scripts/particleToggle.js")
const discoveryCounterSrc = chrome.runtime.getURL("scripts/discoveryCounter.js")
const middleClickDuplicateSrc = chrome.runtime.getURL("scripts/middleClickDuplicate.js")
const pageElemsSrc = chrome.runtime.getURL("scripts/mainPageElementSelectors.js")

const main = async () => {
    const speedrunTimer = await import(speedrunTimerSrc)
    const particleToggle = await import(particleToggleSrc)
    const discoveryCounter = await import(discoveryCounterSrc)
    const middleClickDuplicate = await import(middleClickDuplicateSrc)
    const pageElems = (await import(pageElemsSrc)).pageItems
    

    // LISTEN FOR CRAFT
    let observer = new MutationObserver(() => {
        const mostRecentDiscoveryNode = pageElems.sidebarItems.lastElementChild.childNodes[1]
        const mostRecentDiscoveryString = mostRecentDiscoveryNode.wholeText.replace(/\s/g,'').toLowerCase()
        speedrunTimer.compareToTargetString(mostRecentDiscoveryString)

        discoveryCounter.refresh(pageElems)
    })
    observer.observe(pageElems.sidebarItems, {childList: true})

    middleClickDuplicate.start(pageElems)
    discoveryCounter.inject(pageElems)
    particleToggle.injectParticleToggle(pageElems)
    speedrunTimer.injectMenu(pageElems)
}

main()
