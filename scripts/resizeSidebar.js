const checkBoundsIntersecting = (sidebarBounds, elemBounds) => {
  return !(elemBounds.right < sidebarBounds.left ||
    elemBounds.left > sidebarBounds.right ||
    elemBounds.bottom < sidebarBounds.top ||
    elemBounds.top > sidebarBounds.bottom)
}

const dispatchRightClick = (target) => {
  const rightClickEvent = new MouseEvent("mousedown", {
    bubbles: false,
    cancelable: true,
    view: window,
    button: 2
  })

  target.dispatchEvent(rightClickEvent)
}

const reimplementSidebarElementAbsorb = (pageElems) => {
  window.addEventListener("mouseup", (event) => {
    let elemTarget = null
    if (event.target.matches("div.item.instance")) {
      elemTarget = event.target
    } else if (event.target.matches("div.instance-emoji")) {
      elemTarget = event.target.parent
    } else {
      return
    }

    const elemBounds = elemTarget.getBoundingClientRect()

    const sidebarBounds = pageElems.sidebar.getBoundingClientRect()
    if (checkBoundsIntersecting(sidebarBounds, elemBounds)) {
      dispatchRightClick(elemTarget)
    }
  }, true)
}

const inject = (pageElems) => {
  reimplementSidebarElementAbsorb(pageElems)

  let isResizing = false
  let initialMouseX = 0
  let initialSidebarWidth = 0
  const minSidebarWidth = pageElems.sidebar.offsetWidth

  // Detect click on left edge of sidebar
  pageElems.sidebar.addEventListener("mousedown", (event) => {
    if (event.offsetX < 5) {
      isResizing = true
      initialMouseX = event.clientX
      initialSidebarWidth = pageElems.sidebar.offsetWidth
    }
  })

  document.addEventListener("mousemove", (event) => {
    if (isResizing) {
      let newWidth = initialSidebarWidth - (event.clientX - initialMouseX)
      newWidth = Math.max(newWidth, minSidebarWidth) // block sidebar going below min width
      pageElems.sidebar.style.width = newWidth + "px"

      // MOVE LOGO AND SIDE CONTROLS
      pageElems.sideControls.style.right = (newWidth + 10) + "px"
      pageElems.logo.style.right = (newWidth + 10) + "px"

      // MOVE INSTANCES ON CANVAS
      Array.from(pageElems.instances.firstChild.children).forEach(instance => {
        const instanceBounds = instance.getBoundingClientRect()
        const sidebarBounds = pageElems.sidebar.getBoundingClientRect()
        if (checkBoundsIntersecting(sidebarBounds, instanceBounds)) {
          dispatchRightClick(instance)
        }
      })
    }
  })

  document.addEventListener("mouseup", (event) => {
    isResizing = false
  })
}

export { inject }
