const PersonInfoPage = () => {
  return `
    <div class="person-info-page">
      <div>
        <button></button>
        <button></button>
        <img src="" alt="">
      </div>
      <div class="page-options-info">
        <div>
          <div class="notifications">
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
          <div class="notifications">
            <div>
              <span>Disappearing messages</span>
              <small>Off</small>
            </div>
            <button><i class="material-icons">&#xe192;</i></button>
          </div>
          <div class="notifications">
            <div>
              <span>Encryption</span>
              <small>Messages and calls are end-to-end encrpted.Tap to verify.</small>
            </div>
            <button><i class="material-icons">&#xe63f;</i></button>
          </div>
        </div>
        <div>
          <div class="stuff">
            <p>About and phone number</p>
            <p>Hey there!, I am using Whatsapp.</p>
            <small>September 23, 2020</small>
          </div>
          <div>
            <span>+234 655 466 4566</span>
            <button type="button"><i class="material-icons">&#xe0b7;</i></button>
            <button type="button"><i class="fa fa-phone"></i></button>
            <button type="button"><i class="fa fa-video-camera"></i></button>
          </div>
        </div>
        <div>
          <i class="material-icons">&#xe14b;</i>
          <p class="stuff">Block</p>
        </div>
        <div>
          <i class="material-icons">&#xe8db;</i>
          <span class="stuff">Report contact</span>
        </div>
      </div>
    </div>
  `
}

export default PersonInfoPage
