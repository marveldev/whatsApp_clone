import { deleteEntry } from '../../dataStorage.js'
import { deleteModal } from './chatPage.js'

const chatItemEvents = () => {
  const chatItemDivs = document.querySelectorAll('.chat-item')
  const singleChatNav = document.querySelector('.single-chat-nav')
  const overlay = document.querySelector('#overlay')

  const modalEventListeners = () => {
    document.querySelector('.nav-back-button').addEventListener('click', () => {
      for (let index = 0; index < chatItemDivs.length; index++) {
        const chatItemDiv = chatItemDivs[index]
        chatItemDiv.classList.remove('overlay')
      }
      singleChatNav.style.display = 'none'
    })

    document.querySelector('.nav-delete-button').addEventListener('click', () => {
      document.querySelector('.delete-modal').style.display = 'block'
      document.querySelector('#singleChatNav').style.display = 'none'
      overlay.style.display = 'block'
    })

    document.querySelector('.cancel-button').addEventListener('click', () => {
      document.querySelector('.delete-modal').style.display = 'none'
      document.querySelector('#singleChatNav').style.display = 'flex'
      overlay.style.display = 'none'
    })

    const deleteButton = document.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
      const chatContainer = document.querySelector('.chat-container')
      const element = deleteButton.title
      const chatItemDiv = document.querySelector(`#${element}`)
      chatContainer.removeChild(chatItemDiv)
      singleChatNav.style.display = 'none'
      document.querySelector('.delete-modal').style.display = 'none'
      document.querySelector('#singleChatNav').style.display = 'flex'
      overlay.style.display = 'none'

      deleteEntry(element)
    })
  }

  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('click', () => {
      chatItemDiv.classList.add('overlay')
      singleChatNav.style.display = 'block'
      document.querySelector('#deleteModalContent').innerHTML = deleteModal(`${chatItemDiv.id}`)
      modalEventListeners()
    })
  }
}

export default chatItemEvents
