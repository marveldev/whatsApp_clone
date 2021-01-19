import TopNav from './modules/topNav/TopNav.js'
import topNavEventListeners from './modules/topNav/events.js'
import switchCurrentPage from './modules/helper.js'
import { request } from './dataStorage.js'

const App = () => {
  return `
    ${TopNav()}
    <div class="current-page">
    </div>
  `
}

request.onsuccess = async () => {
  document.querySelector('.root').innerHTML = App()
  const currentPage = localStorage.getItem('currentPage')

  if (currentPage === 'chatPage') {
    await switchCurrentPage(currentPage)
  } else {
    switchCurrentPage(currentPage || 'defaultPage')
  }

  topNavEventListeners()
}
