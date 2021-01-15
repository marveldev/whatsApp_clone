import { getEntryFromDb } from "../../dataStorage.js";

const statusPage = async () => {
  const statusData = await getEntryFromDb('statusData')
  const statusItems = statusData.map(statusItem => {
    return `
      <img src=${statusItem} class="status-photo" alt="photo">
    `
  })

  return `
    <div class="status-page">
      <div>
        <button class="edit-icon"><i class="material-icons">&#xe3c9;</i></button>
        <div>
          <input type="file" id="addStatus">
          <label for="addStatus">
            <div id="addStatusButton"><i class="fa fa-camera"></i></div>
          </label>
        </div>
      </div>
      <div>
        <button class="add-status photo-button" style="display: ${statusItems.length >= 1 ? 'none' : 'flex'};">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            class="image" alt="photo">
          <div>
            <label for="addStatus">
              <strong>My status</strong>
              <p>Tap to add status update</p>
            </label>
          </div>
        </button>
        <button class="view-status photo-button" style="display: ${statusItems.length >= 1 ? 'flex' : 'none'};">
          <img src="${statusData[statusData.length - 1]}"
            id="statusPreview" class="image" alt="photo">
          <div>
            <strong>My status</strong>
            <p>Tap to view status update</p>
          </div>
        </button>
        <div class="status-photo-container">
          <div class="status-photo-item">
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
            <div id="statusPhotoContent">
              ${statusItems.join('') || ''}
            </div>
          </div>
          <button id="previousButton">previous</button>
          <button id="nextButton">next</button>
        </div>
      </div>
    </div>
  `
}

export default statusPage
