import chatPage from "../chatPage/chatPage.js";
import switchCurrentPage from "../helper.js";

const defaultPageEventListeners = () => {
  const chatItems = document.querySelectorAll('.chat-item')
  for (let index = 0; index < chatItems.length; index++) {
    const chatItem = chatItems[index];
    chatItem.addEventListener('click', () => {
      switchCurrentPage('chatPage')
    })
  }
}

export default defaultPageEventListeners
