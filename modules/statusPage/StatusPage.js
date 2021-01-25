import { deleteEntry, getEntryFromDb } from "../../dataStorage.js"

const StatusPage = async () => {
  const statusData = await getEntryFromDb('statusData')
  statusData.map(statusItem => {
    const { timeOfStatusUpload } = statusItem
    const timeDifference = (new Date().getTime() - timeOfStatusUpload.getTime())
    const statusDuration = Math.floor(timeDifference/1000/60/60)
    if (statusDuration >= '24') {
      deleteEntry('statusData', statusItem.itemId)
    }
  })

  const statusTextItems = statusData.map(statusTextItem => {
    const { textValue, entryBackgroundColor } = statusTextItem
    if (textValue.length >= 1) {
      return `
        <div class="status-text status-data" style="background-color:${entryBackgroundColor};">
          ${textValue}
        </div>
      `
    }
  })

  const statusPhotoItems = statusData.map(statusPhotoItem => {
    const { photoSource } = statusPhotoItem
    if (photoSource) {
      return `
        <img src="${photoSource}" class="status-photo status-data" alt="photo">
      `
    }
  })

  const photoSource = statusData[0] ? statusData[statusData.length - 1].photoSource : ''
  const textValue = statusData[0] ? statusData[statusData.length - 1].textValue : ''
  const entryBackgroundColor = statusData[0] ? statusData[statusData.length - 1].entryBackgroundColor : ''

  return `
    <div class="status-page">
      <div id="statusMainContent">
        <input type="file" id="addStatus">
        <button class="add-status photo-button" style="display:${statusData.length >= 1 ? 'none' : 'flex'};">
          <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            class="image" alt="photo">
          <div class="status-info">
            <label for="addStatus">
              <strong>My status</strong>
              <p>Tap to add status update</p>
            </label>
          </div>
        </button>
        <div class="view-status photo-button" style="display:${statusData.length >= 1 ? 'flex' : 'none'};">
          <button class="display-status">
            <div class="recent-entry" style="background-color:${entryBackgroundColor};background-image:url(${photoSource});">
              ${textValue}
            </div>
            <div class="status-info">
              <strong>My status</strong>
              <p>Tap to view status update</p>
            </div>
          </button>
          <button id="entryOptionsButton"><i class="material-icons">&#xe5d3;</i></button>
        </div>
        <div>
          <button id="addTextButton"><i class="material-icons">&#xe3c9;</i></button>
          <div>
            <label for="addStatus">
              <div id="addStatusButton"><i class="fa fa-camera"></i></div>
            </label>
          </div>
        </div>
      </div>
      <div id="statusTextContainer">
        <textarea id="statusTextInput" placeholder="Type a status"></textarea>
        <button id="backButton" class="icon"><i class="material-icons">&#xe5c4;</i></button>
        <button id="colorButton" class="icon"><i class="fa fa-paint-brush"></i></button>
        <button id="sendTextButton" class="icon"><i class="material-icons">&#xe163;</i></button>
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
            ${statusTextItems.join('') || ''}
            ${statusPhotoItems.join('') || ''}
          </div>
        </div>
        <button id="previousButton">previous</button>
        <button id="nextButton">next</button>
      </div>
    </div>
  `
}

export default StatusPage
