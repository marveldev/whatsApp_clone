import { addEntryToDb, deleteEntry, getEntryFromDb } from '../../dataStorage.js'
import switchCurrentPage from "../helper.js"
import { modal } from './chatPage.js'

const chatOptionEvent = () => {
  const modalEventListeners = () => {
    document.querySelector('.back-button').addEventListener('click', () => {
      for (let index = 0; index < chatItemDivs.length; index++) {
        const chatItemDiv = chatItemDivs[index]
        chatItemDiv.classList.remove('overlay')
        chatItemDiv.parentElement.style.pointerEvents = 'auto'
      }
      document.querySelector('#modal').innerHTML = ''
    })

    document.querySelector('.delete-modal-button').addEventListener('click', () => {
      document.querySelector('.delete-modal-overlay').style.display = 'block'
    })

    document.querySelector('.cancel-button').addEventListener('click', () => {
      document.querySelector('.delete-modal-overlay').style.display = 'none'
    })

    const deleteButton = document.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
      const element = deleteButton.title
      const chatItemDiv = document.querySelector(`#${element}`)
      const chatContainer = document.querySelector('.chat-container')
      chatContainer.removeChild(chatItemDiv)
      document.querySelector('#modal').innerHTML = ''

      deleteEntry(element)
    })
  }

  const chatItemDivs = document.querySelectorAll('.content')
  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('click', () => {
      chatItemDiv.classList.add('overlay')
      document.querySelector('#modal').innerHTML = modal(`${chatItemDiv.id}`)
      modalEventListeners()
      chatItemDiv.parentElement.style.pointerEvents = 'none'
    })
  }
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

  chatInput.addEventListener('keyup', () => {
    chatInput.style.height = "1px"
    chatInput.style.height = (3+chatInput.scrollHeight)+"px"
    if (chatInput.value.trim().length >= 1) {
      document.querySelector('.record-button').style.display = 'none'
      document.querySelector('.send-button').style.display = 'block'
    } else {
      document.querySelector('.record-button').style.display = 'block'
      document.querySelector('.send-button').style.display = 'none'
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

    chatOptionEvent()

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
        <div class="person-one text">
          <span class="message-value">${chatInputValue}</span>
          <sub class="chat-time">${chatTime}</sub>
        </div>
      </div>
    `
  })

  chatContainer.innerHTML = chatItems.join('')
  chatContainer.scrollTop = chatContainer.scrollHeight

  chatOptionEvent()
}

export { chatPageEventListeners, displayItemFromDb }
