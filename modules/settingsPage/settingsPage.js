const settingsPage = () => {
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
          <div class="settings-option">
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

export default settingsPage
