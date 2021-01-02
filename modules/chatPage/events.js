const chatPageEventListeners = () => {
  const sendChatButton = document.querySelector('.send-button')
  const addChatToDom = () => {
    const chatInput = document.querySelector('.chat-input')
    const chatInputValue = chatInput.value.trim()
    const chatItem = `
      <div>${chatInputValue}</div>
    `
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.innerHTML += chatItem
    console.log(chatItem);
  }

  sendChatButton.addEventListener('click', addChatToDom)

}

export default chatPageEventListeners
