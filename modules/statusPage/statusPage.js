import { getEntryFromDb } from "../../dataStorage.js";

const StatusPage = async () => {
  const statusData = await getEntryFromDb('statusData')
  const statusItems = statusData.map(statusItem => {
    return `
      <img src=${statusItem} class="status-photo" alt="photo">
    `
  })

  return `
    <div class="status-page">
      <div id="statusMainContent">
        <input type="file" id="addStatus">
        <button class="add-status photo-button" style="display: ${statusItems.length >= 1 ? 'none' : 'flex'};">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            class="image" alt="photo">
          <div class="status-info">
            <label for="addStatus">
              <strong>My status</strong>
              <p>Tap to add status update</p>
            </label>
          </div>
        </button>
        <div class="view-status photo-button" style="display: ${statusItems.length >= 1 ? 'flex' : 'none'};">
          <button class="display-status">
            <img src="${statusData[statusData.length - 1]}" id="statusPreview" class="image" alt="photo">
            <div class="status-info">
              <strong>My status</strong>
              <p>Tap to view status update</p>
            </div>
          </button>
          <button id="entryOptionsButton"><i class="material-icons">&#xe5d3;</i></button>
        </div>
        <div>
          <button class="edit-icon"><i class="material-icons">&#xe3c9;</i></button>
          <div>
            <label for="addStatus">
              <div id="addStatusButton"><i class="fa fa-camera"></i></div>
            </label>
          </div>
        </div>
      </div>
      <div class="status-entry-container">
        <div>
          <div class="progress-bar"><div class="bar"></div></div>
          <div class="status-profile">
            <button type="button" class="close-status-button"><i class="material-icons">&#xe5c4;</i></button>
            <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
              class="image" alt="photo">
            <div>
              <strong>Jack Williams</strong>
              <small>5 mins ago</small>
            </div>
          </div>
          <div id="statusItemContent">
            ${statusItems.join('') || ''}
          </div>
        </div>
        <button id="previousButton">previous</button>
        <button id="nextButton">next</button>
      </div>
      <div class="status-entry-options">
        <div id="statusOverlay" class="overlay"></div>
        <div class="status-options-nav">
          <button type="button" class="previous-button"><i class="material-icons">&#xe5c4;</i></button>
          <strong>My status</strong>
        </div>
        <div>
          <div id="statusItemDropdown" class="dropdown-modal">
            <button>Forward</button>
            <button>Share...</button>
            <button>Share to Facebook</button>
            <button class="delete-modal-button">Delete</button>
          </div>
          <div class="status-delete-modal">
            <p>Delete this status update? It will also be deleted for everyone who received it.</p>
            <button class="delete-item-button">DELETE</button>
            <button class="close-modal-button">CANCEL</button>
          </div>
          <button class="status-item-preview">
            <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              class="image" alt="photo">
            <div class="status-info">
              <strong>18 views</strong>
              <p>Today 06:03</p>
            </div>
            <span id="itemDropdown"><i class="material-icons">&#xe5d4;</i></span>
          </button>
        </div>
      </div>
    </div>
  `
}

export default StatusPage
