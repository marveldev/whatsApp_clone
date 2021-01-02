import topNav from './modules/topNav/topNav.js'
import defaultPage from "./modules/defaultPage/defaultPage.js"
import pageEventListeners from "./modules/helper.js"
import defaultPageEventListeners from "./modules/defaultPage/events.js"

const main = () => {
  return `
    ${topNav()}
    <div class="current-page">
      ${defaultPage()}
    </div>
  `
}

document.querySelector('.main').innerHTML = main()
pageEventListeners()
defaultPageEventListeners()
