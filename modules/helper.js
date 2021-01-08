import statusPage from './statusPage/statusPage.js'
import callsPage from './callsPage/callsPage.js'
import defaultPage from './defaultPage/defaultPage.js'
import { chatPage } from './chatPage/chatPage.js'
import defaultPageEventListeners from './defaultPage/events.js'
import { chatPageEventListeners } from './chatPage/events.js'
import { getEntryFromDb } from '../dataStorage.js'

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
      currentPage.innerHTML = statusPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.status').classList.add('active')
      break;
    case 'callsPage':
      currentPage.innerHTML = callsPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.call').classList.add('active')
      break;
    case 'chatPage':
      document.querySelector('.nav-container').style.display = 'none'
      currentPage.innerHTML = await chatPage()
      // const pageBackground = await getEntryFromDb('background')
      // document.querySelector('.chat-page').style.backgroundImage = `url(${pageBackground[0] ? pageBackground[0] : 'https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg'})`
      chatPageEventListeners()
      break;
    default:
      currentPage.innerHTML = defaultPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
  }
}

export default switchCurrentPage
