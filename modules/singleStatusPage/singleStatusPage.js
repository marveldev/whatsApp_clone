import { getEntryFromDb } from "../../dataStorage.js"

const singleStatusPage = async () => {
  const statusData = await getEntryFromDb('statusData')
  const textEntryPreview = statusData.map(singleTextPreview => {
    const { itemId, textValue, entryBackgroundColor } = singleTextPreview
    if (textValue.length >= 1) {
      return `
        <button class="status-item-preview" id="${itemId}">
          <div class="status-text-content" style="background-color:${entryBackgroundColor};">
            ${textValue}
          </div>
          <div class="status-info">
            <strong>18 views</strong>
            <p>Today 06:03</p>
          </div>
          <span class="item-dropdown-icon">
            <i class="material-icons">&#xe5d4;</i>
          </span>
        </button>
      `
    }
  })

  const photoEntryPreview = statusData.map(singlePhotoPreview => {
    const { itemId, photoSource } = singlePhotoPreview
    if (photoSource) {
      return `
        <button class="status-item-preview" id="${itemId}">
          <img src="${photoSource}" class="image" alt="photo">
          <div class="status-info">
            <strong>18 views</strong>
            <p>Today 06:03</p>
          </div>
          <span class="item-dropdown-icon">
            <i class="material-icons">&#xe5d4;</i>
          </span>
        </button>
      `
    }
  })

  return `
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
        <div class="status-entry-preview">
          ${textEntryPreview.join('') || ''}
          ${photoEntryPreview.join('') || ''}
        </div>
      </div>
    </div>
  `
}

export default singleStatusPage
