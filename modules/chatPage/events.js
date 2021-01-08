import { addEntryToDb, clearAllEntries } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"
import chatEvent from './chatEvents.js'

const chatPageEventListeners = () => {
  const chatInput = document.querySelector('.chat-input')
  const arrowLeftButton = document.querySelector('#arrowLeftButton')
  const sendChatButton = document.querySelector('.send-button')
  const chatContainer = document.querySelector('.chat-container')
  const dropdownButton = document.querySelector('.dropdown-button')
  const recordButton = document.querySelector('.record-button')
  const overlay = document.querySelector('#overlay')

  arrowLeftButton.addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.nav-container').style.display = 'block'
  })

  dropdownButton.addEventListener('click', () => {
    document.querySelector('#moreOptions').style.display = 'block'
    document.querySelector('#overlay').style.display = 'block'
  })

  document.querySelector('#wallpaperButton').addEventListener('click', () => {
    document.querySelector('.wallpaper-container').style.display = 'block'
    document.querySelector('#moreOptions').style.display = 'none'
  })

  overlay.addEventListener('click', () => {
    const chatItemDivs = document.querySelectorAll('.content')
    for (let index = 0; index < chatItemDivs.length; index++) {
      const chatItemDiv = chatItemDivs[index]
      chatItemDiv.classList.remove('overlay')
    }
    document.querySelector('#moreOptions').style.display = 'none'
    document.querySelector('.wallpaper-container').style.display = 'none'
    document.querySelector('#deleteModal').innerHTML = ''
    overlay.style.display = 'none'
  })

  const chatBackground = document.querySelector('#addPhoto')
  chatBackground.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(chatBackground.files[0])
    photoReader.addEventListener('load', () => {
      overlay.style.display = 'none'
      document.querySelector('.wallpaper-container').style.display = 'none'
      document.querySelector('.chat-page').style.backgroundImage = `url(${photoReader.result})`

      clearAllEntries('background')
      addEntryToDb('background', photoReader.result)
    })
  })

  chatInput.addEventListener('keyup', () => {
    chatInput.style.height = "1px"
    chatInput.style.height = (3+chatInput.scrollHeight)+"px"
    if (chatInput.value.trim().length >= 1) {
      recordButton.style.display = 'none'
      sendChatButton.style.display = 'block'
    } else {
      recordButton.style.display = 'block'
      sendChatButton.style.display = 'none'
    }
  })

  const addChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const itemId = 'id' + Date.parse(new Date()).toString()
    const chatTime = new Date().toTimeString().substr(0, 5)
    const chatItem = `
      <div id="${itemId}" class="content">
        <div class="arrow-right"></div>
        <div class="person-one text">
          <span class="message-value">${chatInputValue}</span>
          <sub class="chat-time">${chatTime}</sub>
        </div>
      </div>
    `

    chatContainer.innerHTML += chatItem
    chatContainer.scrollTop = chatContainer.scrollHeight
    chatInput.style.height = ''
    chatInput.value = ''
    recordButton.style.display = 'block'
    sendChatButton.style.display = 'none'

    const addItemToIndexDb = {
      itemId: itemId,
      chatTime: chatTime,
      chatInputValue: chatInputValue
    }

    addEntryToDb('whatsApp', addItemToIndexDb)
    chatEvent()
  }
  sendChatButton.addEventListener('click', addChatToDom)
}

export { chatPageEventListeners }
