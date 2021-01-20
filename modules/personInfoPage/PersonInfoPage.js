const PersonInfoPage = () => {
  return `
    <div class="person-info-page">
      <div class="person-bio">
        <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="photo">
        <button class="close-button"><i class="material-icons">&#xe5c4;</i></button>
        <button class="drop-modal-button"><i class="material-icons">&#xe5d4;</i></button>
        <span>Jack Williams</span>
      </div>
      <div class="fade-in-info">
        <button class="close-button"><i class="material-icons">&#xe5c4;</i></button>
        <span>Jack Williams</span>
        <button class="drop-modal-button"><i class="material-icons">&#xe5d4;</i></button>
      </div>
      <div class="page-options-info">
        <div>
          <div class="page-info">
            <span>Mute notifications</span>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
          <p>Custom notifications</p>
          <p>Media visibility</p>
        </div>
        <div>
          <div class="page-info">
            <div>
              <span>Disappearing messages</span>
              <small>Off</small>
            </div>
            <button><i class="material-icons">&#xe192;</i></button>
          </div>
          <div class="page-info">
            <div>
              <span>Encryption</span>
              <small>Messages and calls are end-to-end encrpted.Tap to verify.</small>
            </div>
            <button><i class="material-icons">&#xe63f;</i></button>
          </div>
        </div>
        <div>
          <div class="person-about">
            <span>About and phone number</span>
            <span>Hey there!, I am using Whatsapp.</span>
            <small>September 23, 2020</small>
          </div>
          <div class="person-contact">
            <span>+234 655 466 4566</span>
            <div>
              <button type="button"><i class="material-icons">&#xe0b7;</i></button>
              <button type="button"><i class="fa fa-phone"></i></button>
              <button type="button"><i class="fa fa-video-camera"></i></button>
            </div>
          </div>
        </div>
        <div class="user-person-option">
          <div>
            <button><i class="material-icons">&#xe14b;</i></button>
            <span>Block</span>
          </div>
        </div>
        <div class="user-person-option">
          <div>
            <button><i class="material-icons">&#xe8db;</i></button>
            <span>Report contact</span>
          </div>
        </div>
      </div>
    </div>
  `
}

export default PersonInfoPage
