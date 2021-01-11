const topNav = () => {
  return `
    <div class="top-nav">
      <div class="top-header">
        <span>WhatsApp</span>
        <div>
          <button class="search-button"><i class="fa fa-search"></i></button>
          <button class="top-nav-dropdown"><i class="material-icons">&#xe5d4;</i></button>
        </div>
      </div>
      <nav class="nav-button">
        <button type="button"><i class="fa fa-camera"></i></button>
        <button type="button" class="default active">CHATS</button>
        <button type="button" class="status">STATUS</button>
        <button type="button" class="call">CALLS</button>
      </nav>
      <div id="topNavDropdown" class="dropdown-modal">
        <button>New group</button>
        <button>New broadcast</button>
        <button>WhatsApp Web</button>
        <button>Starred messages</button>
        <button id="settingsButton">Settings</button>
      </div>
    </div>
  `
}

export default topNav
