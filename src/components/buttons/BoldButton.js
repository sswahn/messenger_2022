import styles from './button.module.css'

export default () => {

  const handleToggleBold = event => {
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()
    
    console.log('startOffset: ', range.startOffset)
    console.log('endOffset: ', range.endOffset)
    
    if (!fragment.firstChild) {
      return console.log('should only see this if there is no selection.')
    }
    
    if (fragment.firstChild.nodeName !== 'STRONG') {
      const element = document.createElement('strong')
      return range.surroundContents(element)
    }

    // still need to adjust range at some point:
    
    const node = Array.from(textarea.childNodes).find(node => node.textContent === selection.toString())
 
    const text = node.previousSibling.textContent + selection.toString()
    const textNode = document.createTextNode(text)

    textarea.replaceChild(textNode, node.previousSibling)
    textarea.removeChild(node)
    range.setStart(textarea, range.startOffset)
    range.setEnd(textarea, range.endOffset)
    
  }

  return (
    <button type="button" className={styles.tooltip} onClick={handleToggleBold}>
      <i className="fa fa-bold"></i>
      <span className={styles.tooltiptext}>Bold</span>
    </button>
  )
}