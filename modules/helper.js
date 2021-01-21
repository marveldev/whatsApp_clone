import StatusPage from './statusPage/StatusPage.js'
import CallsPage from './callsPage/CallsPage.js'
import DefaultPage from './defaultPage/DefaultPage.js'
import ChatPage from './chatPage/ChatPage.js'
import defaultPageEventListeners from './defaultPage/events.js'
import chatPageEventListeners from './chatPage/chatPageEvents.js'
import chatItemEvents from './chatPage/chatItemEvents.js'
import SettingsPage, { chatSettingspage } from './settingsPage/SettingsPage.js'
import settingsPageEventListener from './settingsPage/events.js'
import statusPageEventListener from './statusPage/events.js'
import PersonInfoPage from './personInfoPage/PersonInfoPage.js'
import personPageEventListeners from './personInfoPage/events.js'

const switchCurrentPage = async (page) => {
  const currentPage = document.querySelector('.current-page')
  localStorage.setItem('currentPage', page)

  switch (page) {
    case 'defaultPage':
      currentPage.innerHTML = DefaultPage()
      defaultPageEventListeners()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
    case 'statusPage':
      currentPage.innerHTML = await StatusPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.status').classList.add('active')
      statusPageEventListener()
      break;
    case 'callsPage':
      currentPage.innerHTML = CallsPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.call').classList.add('active')
      break;
    case 'settingsPage':
      currentPage.innerHTML = SettingsPage()
      settingsPageEventListener()
      document.querySelector('.top-nav').style.display = 'none'
      break;
    case 'chatSettingsPage':
      currentPage.innerHTML = chatSettingspage()
      document.querySelector('.top-nav').style.display = 'none'
      break;
    case 'personInfoPage':
      currentPage.innerHTML = PersonInfoPage()
      personPageEventListeners()
      document.querySelector('.top-nav').style.display = 'none'
      break;
    case 'chatPage':
      currentPage.innerHTML = await ChatPage()
      document.querySelector('.top-nav').style.display = 'none'
      chatPageEventListeners()
      chatItemEvents()
      break;
    default:
      currentPage.innerHTML = DefaultPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
  }
}

export default switchCurrentPage
