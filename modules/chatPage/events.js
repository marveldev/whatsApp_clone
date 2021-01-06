import { addEntryToDb, getEntryFromDb } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"

const openChatOptionModal = () => {
  const chatItemDivs = document.querySelectorAll('.content')
  const deleteModal = document.querySelector('.delete-modal-overlay')
  const chatOptionsModal = document.querySelector('.chat-options-modal')
  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('mousedown', () => {
      setTimeout(() => {
        chatOptionsModal.style.zIndex = "1"
        chatItemDiv.classList.add('overlay')
        localStorage.setItem('itemDivId', chatItemDiv.id)
      }, 1000)
    })
  }

  const overlayButton = document.querySelector('.overlay-button')
  overlayButton.addEventListener('click', () => {
    chatOptionsModal.style.zIndex = "0"
    for (let index = 0; index < chatItemDivs.length; index++) {
      const chatItemDiv = chatItemDivs[index];
      chatItemDiv.classList.remove('overlay')
    }
  })

  document.querySelector('.delete-chat-button').addEventListener('click', () => {
    deleteModal.style.display = 'block'
  })

  document.querySelector('.cancel-button').addEventListener('click', () => {
    deleteModal.style.display = 'none'
  })
}

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
    chatInput.style.height = "1px"
    chatInput.style.height = (3+chatInput.scrollHeight)+"px"
  })

  const addChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const itemId = 'id' + Date.parse(new Date()).toString()
    const chatTime = new Date().toTimeString().substr(0, 5)
    const chatItem = `
      <div id="${itemId}" class="content">
        <div class="arrow-right"></div>
        <div class="person-two">
          <div class="text">
            <span class="message-value">${chatInputValue}</span>
            <sub class="chat-time">${chatTime}</sub>
          </div>
          <p class="restore-chat">Tap to restore chat in 5secs</p>
        </div>
      </div>
    `

    chatContainer.innerHTML += chatItem
    chatContainer.scrollTop = chatContainer.scrollHeight
    chatInput.style.height = ''
    chatInput.value = ''

    openChatOptionModal()

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
      <div id="${itemId}" class="content">
        <div class="arrow-right"></div>
        <div class="person-two">
          <div class="text">
            <span class="message-value">${chatInputValue}</span>
            <sub class="chat-time">${chatTime}</sub>
          </div>
          <p class="restore-chat">Tap to restore chat in 5secs</p>
        </div>
      </div>
    `
  })

  chatContainer.innerHTML = chatItems.join('')
  chatContainer.scrollTop = chatContainer.scrollHeight

  openChatOptionModal()
}

export { chatPageEventListeners, displayItemFromDb }
