import { addEntryToDb } from "../../dataStorage.js"
import switchCurrentPage from "../helper.js"

const addStatusFile = (textValue, photoSource, entryBackgroundColor) => {
  const itemId = 'id' + Date.parse(new Date()).toString()
  let statusData
  let singleStatusEntry

  if (textValue) {
    statusData =  `
      <div class="status-text status-data ${itemId}" style="background-color: ${entryBackgroundColor};">
        ${textValue}
      </div>
    `

    singleStatusEntry = `
      <button class="status-item-preview" id="${itemId}">
        <div class="status-text-content" style="background-color: ${entryBackgroundColor};">
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
  } else {
    statusData =  `
      <img src="${photoSource}" class="status-photo status-data ${itemId}" alt="photo">
    `

    singleStatusEntry = `
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

  document.querySelector('#statusItemContent').innerHTML += statusData
  document.querySelector('.status-entry-preview').innerHTML += singleStatusEntry
  document.querySelector('.view-status').style.display = 'flex'
  document.querySelector('.add-status').style.display = 'none'

  const statusObject = {
    itemId: itemId,
    textValue: textValue || '',
    photoSource: photoSource || '',
    entryBackgroundColor: entryBackgroundColor,
    timeOfStatusUpload: new Date()
  }
  addEntryToDb('statusData', statusObject)
}

const statusPageEventListener = () => {
  let interval
  const topNav =  document.querySelector('.top-nav')
  const statusMainContent =  document.querySelector('#statusMainContent')
  const statusFilePicker = document.querySelector('#addStatus')
  const statusTextContainer =  document.querySelector('#statusTextContainer')
  const recentEntryDiv =  document.querySelector('.recent-entry')

  statusFilePicker.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(statusFilePicker.files[0])
    photoReader.addEventListener('load', () => {
      addStatusFile(null, photoReader.result)
      recentEntryDiv.innerText = ''
      recentEntryDiv.style.backgroundImage = `url(${photoReader.result})`
    })
  })

  const statusTextInput = document.querySelector('#statusTextInput')
  statusTextInput.addEventListener('keyup', () => {
    statusTextInput.style.height = "1px"
    statusTextInput.style.height = (3+statusTextInput.scrollHeight)+"px"
    if (statusTextInput.value.trim().length >= 1) {
      document.querySelector('#sendTextButton').style.display = 'block'
    } else {
      document.querySelector('#sendTextButton').style.display = 'none'
    }
  })

  document.querySelector('#addTextButton').addEventListener('click', () => {
    topNav.style.display = 'none'
    statusMainContent.style.display = 'none'
    statusTextContainer.style.display = 'block'
    statusTextInput.focus()
  })

  document.querySelector('#backButton').addEventListener('click', () => {
    topNav.style.display = 'block'
    statusMainContent.style.display = 'block'
    statusTextContainer.style.display = 'none'
  })

  document.querySelector('#colorButton').addEventListener('click', () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    statusTextContainer.style.backgroundColor = "#" + randomColor
  })

  document.querySelector('#sendTextButton').addEventListener('click', () => {
    const statusTextValue = statusTextInput.value
    const entryBackgroundColor = statusTextContainer.style.backgroundColor || '#08b99c'
    addStatusFile(statusTextValue, null, entryBackgroundColor)
    topNav.style.display = 'block'
    statusMainContent.style.display = 'block'
    recentEntryDiv.innerText = statusTextValue
    recentEntryDiv.style.backgroundColor = entryBackgroundColor
    recentEntryDiv.style.backgroundImage = `url('')`
    statusTextContainer.style.display = 'none'
  })

  const progress = () => {
    let bar = document.querySelector('.bar')
    let width = 1
    interval = setInterval(() => {
      if (width >= 100) {
        const slides = document.querySelectorAll('.status-data')
        const currentSlide = document.querySelector('.current')
        currentSlide.classList.remove('current')
        if (currentSlide.nextElementSibling) {
          currentSlide.nextElementSibling.classList.add('current')
          width = 1
        } else {
          slides[0].classList.add('current')
          topNav.style.display = 'block'
          statusMainContent.style.display = 'block'
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
    topNav.style.display = 'none'
    statusMainContent.style.display = 'none'
    document.querySelector('.status-entry-container').style.display = 'block'
    document.querySelector('#statusItemContent').firstElementChild.classList.add('current')
    progress()
  })

  document.querySelector('#nextButton').addEventListener('click', () => {
    clearInterval(interval)
    const slides = document.querySelectorAll('.status-data')
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
    const slides = document.querySelectorAll('.status-data')
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
    topNav.style.display = 'block'
    statusMainContent.style.display = 'block'
    document.querySelector('.current').classList.remove('current')
    document.querySelector('.status-entry-container').style.display = 'none'
    clearInterval(interval)
  })

  document.querySelector('#entryOptionsButton').addEventListener('click', () => {
    topNav.style.display = 'none'
    switchCurrentPage('singleStatusPage')
    // document.querySelector('.status-entry-options').style.display = 'block'
  })
}

export default statusPageEventListener
