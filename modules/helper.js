import statusPage from './statusPage/statusPage.js'
import callsPage from './callsPage/callsPage.js'
import defaultPage from './defaultPage/defaultPage.js'

const switchCurrentPage = (page) => {
  const currentPage = document.querySelector('.current-page')
  localStorage.setItem('currentPage', page)
  // document.querySelector('.active').classList.remove('active')
  // button.classList.add('active')
  
  switch (page) {
    case 'defaultPage':
      currentPage.innerHTML = defaultPage()
      break;
    case 'statusPage':
      currentPage.innerHTML = statusPage()
      break;
    case 'callsPage':
      currentPage.innerHTML = callsPage()
      break;
    default:
      currentPage.innerHTML = defaultPage()
      break;
  }

  // const switchCurrentPage = (selector, page) => {
  //   const button = document.querySelector(selector)
  //   button.addEventListener('click', () => {
  //     document.querySelector('.current-page').innerHTML = page
  //     document.querySelector('.active').classList.remove('active')
  //     button.classList.add('active')
  //   })
  // }

  // switchCurrentPage('.chat', defaultPage())
  // switchCurrentPage('.status', statusPage())
  // switchCurrentPage('.call', callsPage())
}

export default switchCurrentPage
