import switchCurrentPage from "../helper.js"

const settingsPageEventListener = () => {
  document.querySelector('.return-Button').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#topNavDropdown').style.display = 'none'
    document.querySelector('#topNavOverlay').style.display = 'none'
  })
}

export default settingsPageEventListener
