const statusPageEventListener = () => {
  document.querySelector('#addStatusButton').addEventListener('click', () => {
    console.log('ok');
  })


  document.querySelector('#viewStatusButton').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'none'
    document.querySelector('.status-photo-container').style.display = 'block'

    const bar = document.querySelector('.bar')
    let width = 1
    const progress = () => {
      if (width >= 100) {
        clearInterval(interval)
      } else {
        width++;
        bar.style.width = width + '%';
      }
    }
    const interval = setInterval(progress, 10)
  })

  document.querySelector('#returnButton').addEventListener('click', () => {
    document.querySelector('.top-nav').style.display = 'block'
    document.querySelector('.status-photo-container').style.display = 'none'
  })
}

export default statusPageEventListener
