import styles from './button.module.css'

export default () => {

  const handleToggleBold = () => {
    //TODO: move bold button to its own component

    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()

    const preSelectionRange = range.cloneRange() // this seems to gets caret locaiton

    console.log('range: ', range)
    console.log('selection text: ', selection.toString())
    console.log('slection length: ', selection.toString().length)
    console.log('text length preceeding selection: ',  preSelectionRange.startOffset)
    console.log('text area: ', textarea)


    if (!fragment.firstChild) {
      console.log('should only see this if there is no selection.')

      return
    }




    // get all text area content
    // get cursor position and insert or append <strong></strong>
    // or get selection content and append to <strong></strong>
    // check selection for strong or em elements
    // if selection has em get preceeding em content and close </em> befor selection 
    // move selection content to <strong><em></em></strong>
    // return altered text area content

    if (fragment.firstChild.nodeName !== 'STRONG') {
      const element = document.createElement('strong')
      selection.getRangeAt(0).surroundContents(element)
    } else {
      textarea.childNodes.forEach((node, index) => {
        if (node.nodeName === 'STRONG') {
          const text = textarea.childNodes[index -1].textContent + selection.toString()
          const textNode = document.createTextNode(text)
          textarea.childNodes[index - 1].replaceWith(textNode)
          textarea.removeChild(node)
        }
      })
    }
  }

  return (
    <button type="button" className={styles.tooltip} onClick={handleToggleBold}>
      <i className="fa fa-bold"></i>
      <span className={styles.tooltiptext}>Bold</span>
    </button>
  )
}