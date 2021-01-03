const topNav = () => {
  return `
    <div class="nav-container">
      <div class="top-header">
        <span>WhatsApp</span>
        <div>
          <button class="search-button"><i class="fa fa-search"></i></button>
          <button class="more-button"><i class="material-icons">&#xe5d4;</i></button>
        </div>
      </div>
      <nav class="chat-nav">
        <button class="button"><i class="fa fa-camera"></i></button>
        <button class="default button active">CHATS</button>
        <button class="status button">STATUS</button>
        <button class="call button">CALLS</button>
      </nav>
    </div>
  `
}

export default topNav
