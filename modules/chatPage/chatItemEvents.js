import { deleteEntry } from '../../dataStorage.js'

const chatItemEvents = () => {
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
      itemId = []
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
      deleteEntry('chatData', itemId)
      itemId = []
    })
  }

  const chatItemDivs = document.querySelectorAll('.chat-item')
  for (let index = 0; index < chatItemDivs.length; index++) {
    const chatItemDiv = chatItemDivs[index]
    chatItemDiv.addEventListener('click', () => {
      chatItemDiv.previousElementSibling.style.display = 'block'
      singleChatNav.style.display = 'block'
      itemId.push(chatItemDiv.parentElement.id)
      modalEventListeners()
    })
  }

  overlay.addEventListener('click', () => {
    for (let index = 0; index < chatItemDivs.length; index++) {
      const chatItemDiv = chatItemDivs[index]
      chatItemDiv.previousElementSibling.style.display = 'none'
    }
    document.querySelector('.single-chat-nav').style.display = 'none'
    document.querySelector('#singleChatNav').style.display = 'flex'
    document.querySelector('.wallpaper-container').style.display = 'none'
    document.querySelector('#chatPageDropdown').style.display = 'none'
    document.querySelector('.delete-modal').style.display = 'none'
    overlay.style.display = 'none'
    itemId = []
  })

  const chatItemOverlays = document.querySelectorAll('.chat-item-overlay')
  for (let index = 0; index < chatItemOverlays.length; index++) {
    const chatItemOverlay = chatItemOverlays[index]
    chatItemOverlay.addEventListener('click', () => {
      const index = itemId.indexOf(chatItemOverlay.parentElement.id)
      itemId.splice(index, 1)
      chatItemOverlay.style.display = 'none'
      if (itemId.length <= 0) {
        singleChatNav.style.display = 'none'
      }
    })
  }
}

export default chatItemEvents
