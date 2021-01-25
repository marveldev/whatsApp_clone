import { deleteEntry } from "../../dataStorage.js"

const statusItemEvent = () => {
  const itemDropdownIcons =  document.querySelectorAll('.item-dropdown-icon')
  const statusOverlay = document.querySelector('#statusOverlay')
  const statusItemDropdown = document.querySelector('#statusItemDropdown')
  const statusDeleteModal = document.querySelector('.status-delete-modal')
  let singleItemId

  for (let index = 0; index < itemDropdownIcons.length; index++) {
    const itemDropdownIcon = itemDropdownIcons[index]
    itemDropdownIcon.addEventListener('click', () => {
      statusItemDropdown.style.display = 'block'
      statusOverlay.style.display = 'block'
      singleItemId = itemDropdownIcon.parentElement.id
    })
  }

  document.querySelector('.previous-button').addEventListener('click', () => {
    document.querySelector('.status-entry-options').style.display = 'none'
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('#statusMainContent').style.display = 'block'
    console.log(document.querySelector('.status-entry-options'));
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
  console.log(document.querySelector('.status-entry-options'));

  document.querySelector('.delete-item-button').addEventListener('click', () => {
    const singleItemContent = document.querySelector(`.${singleItemId}`)
    const singleStatusEntry = document.querySelector(`#${singleItemId}`)
    document.querySelector('.status-entry-preview').removeChild(singleStatusEntry)
    document.querySelector('#statusItemContent').removeChild(singleItemContent)

    if (document.querySelector('.status-entry-preview').innerHTML.trim().length === 0) {
      document.querySelector('.view-status').style.display = 'none'
      document.querySelector('.add-status').style.display = 'flex'
    }

    statusDeleteModal.style.display = 'none'
    statusOverlay.style.display = 'none'
    statusItemDropdown.style.display = 'none'
    console.log(document.querySelector('.status-entry-options'));

    deleteEntry('statusData', singleItemId)
  })

  document.querySelector('.close-modal-button').addEventListener('click', () => {
    statusOverlay.style.display = 'none'
    statusDeleteModal.style.display = 'none'
  })
}

export default statusItemEvent
