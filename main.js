import topNav from './modules/topNav/topNav.js'
import defaultPage from "./modules/defaultPage/defaultPage.js"
import defaultPageEventListeners from "./modules/defaultPage/events.js"
import topNavEventListeners from './modules/topNav/events.js'
import switchCurrentPage from './modules/helper.js'

const main = () => {
  return `
    ${topNav()}
    <div class="current-page">
      ${defaultPage()}
    </div>
  `
}

document.querySelector('.main').innerHTML = main()

const currentPage = localStorage.getItem('currentPage')
switchCurrentPage(currentPage || 'defaultPage')

if (currentPage === 'chatPage') {
  switchCurrentPage(currentPage)
}

defaultPageEventListeners()
topNavEventListeners()
