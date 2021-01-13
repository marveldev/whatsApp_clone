import { addEntryToDb } from "../../dataStorage.js"

const statusPageEventListener = () => {
  const addStatusPhoto = document.querySelector('#addStatus')
  addStatusPhoto.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(addStatusPhoto.files[0])
    photoReader.addEventListener('load', () => {
      const statusPhoto =  `
        <div class="status-photo-item">
          <div class="progress-bar"><div class="bar"></div></div>
          <div class="status-profile">
            <button type="button" class="close-button"><i class="material-icons">&#xe5c4</i></button>
            <img src="https://images.pexels.com/photos/4119310/pexels-photo-4119310.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
              class="image" alt="photo">
            <div>
              <strong>Jack Williams</strong>
              <small>5 mins ago</small>
            </div>
          </div>
          <div>
            <img src=${photoReader.result} class="status-photo" alt="photo">
          </div>
        </div>
      `
      document.querySelector('#statusPhotoContent').innerHTML += statusPhoto
      // document.querySelector('#statusProfilePhoto').src = photoReader.result
      // document.querySelector('#statusProfilePhoto').classList.add('circle')
      // document.querySelector('#statusInfo').innerText = `Tap to view status update`
      // addEntryToDb('statusPhoto', photoReader.result)
    })
  })

  document.querySelector('#viewStatusButton').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('.status-photo-container').style.display = 'block'

    // const bar = document.querySelector('.bar')
    // let width = 1
    // const progress = () => {
    //   if (width >= 100) {
    //     // clearInterval(interval)
    //   } else {
    //     width++
    //     bar.style.width = width + '%'
    //   }
    // }
    // const interval = setInterval(progress, 10)
  })

  
  document.querySelector('#nextButton').addEventListener('click', () => {
    const slides = document.querySelectorAll('.status-photo-item')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')
  
    if (currentSlide.nextElementSibling) {
      currentSlide.nextElementSibling.classList.add('current')
    } else {
      slides[0].classList.add('current')
    }
  })

  document.querySelector('#previousButton').addEventListener('click', () => {
    const slides = document.querySelectorAll('.status-photo-item')
    const currentSlide = document.querySelector('.current')
    currentSlide.classList.remove('current')

    if (currentSlide.previousElementSibling) {
      currentSlide.previousElementSibling.classList.add('current')
    } else {
      slides[slides.length - 1].classList.add('current')
    }
  })

  // document.querySelector('.close-button').addEventListener('click', () => {
  //   document.querySelector('.top-nav').style.display = 'block'
  //   document.querySelector('.status-photo-container').style.display = 'none'
  // })
}

export default statusPageEventListener
