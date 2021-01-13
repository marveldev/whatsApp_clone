import statusPage from './statusPage/statusPage.js'
import callsPage from './callsPage/callsPage.js'
import defaultPage from './defaultPage/defaultPage.js'
import { chatPage } from './chatPage/chatPage.js'
import defaultPageEventListeners from './defaultPage/events.js'
import chatPageEventListeners from './chatPage/chatPageEvents.js'
import chatItemEvents from './chatPage/chatItemEvents.js'
import settingsPage from './settingsPage/settingsPage.js'
import settingsPageEventListener from './settingsPage/events.js'
import statusPageEventListener from './statusPage/events.js'

const switchCurrentPage = async (page) => {
  const currentPage = document.querySelector('.current-page')
  localStorage.setItem('currentPage', page)

  switch (page) {
    case 'defaultPage':
      currentPage.innerHTML = defaultPage()
      defaultPageEventListeners()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
    case 'statusPage':
      currentPage.innerHTML = await statusPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.status').classList.add('active')
      statusPageEventListener()
      break;
    case 'callsPage':
      currentPage.innerHTML = callsPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.call').classList.add('active')
      break;
    case 'settingsPage':
      currentPage.innerHTML = settingsPage()
      settingsPageEventListener()
      document.querySelector('.top-nav').style.display = 'none'
      break;
    case 'chatPage':
      currentPage.innerHTML = await chatPage()
      document.querySelector('.top-nav').style.display = 'none'
      chatPageEventListeners()
      chatItemEvents()
      break;
    default:
      currentPage.innerHTML = defaultPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
  }
}

export default switchCurrentPage
