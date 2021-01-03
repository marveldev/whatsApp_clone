import switchCurrentPage from "../helper.js"

const chatPageEventListeners = () => {
  const chatInput = document.querySelector('.chat-input')
  const arrowLeftButton = document.querySelector('#arrowLeftButton')

  arrowLeftButton.addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.nav-container').style.display = 'block'
  })

  chatInput.addEventListener('keydown', () => {
    chatInput.style.height = "1px";
    chatInput.style.height = (3+chatInput.scrollHeight)+"px";
  })

  const sendChatButton = document.querySelector('.send-button')
  const addChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const time = new Date().toTimeString()
    console.log(time);
    const chatItem = `
      <div class="person-two content">
        <div class="arrow-right"></div>
        <div class="text">
          <p class="message-value">${chatInputValue}</p>
          <span class="chat-buttons">
            <small>16:00</small>
            <button class="delete-button"><i class="fa fa-trash"></i></button>
            <button class="copy-button"><i class="material-icons">&#xe14d;</i></button>
          </span>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
        <div class="delete-modal">
          <h2>Delete chat?</h2>
          <button class="cancel button">Cancel</button>
          <button class="delete button">Delete</button>
        </div>
      </div>
    `
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.innerHTML += chatItem
    chatInput.value = '';
    chatInput.style.height = '';
  }

  sendChatButton.addEventListener('click', addChatToDom)
}

export default chatPageEventListeners
