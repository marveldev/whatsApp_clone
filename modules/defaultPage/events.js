import switchCurrentPage from "../helper.js"

const defaultPageEventListeners = () => {
  const chatLists = document.querySelectorAll('.chat-list')
  for (let index = 0; index < chatLists.length; index++) {
    const chatList = chatLists[index];
    chatList.addEventListener('click', () => {
      switchCurrentPage('chatPage')
    })
  }
}

export default defaultPageEventListeners
