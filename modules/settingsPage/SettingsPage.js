const SettingsPage = () => {
  return `
    <div class="settings-page">
      <div class="settings-nav">
        <button type="button" class="return-button"><i class="material-icons">&#xe5c4;</i></button>
        <strong>Settings</strong>
      </div>
      <div class="settings-options">
        <div class="user-profile">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            class="image" alt="photo">
          <div>
            <span>Jack Williams</span>
            <p>Hey!, I am Jack.</p>
          </div>
        </div>
        <div>
          <div class="settings-option">
            <button><i class="fa fa-key"></i></button>
            <div>
              <span>Account</span>
              <p>Privacy,security, change number</p>
            </div>
          </div>
          <div id="chatSettingsButton" class="settings-option">
            <button><i class="material-icons">&#xe0b7;</i></button>
            <div>
              <span>Chats</span>
              <p>Theme,wallpaper,chat history</p>
            </div>
          </div>
          <div class="settings-option">
            <button><i class="fa fa-bell"></i></button>
            <div>
              <span>Notification</span>
              <p>Message,group & call tones</p>
            </div>
          </div>
          <div class="settings-option">
            <button><i class="material-icons">&#xe1af;</i></button>
            <div>
              <span>Storage and data</span>
              <p>Network usuage, auto-download</p>
            </div>
          </div>
          <div class="settings-option">
            <button><i class="material-icons">&#xe8fd;</i></button>
            <div>
              <span>Help</span>
              <p>FAQ, contact us, privacy policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

const chatSettingspage = () => {
  return `
    <div class="chat-settings-page">
      <div class="settings-nav">
        <button type="button" class="back-button"><i class="material-icons">&#xe5c4;</i></button>
        <strong>Chats</strong>
      </div>
      <div class="chat-settings-options">
        <p>Display</p>
        <div class="chat-setting">
          <button class="theme-button">
            <span><i class="material-icons">&#xe3ab;</i></span>
            <div>
              <span>Theme</span>
              <small id="themeName">Light</small>
            </div>
          </button>
          <button>
            <span><i class="material-icons">&#xe1bc;</i></span>
            <div>
              <span>Wallpaper</span>
            </div>
          </button>
        </div>
        <p>Chat settings</p>
        <div class="option-buttons">
          <button>
            <div>
              <span>Enter is send</span>
              <small>Enter key will send your message</small>
            </div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </button>
          <button>
            <div>
              <span>Media visibility</span>
              <small>Show newly downloaded media in your phone's gallery</small>
            </div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </button>
          <button>
            <div>
              <span>Font size</span>
              <small>Medium</small>
            </div>
          </button>
        </div>
      </div>
      <div class="theme-container">
        <h3>Choose theme</h3>
        <div class="theme-option">
          <label class="radio input-options">
            <input type="radio" name="radio" value="system-default">
            <span class="checkmark"></span>
          </label>
          <p>System default</p>
        </div>
        <div class="theme-option">
          <label class="radio input-options">
            <input type="radio" name="radio" value="light">
            <span class="checkmark"></span>
          </label>
          <p>Light</p>
        </div>
        <div class="theme-option">
          <label class="radio input-options">
            <input type="radio" name="radio" value="dark">
            <span class="checkmark"></span>
          </label>
          <p>Dark</p>
        </div>
        <button class="close-theme-button">CANCEL</button>
        <button class="confirm-theme-button">OK</button>
      </div>
    </div>
  `
}

export default SettingsPage
export { chatSettingspage }
