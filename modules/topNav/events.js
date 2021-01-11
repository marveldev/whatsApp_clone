import switchCurrentPage from "../helper.js"

const topNavEventListeners = () => {
  const topNavDropdownButton = document.querySelector('.top-nav-dropdown')
  topNavDropdownButton.addEventListener('click', () => {
    document.querySelector('#topNavOverlay').style.display = 'block'
    document.querySelector('#topNavDropdown').style.display = 'block'
  })

  const addSwitchPageEvent = (button, page) => {
    button.addEventListener('click', () => {
      switchCurrentPage(page)
    })
  }

  addSwitchPageEvent(document.querySelector('.default'), 'defaultPage')
  addSwitchPageEvent(document.querySelector('.status'), 'statusPage')
  addSwitchPageEvent(document.querySelector('.call'), 'callsPage')
}

export default topNavEventListeners
