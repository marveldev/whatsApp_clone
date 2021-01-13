import { getEntryFromDb } from "../../dataStorage.js";

const statusPage = async () => {
  const statusPhoto = await getEntryFromDb('statusPhoto')
  const statusPhotoItems = statusPhoto.map(statusPhotoItem => {
    return `
      <img src=${statusPhotoItem} class="status-photo" alt="photo">
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
        <button id="viewStatusButton" class="chat-list">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            id="statusProfilePhoto" class="image" alt="photo">
          <div>
            <strong>My status</strong>
            <p id="statusInfo">Tap to add status update</p>
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
              ${statusPhotoItems.join('')}
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
