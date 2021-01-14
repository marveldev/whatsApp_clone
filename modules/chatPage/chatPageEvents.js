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
    <div id="${itemId}">
      <div class="${person === 'person-one' ? 'arrow-right' : 'arrow-left'}"></div>
      <div class="chat-item-overlay"></div>
      <div class="${person} chat-item" title="${itemId}">
        <div id="${person}" class="chat-text">
          <span class="message-value">${chatInputValue}</span>
          <sub class="chat-time">${chatTime}</sub>
        </div>
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
  const chatItemDivs = document.querySelectorAll('.chat-item')

  const pusher = new Pusher('28732b89eff34d2e9cb2', {
    cluster: 'mt1'
  })

  const channel = pusher.subscribe('chat')

  channel.bind('send-message', data => {
    const { person, message } = data
    const chatTime = new Date().toTimeString().substr(0, 5)

    const chatItem = `
      <div id="">
        <div class="${person === 'person-one' ? 'arrow-right' : 'arrow-left'}"></div>
        <div class="chat-item-overlay"></div>
        <div class="${person} chat-item" title="">
          <div id="${person}" class="chat-text">
            <span class="message-value">${message}</span>
            <sub class="chat-time">${chatTime}</sub>
          </div>
        </div>
      </div>
    `
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.innerHTML += chatItem
  })

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
    document.querySelector('.top-nav').style.display = 'block'
  })

  document.querySelector('.dropdown-button').addEventListener('click', () => {
    document.querySelector('#chatPageDropdown').style.display = 'block'
    overlay.style.display = 'block'
  })

  document.querySelector('#wallpaperButton').addEventListener('click', () => {
    document.querySelector('.wallpaper-container').style.display = 'block'
    document.querySelector('#chatPageDropdown').style.display = 'none'
  })

  overlay.addEventListener('click', () => {
    for (let index = 0; index < chatItemDivs.length; index++) {
      const chatItemDiv = chatItemDivs[index]
      chatItemDiv.previousElementSibling.style.display = 'none'
    }
    document.querySelector('.single-chat-nav').style.display = 'none'
    document.querySelector('#singleChatNav').style.display = 'flex'
    document.querySelector('.wallpaper-container').style.display = 'none'
    document.querySelector('#chatPageDropdown').style.display = 'none'
    overlay.style.display = 'none'
  })

  const addChatPageBackground = document.querySelector('#addBackground')
  addChatPageBackground.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(addChatPageBackground.files[0])
    photoReader.addEventListener('load', () => {
      document.querySelector('.chat-page').style.backgroundImage = `url(${photoReader.result})`
      document.querySelector('.wallpaper-container').style.display = 'none'
      overlay.style.display = 'none'

      clearAllEntries('chatPageBackground')
      addEntryToDb('chatPageBackground', photoReader.result)
    })
  })

  const defaultBackgroundButton = document.querySelector('#defaultBackgroundButton')
  defaultBackgroundButton.addEventListener('click', () => {
    document.querySelector('.chat-page').style.backgroundImage = `url(https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg)`
    document.querySelector('.wallpaper-container').style.display = 'none'
    overlay.style.display = 'none'

    clearAllEntries('chatPageBackground')
    addEntryToDb('chatPageBackground', `https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg`)
  })

  document.querySelector('#clearChatButton').addEventListener('click', () => {
    document.querySelector('#chatPageDropdown').style.display = 'none'
    document.querySelector('#overlay').style.display = 'none'
    document.querySelector('.chat-container').innerHTML = ''
    clearAllEntries('chatData')
  })
}

export default chatPageEventListeners
