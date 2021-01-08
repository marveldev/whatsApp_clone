const statusPage = () => {
  return `
    <div class="status-page">
      <div>
        <button class="edit-icon"><i class="material-icons">&#xe3c9;</i></button>
        <button class="camera icon"><i class="fa fa-camera"></i></button>
      </div>
      <div>
        <button class="chat-item">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            class="image" alt="photo">
          <div class="chats">
            <strong>My status</strong>
            <p>Tap to add status update</p>
          </div>
        </button>
      </div>
    </div>
  `
}

export default statusPage
