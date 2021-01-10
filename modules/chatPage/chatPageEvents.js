import { addEntryToDb, clearAllEntries } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"
import chatItemEvents from './chatItemEvents.js'

const addChatItemToDom = person => {
  const chatContainer = document.querySelector('.chat-container')
  const personContainerButton = document.querySelector('.person-button-container')
  const recordButton = document.querySelector('.record-button')
  const sendChatButton = document.querySelector('.send-button')
  const chatInput = document.querySelector('.chat-input')

  const chatInputValue = chatInput.value.trim()
  const itemId = 'id' + Date.parse(new Date()).toString()
  const chatTime = new Date().toTimeString().substr(0, 5)
  const chatItem = `
    <div id="${itemId}" class="${person} chat-item">
      <div class="${person === 'person-one' ? 'arrow-right' : 'arrow-left'}"></div>
      <div id="${person}" class="chat-text">
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

  const chatObject = {
    itemId: itemId,
    person: person,
    chatTime: chatTime,
    chatInputValue: chatInputValue
  }

  addEntryToDb('chatData', chatObject)
  chatItemEvents()
}

const chatPageEventListeners = () => {
  const personOneChatButton = document.querySelector('.person-one-button')
  const personTwoChatButton = document.querySelector('.person-two-button')
  const sendChatButton = document.querySelector('.send-button')
  const overlay = document.querySelector('#overlay')
  const chatInput = document.querySelector('.chat-input')

  personOneChatButton.addEventListener('click', () => addChatItemToDom('person-one'))
  personTwoChatButton.addEventListener('click', () => addChatItemToDom('person-two'))

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

  document.querySelector('#arrowLeftButton').addEventListener('click', () => {
    switchCurrentPage('defaultPage')
    document.querySelector('.nav-container').style.display = 'block'
  })

  document.querySelector('.dropdown-button').addEventListener('click', () => {
    document.querySelector('#dropdownModal').style.display = 'block'
    document.querySelector('#overlay').style.display = 'block'
  })

  document.querySelector('#wallpaperButton').addEventListener('click', () => {
    document.querySelector('.wallpaper-container').style.display = 'block'
    document.querySelector('#dropdownModal').style.display = 'none'
  })

  overlay.addEventListener('click', () => {
    // const chatItemDivs = document.querySelectorAll('.chat-item')
    // for (let index = 0; index < chatItemDivs.length; index++) {
    //   const chatItemDiv = chatItemDivs[index]
    //   chatItemDiv.classList.remove('overlay')
    // }
    // document.querySelector('.wallpaper-container').style.display = 'none'
    // document.querySelector('#deleteModal').innerHTML = ''
    document.querySelector('#dropdownModal').style.display = 'none'
    overlay.style.display = 'none'
  })

  // chatBackground.addEventListener('change', () => {
  //   const photoReader = new FileReader()
  //   photoReader.readAsDataURL(chatBackground.files[0])
  //   photoReader.addEventListener('load', () => {
  //     overlay.style.display = 'none'
  //     document.querySelector('.wallpaper-container').style.display = 'none'
  //     document.querySelector('.chat-page').style.backgroundImage = `url(${photoReader.result})`

  //     clearAllEntries('background')
  //     addEntryToDb('background', photoReader.result)
  //   })
  // })

  document.querySelector('#clearChatButton').addEventListener('click', () => {
    document.querySelector('.chat-container').innerHTML = ''
    document.querySelector('#moreOptions').style.display = 'none'
    document.querySelector('#overlay').style.display = 'none'
    clearAllEntries('whatsApp')
  })
}

export default chatPageEventListeners
