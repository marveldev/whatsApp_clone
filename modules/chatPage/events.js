const chatPageEventListeners = () => {
  const sendChatButton = document.querySelector('.send-button')
  const addChatToDom = () => {
    const chatInput = document.querySelector('.chat-input')
    const chatInputValue = chatInput.value.trim()
    const chatItem = `
      <div class="person-two content">
        <div class="arrow-right"></div>
        <div class="text">
          <span class="message-value">${chatInputValue}</span>
          <sub>7:00 &#x2713;&#x2713;</sub>
        </div>
      </div>
    `
    const chatContainer = document.querySelector('.chat-container')
    chatContainer.innerHTML += chatItem
    console.log(chatItem);
  }

  sendChatButton.addEventListener('click', addChatToDom)
}

export default chatPageEventListeners
