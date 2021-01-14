import { addEntryToDb } from "../../dataStorage.js"

const statusPageEventListener = () => {
  const addStatusPhoto = (selector) => {
    const addStatusPhotoButton = selector
    addStatusPhotoButton.addEventListener('change', () => {
      const photoReader = new FileReader()
      photoReader.readAsDataURL(addStatusPhotoButton.files[0])
      photoReader.addEventListener('load', () => {
        const statusPhoto =  `
          <img src=${photoReader.result} class="status-photo" alt="photo">
        `
        document.querySelector('#statusPhotoContent').innerHTML += statusPhoto
        document.querySelector('#statusProfilePhoto').src = photoReader.result
        document.querySelector('.view-status').style.display = 'flex'
        document.querySelector('.add-status').style.display = 'none'
        addEntryToDb('statusPhoto', photoReader.result)
      })
    })
  }

  addStatusPhoto(document.querySelector('#addStatus'))

  document.querySelector('.view-status').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('.status-photo-container').style.display = 'block'
    document.querySelector('#statusPhotoContent').firstElementChild.classList.add('current')
  })

  document.querySelector('#nextButton').addEventListener('click', () => {
    const slides = document.querySelectorAll('.status-photo')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')
    if (currentSlide.nextElementSibling) {
      currentSlide.nextElementSibling.classList.add('current')
    } else {
      slides[0].classList.add('current')
    }
  })

  document.querySelector('#previousButton').addEventListener('click', () => {
    const slides = document.querySelectorAll('.status-photo')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')
    if (currentSlide.previousElementSibling) {
      currentSlide.previousElementSibling.classList.add('current')
    } else {
      slides[slides.length - 1].classList.add('current')
    }
  })

  document.querySelector('.close-status-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('.status-photo-container').style.display = 'none'
  })
}

export default statusPageEventListener
