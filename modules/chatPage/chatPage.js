import { getEntryFromDb } from "../../dataStorage.js"

const chatDropdownModal = `
  <div id="dropdownModal">
    <button>View contact</button>
    <button>Media, links, and docs</button>
    <button>Search</button>
    <button>Mute notifications</button>
    <button id="wallpaperButton">Wallpaper</button>
    <button id="clearChatButton">Clear chat</button>
  </div>
`

const wallPaperSettings = `
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
`

const deleteModal = (itemId) => {
  return `
    <div class="delete-modal">
      <p>Delete message?</p>
      <button class="cancel-button">CANCEL</button>
      <button class="delete-button" title="${itemId}">DELETE FOR ME</button>
    </div>
  `
}

const chatPage = async () => {
  const chatData = await getEntryFromDb('chatData')
  const chatItems = chatData.map(chatItem => {
    const { itemId, person, arrow, chatTime,  chatInputValue } = chatItem
    return `
      <div id="${itemId}" class="${person} chat-item">
        <div class="${arrow}"></div>
        <div id="${person}" class="text">
          <span class="message-value">${chatInputValue}</span>
          <sub class="chat-time">${chatTime}</sub>
        </div>
      </div>
    `
  })

  return `
    <div class="chat-page">
      <div id="overlay"></div>
      <div class="chat-top-nav">
        <button type="button" id="arrowLeftButton"><i class="material-icons">&#xe5c4;</i></button>
        <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
          class="image" alt="photo">
        <div>
          <strong>Jack Williams</strong>
          <p>online</p>
        </div>
        <button type="button"><i class="fa fa-video-camera"></i></button>
        <button type="button"><i class="fa fa-phone"></i></button>
        <button type="button" class="dropdown-button"><i class="material-icons">&#xe5d4;</i></button>
      </div>
      <div class="single-chat-nav">
        <div id="singleChatNav">
          <button class="nav-back-button"><i class="material-icons">&#xe5c4</i></button>
          <button><i class="fa fa-star"></i></button>
          <button class="nav-delete-button"><i class="fa fa-trash"></i></button>
          <button><i class="material-icons">&#xe14d</i></button>
          <button><i class="fa fa-mail-forward"></i></button>
        </div>
        <div id="deleteModalContent"></div>
      </div>

      ${chatDropdownModal}
      ${wallPaperSettings}

      <div class="chat-container">${chatItems.join('')}</div>
      <div id="chatInputContent">
        <form>
          <textarea class="chat-input" placeholder="Type a message"></textarea>
          <button class="smiley-icon"><i class="material-icons">&#xe7f2;</i></button>
          <button class="clip-icon"><i class="fa fa-paperclip"></i></button>
        </form>
        <button type="button" class="record-button"><i class="fa fa-microphone"></i></button>
        <button type="button" class="send-button"><i class="material-icons">&#xe163;</i></button>
        <span class="person-button-container">
          <button type="button" class="person-one-button">Person1</button>
          <button type="button" class="person-two-button">Person2</button>
        </span>
      </div>
    </div>
  `
}

export { deleteModal, chatPage }
