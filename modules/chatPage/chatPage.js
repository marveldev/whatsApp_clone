const chatPage = () => {
  return `
    <div class="delete-modal-overlay">
      <div class="delete-modal">
        <p>Delete message?</p>
        <button class="cancel-button">CANCEL</button>
        <button class="delete-button">DELETE FOR ME</button>
      </div>
    </div>
    <div class="chat-page">
      <div class="chat-top-nav">
        <button id="arrowLeftButton"><i class="material-icons">&#xe5c4;</i></button>
        <img src="https://images.pexels.com/photos/4724071/pexels-photo-4724071.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
          class="image" alt="photo">
        <div class="chats">
          <strong>Jack Williams</strong>
          <p>online</p>
        </div>
        <div class="chat-options">
          <button><i class="fa fa-video-camera"></i></button>
          <button><i class="fa fa-phone"></i></button>
          <button class="more-button"><i class="material-icons">&#xe5d4;</i></button>
        </div>
      </div>
      <div class="chat-options-modal">
        <button class="back-button"><i class="material-icons">&#xe5c4</i></button>
        <button><i class="fa fa-star"></i></button>
        <button class="delete-modal-button"><i class="fa fa-trash"></i></button>
        <button><i class="material-icons">&#xe14d</i></button>
        <button><i class="fa fa-mail-forward"></i></button>
      </div>
      <div class="chat-container"></div>
      <form id="chatInputContent">
        <div>
          <textarea class="chat-input" placeholder="Type a message"></textarea>
          <button class="face-button"><i class="material-icons">&#xe7f2;</i></button>
          <button class="add-button"><i class="fa fa-paperclip"></i></button>
        </div>
        <button type="button" class="send-button"><i class="material-icons">&#xe163;</i></button>
      </form>
    </div>
  `
}

export { chatPage }
