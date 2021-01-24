import switchCurrentPage from "../helper.js"

const topNavEventListeners = () => {
  const topNavDropdownButton = document.querySelector('.top-nav-dropdown')
  topNavDropdownButton.addEventListener('click', () => {
    document.querySelector('#topNavDropdown').style.display = 'block'
    document.querySelector('#defaultPageOverlay').style.display = 'block'
  })

  document.querySelector('#defaultPageOverlay').addEventListener('click', () => {
    document.querySelector('#topNavDropdown').style.display = 'none'
    document.querySelector('.person-photo-modal').style.display = 'none'
    document.querySelector('#defaultPageOverlay').style.display = 'none'
  })

  const addSwitchPageEvent = (selector, page) => {
    selector.addEventListener('click', () => {
      switchCurrentPage(page)
      document.querySelector('#defaultPageOverlay').style.display = 'none'
    })
  }

  addSwitchPageEvent(document.querySelector('.default'), 'defaultPage')
  addSwitchPageEvent(document.querySelector('.status'), 'statusPage')
  addSwitchPageEvent(document.querySelector('.call'), 'callsPage')
  addSwitchPageEvent(document.querySelector('.settings'), 'settingsPage')
}

export default topNavEventListeners
