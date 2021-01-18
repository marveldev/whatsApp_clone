import { addEntryToDb, deleteEntry } from "../../dataStorage.js"

const statusItemEvent = () => {
  let singleItemId;
  const itemDropdownIcons =  document.querySelectorAll('.item-dropdown-icon')
  const statusOverlay = document.querySelector('#statusOverlay')
  const statusItemDropdown = document.querySelector('#statusItemDropdown')
  const statusDeleteModal = document.querySelector('.status-delete-modal')

  for (let index = 0; index < itemDropdownIcons.length; index++) {
    const itemDropdownIcon = itemDropdownIcons[index]
    itemDropdownIcon.addEventListener('click', () => {
      statusItemDropdown.style.display = 'block'
      statusOverlay.style.display = 'block'
      singleItemId = itemDropdownIcon.id
    })
  }

  document.querySelector('.previous-button').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    document.querySelector('.status-entry-options').style.display = 'none'
  })

  statusOverlay.addEventListener('click', () => {
    statusItemDropdown.style.display = 'none'
    statusDeleteModal.style.display = 'none'
    statusOverlay.style.display = 'none'
  })

  document.querySelector('.delete-modal-button').addEventListener('click', () => {
    statusItemDropdown.style.display = 'none'
    statusDeleteModal.style.display = 'block'
  })

  document.querySelector('.delete-item-button').addEventListener('click', () => {
    const element = document.querySelector(`#${singleItemId}`)
    const singleStatusEntry = element.parentElement
    document.querySelector('.status-entry-preview').removeChild(singleStatusEntry)
    statusOverlay.style.display = 'none'
    statusDeleteModal.style.display = 'none'
    statusItemDropdown.style.display = 'none'

    deleteEntry('statusData', singleItemId)
  })

  document.querySelector('.close-modal-button').addEventListener('click', () => {
    statusOverlay.style.display = 'none'
    statusDeleteModal.style.display = 'none'
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
  document.querySelector('.status-entry-preview').innerHTML += singleStatusEntry
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
  let interval
  const topNav =  document.querySelector('.top-nav')
  const statusMainContent =  document.querySelector('#statusMainContent')
  const statusFilePicker = document.querySelector('#addStatus')

  statusFilePicker.addEventListener('change', () => {
    const photoReader = new FileReader()
    photoReader.readAsDataURL(statusFilePicker.files[0])
    photoReader.addEventListener('load', () => {
      addStatusFile('', photoReader.result)
      document.querySelector('.recent-entry').innerText = ''
      document.querySelector('.recent-entry').style.backgroundImage = `url(${photoReader.result})`
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
    document.querySelector('#statusTextContainer').style.display = 'block'
    statusTextInput.focus()
  })

  document.querySelector('#backButton').addEventListener('click', () => {
    topNav.style.display = 'block'
    statusMainContent.style.display = 'block'
    document.querySelector('#statusTextContainer').style.display = 'none'
  })

  document.querySelector('#sendTextButton').addEventListener('click', () => {
    const statusTextValue = statusTextInput.value
    addStatusFile(statusTextValue)
    topNav.style.display = 'block'
    statusMainContent.style.display = 'block'
    document.querySelector('.recent-entry').innerText = statusTextValue
    document.querySelector('#statusTextContainer').style.display = 'none'
    document.querySelector('.recent-entry').style.backgroundImage = `url('')`
  })

  const progress = () => {
    let bar = document.querySelector('.bar')
    let width = 1
    interval = setInterval(() => {
      if (width >= 100) {
        const slides = document.querySelectorAll('.status-data')
        const currentSlide = document.querySelector('.current')
        console.log(currentSlide);
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
    console.log(slides);
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
    statusMainContent.style.display = 'none'
    document.querySelector('.status-entry-options').style.display = 'block'
    statusItemEvent()
  })
}

export default statusPageEventListener
