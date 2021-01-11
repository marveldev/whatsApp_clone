import switchCurrentPage from "../helper.js"

const topNavEventListeners = () => {
  const topNavDropdownButton = document.querySelector('.top-nav-dropdown')
  topNavDropdownButton.addEventListener('click', () => {
    document.querySelector('#topNavOverlay').style.display = 'block'
    document.querySelector('#topNavDropdown').style.display = 'block'
  })

  const addSwitchPageEvent = (selector, page) => {
    selector.addEventListener('click', () => {
      switchCurrentPage(page)
    })
  }

  addSwitchPageEvent(document.querySelector('.default'), 'defaultPage')
  addSwitchPageEvent(document.querySelector('.status'), 'statusPage')
  addSwitchPageEvent(document.querySelector('.call'), 'callsPage')
  addSwitchPageEvent(document.querySelector('.settings'), 'settingsPage')

  document.querySelector('#topNavOverlay').addEventListener('click', () => {
    document.querySelector('#topNavDropdown').style.display = 'none'
    document.querySelector('#topNavOverlay').style.display = 'none'
  })
}

export default topNavEventListeners
