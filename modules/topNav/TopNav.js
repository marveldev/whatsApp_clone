const TopNav = () => {
  return `
    <div class="top-nav">
      <div id="topNav">
        <div class="top-header">
          <span>WhatsApp</span>
          <div>
            <button class="search-button"><i class="fa fa-search"></i></button>
            <button class="top-nav-dropdown"><i class="material-icons">&#xe5d4;</i></button>
          </div>
        </div>
        <nav>
          <button type="button"class="page"><i class="fa fa-camera"></i></button>
          <button type="button" class="default active page">CHATS</button>
          <button type="button" class="status page">STATUS</button>
          <button type="button" class="call page">CALLS</button>
        </nav>
      </div>
      <div id="topNavDropdown" class="dropdown-modal">
        <button>New group</button>
        <button>New broadcast</button>
        <button>WhatsApp Web</button>
        <button>Starred messages</button>
        <button class="settings">Settings</button>
      </div>
    </div>
  `
}

export default TopNav
