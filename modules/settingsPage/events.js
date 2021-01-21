import switchCurrentPage from "../helper.js"

const settingsPageEventListener = () => {
  document.querySelector('.return-button').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#topNavDropdown').style.display = 'none'
    document.querySelector('#defaultPageOverlay').style.display = 'none'
  })

  document.querySelector('#chatSettingsButton').addEventListener('click', () => {
    switchCurrentPage('chatSettingsPage')
  })
}

const toggleTheme = () => {
  document.querySelector('.theme-button').addEventListener('click', () => {
    document.querySelector('#defaultPageOverlay').style.display = 'block'
    document.querySelector('.theme-container').style.display = 'block'
  })

  document.querySelector('.close-theme-button').addEventListener('click', () => {
    document.querySelector('#defaultPageOverlay').style.display = 'none'
    document.querySelector('.theme-container').style.display = 'none'
  })

  document.querySelector('.confirm-theme-button').addEventListener('click', () => {
    localStorage.setItem('theme', 'dark')
    document.querySelector('#defaultPageOverlay').style.display = 'none'
    document.querySelector('.theme-container').style.display = 'none'
  })
}

export default settingsPageEventListener
export { toggleTheme }
