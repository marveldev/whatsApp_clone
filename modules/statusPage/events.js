import { addEntryToDb } from "../../dataStorage.js"

const statusPageEventListener = () => {
  const statusFilePicker = document.querySelector('#addStatus')
  statusFilePicker.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(statusFilePicker.files[0])
    photoReader.addEventListener('load', () => {
      const statusData =  `
        <img src=${photoReader.result} class="status-photo" alt="photo">
      `
      document.querySelector('#statusPhotoContent').innerHTML += statusData
      document.querySelector('#statusProfilePhoto').src = photoReader.result
      document.querySelector('.view-status').style.display = 'flex'
      document.querySelector('.add-status').style.display = 'none'
      addEntryToDb('statusData', photoReader.result)
    })
  })

  let interval;

  const progress = () => {
    let bar = document.querySelector('.bar')
    let width = 1
    interval = setInterval(() => {
      if (width >= 100) {
        const slides = document.querySelectorAll('.status-photo')
        const currentSlide = document.querySelector('.current')
        currentSlide.classList.remove('current')
        if (currentSlide.nextElementSibling) {
          currentSlide.nextElementSibling.classList.add('current')
          width = 1
        } else {
          slides[0].classList.add('current')
          document.querySelector('.top-nav').style.display = 'block'
          document.querySelector('.status-photo-container').style.display = 'none'
          clearInterval(interval)
        }
      } else {
        width++
        bar.style.width = width + '%'
      }
    }, 30)
  }

  document.querySelector('.view-status').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('.status-photo-container').style.display = 'block'
    document.querySelector('#statusPhotoContent').firstElementChild.classList.add('current')
    progress()
  })

  document.querySelector('#nextButton').addEventListener('click', () => {
    clearInterval(interval)
    const slides = document.querySelectorAll('.status-photo')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')
    document.querySelector('.bar').style.width = 100 + '%'
    if (currentSlide.nextElementSibling) {
      currentSlide.nextElementSibling.classList.add('current')
    } else {
      slides[0].classList.add('current')
    }
  })

  document.querySelector('#previousButton').addEventListener('click', () => {
    clearInterval(interval)
    const slides = document.querySelectorAll('.status-photo')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')
    document.querySelector('.bar').style.width = 100 + '%'
    if (currentSlide.previousElementSibling) {
      currentSlide.previousElementSibling.classList.add('current')
    } else {
      slides[slides.length - 1].classList.add('current')
    }
  })

  const statusPhotos = document.querySelectorAll('.status-photo')
  for (let index = 0; index < statusPhotos.length; index++) {
    const statusData = statusPhotos[index]
    statusData.addEventListener('mousedown', () => {
      alert()
      console.log('ok');
    })
  }

  document.querySelector('.close-status-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('.current').classList.remove('current')
    document.querySelector('.status-photo-container').style.display = 'none'
    clearInterval(interval)
  })
}

export default statusPageEventListener
