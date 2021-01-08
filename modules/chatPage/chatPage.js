import { getEntryFromDb } from "../../dataStorage.js";

const modal = (itemId) => {
  return `
    <div class="delete-modal">
      <p>Delete message?</p>
      <button class="cancel-button">CANCEL</button>
      <button class="delete-button" title="${itemId}">DELETE FOR ME</button>
    </div>
    <div class="chat-options-modal">
      <button class="back-button"><i class="material-icons">&#xe5c4</i></button>
      <button><i class="fa fa-star"></i></button>
      <button class="delete-modal-button"><i class="fa fa-trash"></i></button>
      <button class="copy-button"><i class="material-icons">&#xe14d</i></button>
      <button><i class="fa fa-mail-forward"></i></button>
    </div>
  `
}

const chatPage = async () => {
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

  return `
    <div id="overlay"></div>
    <div id="deleteModal"></div>
    <div id="dropdownModal">
      <div id="moreOptions">
        <button>View contact</button>
        <button>Media, links, and docs</button>
        <button>Search</button>
        <button>Mute notifications</button>
        <button id="wallpaperButton">Wallpaper</button>
        <button>Clear chat</button>
      </div>
      <div class="wallpaper-container">
        <p>Wallpaper</p>
        <button type="button" id="defaultButton">
          <i class="material-icons">&#xe5d5;</i>
          <span>Default</span>
        </button>
        <button type="button" id="galleryButton">
          <input type="file" id="addPhoto">
          <label for="addPhoto">
            <i class="fa fa-photo"></i>
            <span>Gallery</span>
          </label>
        </button>
      </div>
    </div>
    <div class="chat-page">
      <div class="chat-top-nav">
        <button id="arrowLeftButton"><i class="material-icons">&#xe5c4;</i></button>
        <img src="https://images.pexels.com/photos/4724071/pexels-photo-4724071.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
          class="image" alt="photo">
        <div id="chats">
          <strong>Jack Williams</strong>
          <p>online</p>
        </div>
        <div class="chat-options">
          <button type="button"><i class="fa fa-video-camera"></i></button>
          <button type="button"><i class="fa fa-phone"></i></button>
          <button type="button" class="dropdown-button"><i class="material-icons">&#xe5d4;</i></button>
        </div>
      </div>
      <div class="chat-container">${chatItems.join('')}</div>
      <form id="chatInputContent">
        <div>
          <textarea class="chat-input" placeholder="Type a message"></textarea>
          <button class="face-button"><i class="material-icons">&#xe7f2;</i></button>
          <button class="add-button"><i class="fa fa-paperclip"></i></button>
        </div>
        <button type="button" class="record-button"><i class="fa fa-microphone"></i></button>
        <button type="button" class="send-button"><i class="material-icons">&#xe163;</i></button>
      </form>
    </div>
  `
}

export { modal, chatPage }
