import statusPage from './statusPage/statusPage.js'
import callsPage from './callsPage/callsPage.js'
import defaultPage from './defaultPage/defaultPage.js'

const pageEventListeners = () => {
  const switchCurrentPage = (selector, page) => {
    const button = document.querySelector(selector)
    button.addEventListener('click', () => {
      document.querySelector('.current-page').innerHTML = page
      document.querySelector('.active').classList.remove('active')
      button.classList.add('active')
    })
  }

  switchCurrentPage('.chat', defaultPage())
  switchCurrentPage('.status', statusPage())
  switchCurrentPage('.call', callsPage())
}

export default pageEventListeners
