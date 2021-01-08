import { deleteEntry } from '../../dataStorage.js'
import { modal } from './chatPage.js'

const chatEvent = () => {
  const chatItemDivs = document.querySelectorAll('.content')
  const deleteChatModal = document.querySelector('#deleteModal')
  const overlay = document.querySelector('#overlay')
  const modalEventListeners = () => {
    document.querySelector('.back-button').addEventListener('click', () => {
      for (let index = 0; index < chatItemDivs.length; index++) {
        const chatItemDiv = chatItemDivs[index]
        chatItemDiv.classList.remove('overlay')
      }
      deleteChatModal.innerHTML = ''
    })

    document.querySelector('.delete-modal-button').addEventListener('click', () => {
      document.querySelector('.delete-modal').style.display = 'block'
      document.querySelector('.chat-options-modal').style.zIndex = '0'
      overlay.style.display = 'block'
    })

    document.querySelector('.cancel-button').addEventListener('click', () => {
      document.querySelector('.delete-modal').style.display = 'none'
      document.querySelector('.chat-options-modal').style.zIndex = '1'
      overlay.style.display = 'none'
    })

    const deleteButton = document.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
      const element = deleteButton.title
      const chatItemDiv = document.querySelector(`#${element}`)
      const chatContainer = document.querySelector('.chat-container')
      chatContainer.removeChild(chatItemDiv)
      deleteChatModal.innerHTML = ''
      overlay.style.display = 'none'

      deleteEntry(element)
    })
  }

  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('click', () => {
      chatItemDiv.classList.add('overlay')
      deleteChatModal.innerHTML = modal(`${chatItemDiv.id}`)
      modalEventListeners()
      chatItemDiv.parentElement.style.pointerEvents = 'none'
    })
  }
}

export default chatEvent
