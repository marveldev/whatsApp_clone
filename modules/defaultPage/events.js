import chatPage from "../chatPage/chatPage.js";

const defaultPageEventListeners = () => {
  const chatItems = document.querySelectorAll('.chat-item')
  for (let index = 0; index < chatItems.length; index++) {
    const chatItem = chatItems[index];
    chatItem.addEventListener('click', () => {
      console.log('ok');
      document.querySelector('.current-page').innerHTML = chatPage()
      document.querySelector('.nav-container').style.display = 'none'
    })
  }
}

export default defaultPageEventListeners
