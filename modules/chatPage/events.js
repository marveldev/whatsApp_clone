import { addEntryToDb, clearAllEntries } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"
import chatEvent from './chatEvents.js'

const chatPageEventListeners = () => {
  const chatInput = document.querySelector('.chat-input')
  const sendChatButton = document.querySelector('.send-button')
  const overlay = document.querySelector('#overlay')
  const chatBackground = document.querySelector('#addPhoto')

  document.querySelector('#arrowLeftButton').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.nav-container').style.display = 'block'
  })

  document.querySelector('.dropdown-button').addEventListener('click', () => {
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
      sendChatButton.style.display = 'block'
      document.querySelector('.record-button').style.display = 'none'
    } else {
      sendChatButton.style.display = 'none'
      document.querySelector('.record-button').style.display = 'block'
      document.querySelector('.person-button-container').style.display = 'none'
    }
  })

  sendChatButton.addEventListener('click', () => {
    document.querySelector('.person-button-container').style.display = 'block'
  })

  document.querySelector('#clearChatButton').addEventListener('click', () => {
    document.querySelector('.chat-container').innerHTML = ''
    document.querySelector('#moreOptions').style.display = 'none'
    document.querySelector('#overlay').style.display = 'none'
    clearAllEntries('whatsApp')
  })

  addPersonChatsToDom()
}

const addPersonChatsToDom = () => {
  const personOneChatButton = document.querySelector('.person-one-button')
  const personTwoChatButton = document.querySelector('.person-two-button')
  const chatContainer = document.querySelector('.chat-container')
  const chatInput = document.querySelector('.chat-input')
  const personContainerButton = document.querySelector('.person-button-container')
  const recordButton = document.querySelector('.record-button')
  const sendChatButton = document.querySelector('.send-button')

  const addPersonOneChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const itemId = 'id' + Date.parse(new Date()).toString()
    const chatTime = new Date().toTimeString().substr(0, 5)
    const chatItem = `
      <div id="${itemId}" class="person-one content">
        <div class="arrow-right"></div>
        <div id="person-one" class="text">
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
    personContainerButton.style.display = 'none'

    const addItemToIndexDb = {
      itemId: itemId,
      person: 'person-one',
      arrow: 'arrow-right',
      chatTime: chatTime,
      chatInputValue: chatInputValue
    }

    addEntryToDb('whatsApp', addItemToIndexDb)
    chatEvent()
  }
  personOneChatButton.addEventListener('click', addPersonOneChatToDom)

  const addPersonTwoChatToDom = () => {
    const chatInputValue = chatInput.value.trim()
    const itemId = 'id' + Date.parse(new Date()).toString()
    const chatTime = new Date().toTimeString().substr(0, 5)
    const chatItem = `
      <div id="${itemId}" class="person-two content">
        <div class="arrow-left"></div>
        <div id="person-two" class="text">
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
    personContainerButton.style.display = 'none'

    const addItemToIndexDb = {
      itemId: itemId,
      person: 'person-two',
      arrow: 'arrow-left',
      chatTime: chatTime,
      chatInputValue: chatInputValue
    }

    addEntryToDb('whatsApp', addItemToIndexDb)
    chatEvent()
  }
  personTwoChatButton.addEventListener('click', addPersonTwoChatToDom)
}

export { chatPageEventListeners }
