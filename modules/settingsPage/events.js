import switchCurrentPage from "../helper.js"

const settingsPageEventListener = () => {
  document.querySelector('.return-button').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#topNavDropdown').style.display = 'none'
    document.querySelector('#defaultPageOverlay').style.display = 'none'
  })
}

export default settingsPageEventListener
