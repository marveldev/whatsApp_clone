import switchCurrentPage from "../helper.js"

const defaultPageEventListeners = () => {
  const personProfiles = document.querySelectorAll('.person-profile')
  for (let index = 0; index < personProfiles.length; index++) {
    const personProfile = personProfiles[index];
    personProfile.addEventListener('click', () => {
      switchCurrentPage('chatPage')
    })
  }

  const personProfilePhotos = document.querySelectorAll('.person-photo')
  for (let index = 0; index < personProfilePhotos.length; index++) {
    const personProfilePhoto = personProfilePhotos[index];
    personProfilePhoto.addEventListener('click', () => {
      document.querySelector('#defaultPageOverlay').style.display = 'block'
    })
  }
}

export default defaultPageEventListeners
