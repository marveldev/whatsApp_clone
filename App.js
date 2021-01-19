import TopNav from './modules/topNav/TopNav.js'
import topNavEventListeners from './modules/topNav/events.js'
import switchCurrentPage from './modules/helper.js'
import { addEntryToDb, request } from './dataStorage.js'
import addStatusFile from './modules/statusPage/events.js'

const App = () => {
  return `
    <div id="defaultPageOverlay"></div>
    ${TopNav()}
    <div class="current-page">
    </div>
  `
}

request.onsuccess = async () => {
  document.querySelector('.root').innerHTML = App()
  const recentEntryDiv =  document.querySelector('.recent-entry')
  const currentPage = localStorage.getItem('currentPage')

  if (currentPage === 'chatPage') {
    await switchCurrentPage(currentPage)
  } else {
    switchCurrentPage(currentPage || 'defaultPage')
  }

  topNavEventListeners()

  const pusher = new Pusher('28732b89eff34d2e9cb2', {
    cluster: 'mt1'
  })

  if (currentPage === 'statusPage') {
    const channel = pusher.subscribe('status')
    channel.bind('update-status', data => {
      const { text, backgroundColor } = data
      addStatusFile(text, null, backgroundColor)
      recentEntryDiv.innerText = text
      recentEntryDiv.style.backgroundColor = backgroundColor
    })
  } else {
    const itemId = 'id' + Date.parse(new Date()).toString()
    const channel = pusher.subscribe('status')
    channel.bind('update-status', data => {
      const { text, backgroundColor } = data
      const statusObject = {
        itemId: itemId,
        textValue: text,
        entryBackgroundColor: backgroundColor
      }
      addEntryToDb('statusData', statusObject)
    })
  }
}
