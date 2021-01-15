import { deleteEntry } from '../../dataStorage.js'

const chatItemEvents = () => {
  const chatItemDivs = document.querySelectorAll('.chat-item')
  const singleChatNav = document.querySelector('.single-chat-nav')
  const overlay = document.querySelector('#chatOverlay')

  let itemId = []

  const modalEventListeners = () => {
    document.querySelector('.nav-back-button').addEventListener('click', () => {
      for (let index = 0; index < chatItemDivs.length; index++) {
        const chatItemDiv = chatItemDivs[index]
        chatItemDiv.previousElementSibling.style.display = 'none'
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
      for (let index = 0; index < itemId.length; index++) {
        const singleItemId = itemId[index]
        const chatItemDiv = document.querySelector(`#${singleItemId}`)
        chatContainer.removeChild(chatItemDiv)
      }
      singleChatNav.style.display = 'none'
      document.querySelector('.delete-modal').style.display = 'none'
      document.querySelector('#singleChatNav').style.display = 'flex'
      overlay.style.display = 'none'

      deleteEntry(itemId)
      itemId = []
    })
  }

  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('click', () => {
      chatItemDiv.previousElementSibling.style.display = 'block'
      singleChatNav.style.display = 'block'
      itemId.push(chatItemDiv.parentElement.id)
      modalEventListeners()
    })
  }
}

export default chatItemEvents
