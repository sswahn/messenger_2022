import styles from './button.module.css'

export default () => {
  const handleClick = event => {
    document.getElementById('file-upload').click()
  }

  const handleFileUpload = event => {
    const file = event.target.files[0]
    const data = new FormData()
    data.append('file', file)
    //Make a request to server and send formData
    console.log('file:', file)
    console.log('Input click fired: ', data)
  }

  return (
    <button type="button" className={styles.tooltip} onClick={handleClick}>
      <i className="fa fa-image"></i>
      <span className={styles.tooltiptext}>Upload</span>
      <input id="file-upload" type="file" onChange={handleFileUpload} />
    </button>
  )
}