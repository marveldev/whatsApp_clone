import switchCurrentPage from "../helper.js"

const topNavEventListeners = () => {
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
