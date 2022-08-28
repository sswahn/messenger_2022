import styles from './button.module.css'

export default () => {

  const handleToggleBold = event => {
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()
    
    console.log('here')
    
    if (!fragment.firstChild) {
      console.log('should only see this if there is no selection.')
      return
    }
    
    if (fragment.firstChild.nodeName !== 'STRONG') {
      const element = document.createElement('strong')
      range.surroundContents(element)
      return
    }
    
    //=================================================
    
    // try getting the node and if it has strong element
    // use a condition to verify
    // still need to adjust range at some point
    
    const node = Array.from(textarea.childNodes).find(node => node.textContent === selection.toString())
    const text = node.previousSibling.textContent + selection.toString()
    const textNode = document.createTextNode(text)

    textarea.contains(node) 
      ? textarea.replaceChild(textNode, node.previousSibling) 
      : textarea.replaceChild(textNode, node.previousSibling)
    
    textarea.removeChild(node)
  }

  return (
    <button type="button" className={styles.tooltip} onClick={handleToggleBold}>
      <i className="fa fa-bold"></i>
      <span className={styles.tooltiptext}>Bold</span>
    </button>
  )
}