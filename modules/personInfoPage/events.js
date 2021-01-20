import switchCurrentPage from "../helper.js"

const personPageEventListeners = () => {
  const checkpoint = 300
  let opacity

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset
    if (currentScroll <= checkpoint) {
      opacity = 1 - currentScroll / checkpoint
      document.querySelector('.fade-in-info').style.display = 'none'
    } else {
      opacity = 0
      document.querySelector('.fade-in-info').style.display = 'grid'

    }
    document.querySelector('.person-bio').style.opacity = opacity
  })

  const closeButtons = document.querySelectorAll('.close-button')
  for (let index = 0; index < closeButtons.length; index++) {
    const closeButton = closeButtons[index]
    closeButton.addEventListener('click', () => {
      switchCurrentPage('defaultPage')
      document.querySelector('.top-nav').style.display = 'block'
    })
  }
}

export default personPageEventListeners
