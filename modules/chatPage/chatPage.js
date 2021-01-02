const chatPage = () => {
  return `
    <div class="chat-page">
      <div class="chat-top-nav">
        <button><i class="material-icons">&#xe5c4;</i></button>
        <img src="https://images.pexels.com/photos/4724071/pexels-photo-4724071.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
          class="image" alt="photo">
        <div class="chats">
          <strong>Jack Williams</strong>
          <p>online</p>
        </div>
        <div class="chat-options">
          <button><i class="fa fa-video-camera"></i></button>
          <button><i class="fa fa-phone"></i></button>
          <button><i class="material-icons">&#xe5d4;</i></button>
        </div>
      </div>
    </div>
  `
}

export default chatPage
