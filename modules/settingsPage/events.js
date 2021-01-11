import switchCurrentPage from "../helper.js"

const settingsPageEventListener = () => {
  document.querySelector('.return-Button').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.top-nav').style.display = 'block'
  })
}

export default settingsPageEventListener
