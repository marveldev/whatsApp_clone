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
  const radioButtons = document.querySelectorAll('.radio')
  const theme = localStorage.getItem('theme')
  let checkBox

  if (theme) {
    const themeName = document.querySelector('#themeName')
    themeName.innerText = theme.charAt(0).toUpperCase() + theme.slice(1)
    document.querySelector(`input[value=${theme}]`).setAttribute('checked', '')
  }

  document.querySelector('.back-button').addEventListener('click', () => {
    switchCurrentPage('settingsPage')
  })

  document.querySelector('.theme-button').addEventListener('click', () => {
    document.querySelector('#defaultPageOverlay').style.display = 'block'
    document.querySelector('.theme-container').style.display = 'block'
  })

  document.querySelector('.close-theme-button').addEventListener('click', () => {
    document.querySelector('#defaultPageOverlay').style.display = 'none'
    document.querySelector('.theme-container').style.display = 'none'
  })

  for (let index = 0; index <  radioButtons.length; index++) {
    const  radioButton =  radioButtons[index]
    radioButton.addEventListener('change', () => {
      checkBox = radioButton.firstElementChild
    })
  }

  document.querySelector('.confirm-theme-button').addEventListener('click', () => {
    const checkBoxValue = checkBox.value
    localStorage.setItem('theme', checkBoxValue)
    document.body.className = checkBoxValue
    const themeName = document.querySelector('#themeName')
    themeName.innerText = checkBoxValue.charAt(0).toUpperCase() + checkBoxValue.slice(1)
    checkBox.setAttribute('checked', '')
    document.querySelector('#defaultPageOverlay').style.display = 'none'
    document.querySelector('.theme-container').style.display = 'none'
  })
}

export default settingsPageEventListener
export { toggleTheme }
