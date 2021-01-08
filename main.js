import topNav from './modules/topNav/topNav.js'
import topNavEventListeners from './modules/topNav/events.js'
import switchCurrentPage from './modules/helper.js'
import { request } from './dataStorage.js'
import { chatPageEventListeners, displayItemFromDb } from './modules/chatPage/events.js'

const main = () => {
  return `
    ${topNav()}
    <div class="current-page">
    </div>
  `
}

request.onsuccess = async () => {
  document.querySelector('.main').innerHTML = main()

  const currentPage = localStorage.getItem('currentPage')
  switchCurrentPage(currentPage || 'defaultPage')

  if (currentPage === 'chatPage') {
    await switchCurrentPage(currentPage)
    displayItemFromDb()
    // chatPageEventListeners()
  }

  topNavEventListeners()
}
