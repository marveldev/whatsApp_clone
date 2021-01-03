import statusPage from './statusPage/statusPage.js'
import callsPage from './callsPage/callsPage.js'
import defaultPage from './defaultPage/defaultPage.js'

const switchCurrentPage = (page) => {
  const currentPage = document.querySelector('.current-page')
  localStorage.setItem('currentPage', page)
  
  switch (page) {
    case 'defaultPage':
      currentPage.innerHTML = defaultPage()
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
    default:
      currentPage.innerHTML = defaultPage()
      document.querySelector('.active').classList.remove('active')
      document.querySelector('.default').classList.add('active')
      break;
  }
}

export default switchCurrentPage
