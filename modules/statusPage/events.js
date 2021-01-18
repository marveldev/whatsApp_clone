import { addEntryToDb, deleteEntry } from "../../dataStorage.js"

const statusItemEvent = () => {
  let singleItemId;
  const itemDropdownIcons =  document.querySelectorAll('.item-dropdown-icon')
  for (let index = 0; index < itemDropdownIcons.length; index++) {
    const itemDropdownIcon = itemDropdownIcons[index]
    itemDropdownIcon.addEventListener('click', () => {
      document.querySelector('#statusItemDropdown').style.display = 'block'
      document.querySelector('#statusOverlay').style.display = 'block'
      singleItemId = itemDropdownIcon.id
    })
  }

  document.querySelector('.previous-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('.status-entry-options').style.display = 'none'
  })

  document.querySelector('#statusOverlay').addEventListener('click', () => {
    document.querySelector('#statusItemDropdown').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'none'
    document.querySelector('#statusOverlay').style.display = 'none'
  })

  document.querySelector('.delete-modal-button').addEventListener('click', () => {
    document.querySelector('#statusItemDropdown').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'block'
  })

  document.querySelector('.delete-item-button').addEventListener('click', () => {
    const element = document.querySelector(`#${singleItemId}`)
    const singleStatusEntry = element.parentElement
    document.querySelector('.status-item-container').removeChild(singleStatusEntry)
    document.querySelector('#statusOverlay').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'none'
    document.querySelector('#statusItemDropdown').style.display = 'none'

    deleteEntry('statusData', singleItemId)
  })

  document.querySelector('.close-modal-button').addEventListener('click', () => {
    document.querySelector('#statusOverlay').style.display = 'none'
    document.querySelector('.status-delete-modal').style.display = 'none'
  })
}

const addStatusFile = (textValue, photoSource) => {
  const itemId = 'id' + Date.parse(new Date()).toString()
  let statusData
  let singleStatusEntry

  if (textValue) {
    statusData =  `
      <div class="status-text status-data">${textValue}</div>
    `

    singleStatusEntry = `
      <button class="status-item-preview">
        <div class="status-text-content">${textValue}</div>
        <div class="status-info">
          <strong>18 views</strong>
          <p>Today 06:03</p>
        </div>
        <span id="${itemId}" class="item-dropdown-icon"><i class="material-icons">&#xe5d4;</i></span>
      </button>
    `
  } else {
    statusData =  `
      <img src="${photoSource}" class="status-photo status-data" alt="photo">
    `

    singleStatusEntry = `
      <button class="status-item-preview">
        <img src="${photoSource}" class="image" alt="photo">
        <div class="status-info">
          <strong>18 views</strong>
          <p>Today 06:03</p>
        </div>
        <span id="${itemId}" class="item-dropdown-icon"><i class="material-icons">&#xe5d4;</i></span>
      </button>
    `
  }
  
  document.querySelector('#statusItemContent').innerHTML += statusData
  document.querySelector('.status-item-container').innerHTML += singleStatusEntry
  document.querySelector('.view-status').style.display = 'flex'
  document.querySelector('.add-status').style.display = 'none'

  const statusObject = {
    itemId: itemId,
    textValue: textValue,
    photoSource: photoSource
  }
  addEntryToDb('statusData', statusObject)
}

const statusPageEventListener = () => {
  const statusFilePicker = document.querySelector('#addStatus')
  statusFilePicker.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(statusFilePicker.files[0])
    photoReader.addEventListener('load', () => {
      addStatusFile('', photoReader.result)
      document.querySelector('#statusPreview').src = photoReader.result
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
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('#statusMainContent').style.display = 'none'
    document.querySelector('#statusTextContainer').style.display = 'block'
    statusTextInput.focus()
  })

  document.querySelector('#backButton').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('#statusTextContainer').style.display = 'none'
  })

  document.querySelector('#sendTextButton').addEventListener('click', () => {
    const statusTextValue = statusTextInput.value
    addStatusFile(statusTextValue)
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('#statusTextContainer').style.display = 'none'
  })

  let interval;

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
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('.current').classList.remove('current')
    document.querySelector('.status-entry-container').style.display = 'none'
    clearInterval(interval)
  })

  document.querySelector('#entryOptionsButton').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('#statusMainContent').style.display = 'none'
    document.querySelector('.status-entry-options').style.display = 'block'
    statusItemEvent()
  })
}

export default statusPageEventListener
