const injectParticleToggle = (pageElems) => {
  const particleToggleButton = document.createElement("img")
  particleToggleButton.src = chrome.runtime.getURL("images/wand-magic-sparkles-solid.svg")
  particleToggleButton.classList.add("ICPP_particleToggle")

  particleToggleButton.addEventListener("click", () => {
    const classes = pageElems.particles.classList
    if (classes.contains("ICPP_hidden")) {
      classes.remove("ICPP_hidden")
    } else {
      classes.add("ICPP_hidden")
    }
  })

  // INSERT CONTENT
  pageElems.sideControls.insertBefore(particleToggleButton, pageElems.sideControls.firstChild)
}

export { injectParticleToggle }
