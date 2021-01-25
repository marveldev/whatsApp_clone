import { deleteEntry } from "../../dataStorage.js"
import switchCurrentPage from "../helper.js"

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
    switchCurrentPage('statusPage')
    document.querySelector('.top-nav').style.display = 'block'
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
    const singleStatusEntry = document.querySelector(`#${singleItemId}`)
    document.querySelector('.status-entry-preview').removeChild(singleStatusEntry)

    statusDeleteModal.style.display = 'none'
    statusOverlay.style.display = 'none'
    statusItemDropdown.style.display = 'none'

    deleteEntry('statusData', singleItemId)
  })

  document.querySelector('.close-modal-button').addEventListener('click', () => {
    statusOverlay.style.display = 'none'
    statusDeleteModal.style.display = 'none'
  })
}

export default statusItemEvent
