import chatPage from "../chatPage/chatPage.js";
import chatPageEventListeners from "../chatPage/events.js";
import switchCurrentPage from "../helper.js";

const defaultPageEventListeners = () => {

  const chatItems = document.querySelectorAll('.chat-item')
  for (let index = 0; index < chatItems.length; index++) {
    const chatItem = chatItems[index];
    chatItem.addEventListener('click', () => {
      document.querySelector('.current-page').innerHTML = chatPage()
      document.querySelector('.nav-container').style.display = 'none'
      chatPageEventListeners()
    })
  }
}

export default defaultPageEventListeners
