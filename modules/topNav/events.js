import switchCurrentPage from "../helper.js"

const topNavEventListeners = () => {
  const addSwitchPageEvent = (button, page) => {
    button.addEventListener('click', () => {
      switchCurrentPage(page)
      document.querySelector('.active').classList.remove('active')
      button.classList.add('active')
    })
  }

  addSwitchPageEvent(document.querySelector('.default'), 'defaultPage')
  addSwitchPageEvent(document.querySelector('.status'), 'statusPage')
  addSwitchPageEvent(document.querySelector('.call'), 'callsPage')
}

export default topNavEventListeners
