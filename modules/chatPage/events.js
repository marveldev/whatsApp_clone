import { addEntryToDb, getEntryFromDb } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"

const chatPageEventListeners = () => {
  const chatInput = document.querySelector('.chat-input')
  const arrowLeftButton = document.querySelector('#arrowLeftButton')
  const sendChatButton = document.querySelector('.send-button')
  const chatContainer = document.querySelector('.chat-container')

  arrowLeftButton.addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.nav-container').style.display = 'block'
  })

  chatInput.addEventListener('keydown', () => {
    chatInput.style.height = "1px";
    chatInput.style.height = (3+chatInput.scrollHeight)+"px";
  })

  const addChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const itemId = 'id' + Date.parse(new Date()).toString();
    const chatTime = new Date().toTimeString().substr(0, 5)
    const chatItem = `
      <div id="${itemId}" class="person-two content">
        <div class="arrow-right"></div>
        <div class="text">
          <span class="message-value">${chatInputValue}</span>
          <small class="chat-time">${chatTime}</small>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
        <div class="chat-options-modal">
          <button><i class="material-icons">&#xe5c4;</i></button>
          <button><i class="fa fa-star"></i></button>
          <button><i class="fa fa-trash"></i></button>
          <button><i class="material-icons">&#xe14d;</i></button>
          <button><i class="fa fa-mail-forward"></i></button>
        </div>
      </div>
    `
    chatContainer.innerHTML += chatItem
    chatInput.style.height = ''
    chatInput.value = ''

    const addItemToIndexDb = {
      itemId: itemId,
      chatTime: chatTime,
      chatInputValue: chatInputValue
    }

    addEntryToDb(addItemToIndexDb)
  }

  sendChatButton.addEventListener('click', addChatToDom)
}

const displayItemFromDb = async () => {
  const chatContainer = document.querySelector('.chat-container')
  const whatsApp = await getEntryFromDb()
  const chatItems = whatsApp.map((chatItem) => {
    const { itemId, chatTime, chatInputValue } = chatItem
    return `
      <div id="${itemId}" class="person-two content">
        <div class="arrow-right"></div>
        <div class="text">
          <span class="message-value">${chatInputValue}</span>
          <small class="chat-time">${chatTime}</small>
        </div>
        <p class="restore-chat">Tap to restore chat in 5secs</p>
        <div class="chat-options-modal">
          <button id="arrowLeftButton"><i class="material-icons">&#xe5c4;</i></button>
          <button><i class="fa fa-star"></i></button>
          <button class="delete-button"><i class="fa fa-trash"></i></button>
          <button class="copy-button"><i class="material-icons">&#xe14d;</i></button>
          <button><i class="fa fa-mail-forward"></i></button>
        </div>
      </div>
    `
  })

  chatContainer.innerHTML = chatItems.join('')
}

export { chatPageEventListeners, displayItemFromDb }
