import { addEntryToDb } from "../../dataStorage.js"

const statusPageEventListener = () => {
  const bar = document.querySelector('.bar')

  const addStatusPhoto = document.querySelector('#addStatus')
  addStatusPhoto.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(addStatusPhoto.files[0])
    photoReader.addEventListener('load', () => {
      const statusPhoto =  `
        <img src=${photoReader.result} class="status-photo" alt="photo">
      `
      document.querySelector('#statusPhotoContent').innerHTML += statusPhoto
      document.querySelector('#statusProfilePhoto').src = photoReader.result
      document.querySelector('#statusProfilePhoto').classList.add('circle')
      document.querySelector('#statusInfo').innerText = `Tap to view status update`
      addEntryToDb('statusPhoto', photoReader.result)
    })
  })

  const displayStatusPhoto = () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('.status-photo-container').style.display = 'block'
    document.querySelector('#statusPhotoContent').firstElementChild.classList.add('current')
    const slides = document.querySelectorAll('.status-photo')
    let width = 1
    const interval = setInterval(() => {
      if (width >= 100) {
        const currentSlide = document.querySelector('.current')
        currentSlide.classList.remove('current')
        if (currentSlide.nextElementSibling) {
          currentSlide.nextElementSibling.classList.add('current')
          width = 1
        } else {
          document.querySelector('.top-nav').style.display = 'block'
          document.querySelector('.status-photo-container').style.display = 'none'
          clearTimeout(interval)
          slides[0].classList.add('current')
        }
      } else {
        width++
        bar.style.width = width + '%'
      }
    }, 30)

    document.querySelector('#nextButton').addEventListener('click', () => {
      const slides = document.querySelectorAll('.status-photo')
      const currentSlide = document.querySelector('.current')
      currentSlide.classList.remove('current')
      clearInterval(interval)
      bar.style.width = 100 + '%'
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
      clearInterval(interval)
      bar.style.width = 100 + '%'
      if (currentSlide.previousElementSibling) {
        currentSlide.previousElementSibling.classList.add('current')
      } else {
        slides[slides.length - 1].classList.add('current')
      }
    })
  }

  document.querySelector('#viewStatusButton').addEventListener('click', displayStatusPhoto)

  document.querySelector('.close-status-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('.status-photo-container').style.display = 'none'
  })
}

export default statusPageEventListener
