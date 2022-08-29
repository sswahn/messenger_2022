
import styles from './button.module.css'

export default () => {
  const handleToggleItalic = event => {
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()
    
    //console.log('startOffset: ', range.startOffset)
    //console.log('endOffset: ', range.endOffset)
    
    console.log('textarea: ', textarea)
    
    console.log('range.closeset(strong):', range.startContainer.parentElement.closest('strong'))
    
    
    
    if (!fragment.firstChild) {
      return console.log('should only see this if there is no selection.')
    }

    if (fragment.firstChild.nodeName !== 'EM' && 
        range.startContainer.parentElement.nodeName !== 'EM' &&
        range.startContainer.parentElement.closest('em') === null
    ) {
      const element = document.createElement('em')
      return range.surroundContents(element)
    }

    // still need to adjust range at some point:
    const node = Array.from(textarea.childNodes).find(node => node.textContent === selection.toString())
    
    // Filter for <strong> here:
    const text = `${node.previousSibling ? node.previousSibling.textContent : ''}${selection.toString()}`
    const textNode = document.createTextNode(text)
    
    node.previousSibling 
      ? textarea.replaceChild(textNode, node.previousSibling)
      : textarea.appendChild(textNode)
    
    textarea.removeChild(node)
    
    //range.setStart(textarea, range.startOffset)
    //range.setEnd(textarea, range.endOffset)
  }


  return (
    <button type="button" className={styles.tooltip} onClick={handleToggleItalic}>
      <i className="fa fa-italic"></i>
      <span className={styles.tooltiptext}>Italic</span>
    </button>
  )
}