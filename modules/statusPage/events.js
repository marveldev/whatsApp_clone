import { addEntryToDb } from "../../dataStorage.js"

const statusPageEventListener = () => {
  const statusFilePicker = document.querySelector('#addStatus')
  statusFilePicker.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(statusFilePicker.files[0])
    photoReader.addEventListener('load', () => {
      const statusData =  `
        <img src="${photoReader.result}" class="status-photo" alt="photo">
      `
      document.querySelector('#statusItemContent').innerHTML += statusData
      document.querySelector('#statusPreview').src = photoReader.result
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
          document.querySelector('.status-entry-container').style.display = 'none'
          clearInterval(interval)
        }
      } else {
        width++
        bar.style.width = width + '%'
      }
    }, 30)
  }

  document.querySelector('.display-status').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('#statusMainContent').style.display = 'none'
    document.querySelector('.status-entry-container').style.display = 'block'
    document.querySelector('#statusItemContent').firstElementChild.classList.add('current')
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

  document.querySelector('.close-status-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('.current').classList.remove('current')
    document.querySelector('.status-entry-container').style.display = 'none'
    clearInterval(interval)
  })

  const displayElement = (value1, value2) => {
    document.querySelector('.top-nav').style.display = value1
    document.querySelector('#statusMainContent').style.display = value1
    document.querySelector('.status-entry-options').style.display = value2
  }

  document.querySelector('.previous-button').addEventListener('click', () => {
    displayElement('block', 'none')
  })

  document.querySelector('#entryOptionsButton').addEventListener('click', () => {
    displayElement('none', 'block')
  })

  document.querySelector('#itemDropdown').addEventListener('click', () => {
    document.querySelector('#statusItemDropdown').style.display = 'block'
    document.querySelector('#statusOverlay').style.display = 'block'
  })

  document.querySelector('#statusOverlay').addEventListener('click', () => {
    document.querySelector('#statusItemDropdown').style.display = 'none'
    document.querySelector('#statusOverlay').style.display = 'none'
  })

  document.querySelector('.delete-modal-button').addEventListener('click', () => {
    document.querySelector('#statusItemDropdown').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'block'
  })

  document.querySelector('.close-modal-button').addEventListener('click', () => {
    document.querySelector('#statusOverlay').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'none'
  })
}

export default statusPageEventListener
