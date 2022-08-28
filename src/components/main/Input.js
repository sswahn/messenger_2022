import { useContext, useState } from 'react'
import { Context } from '../../Provider'
import config from '../../config'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import cookie from '../../utilities/Cookies'
import styles from './main.module.css'
import Emoji from '../emoji/Emoji'
import BoldButtonCreate from '../buttons/BoldButtonCreate'
import BoldButtonRemove from '../buttons/BoldButtonRemove'
import ItalicButton from '../buttons/ItalicButton'
import LinkButton from '../buttons/LinkButton'
import MentionButton from '../buttons/MentionButton'
import EmojiButton from '../buttons/EmojiButton'
import UploadImageButton from '../buttons/UploadImageButton'
import SubmitButton from '../buttons/SubmitButton'

export default () => {
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ 
    stored_text: store.get('text') || '',
    is_bold: true,
    emoji: false
  })

  // TODO: refer to existing code in aws for cognito syntax
  const postRequest = async message => {
    const token = cookie.get('token')
    const session = cookie.decode(token)
    const user = { 
      username: session['cognito:username'], 
      avatar: session['cognito:picture'] 
    }
    const request = { user, message }
    return server.post(config.api.create.message, request)
  }

  const submit = async element => {
    const message = element.innerHTML
    const response = await postRequest(message)
    if (response.error !== undefined) {
      return alert(response.error.message)
    }
    dispatch({ type: 'feed', payload: response.message })
    element.textContent = ''
    element.focus()
    store.remove('text')
  }

  const handleSubmit = event => {
    event.preventDefault()
    const element = document.getElementById('textarea')
    !element.textContent 
      ? alert('Please enter text to leave a message.')
      : submit(element)
  }

  const handleKeyDown = event => {
    store.set('text', event.target.outerText)
    event.keyCode === 13 && handleSubmit(event)
  }

  const handleCreateBold = () => {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()
    if (!fragment.firstChild) {
      console.log('should only see this if there is no selection.')
      return
    }
    const element = document.createElement('strong')
    range.surroundContents(element)
    setState({ ...state, is_bold: false })
  }

  const handleRemoveBold = () => {
    // still need to adjust range at some point
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const node = Array.from(textarea.childNodes).find(node => node.textContent === selection.toString())
    const text = node.previousSibling.textContent + selection.toString()
    const textNode = document.createTextNode(text)

    textarea.contains(node) 
      ? textarea.replaceChild(textNode, node.previousSibling) 
      : textarea.replaceChild(textNode, node.previousSibling)
    
    textarea.removeChild(node)
    setState({ ...state, is_bold: true })
    
  }

  return (
    <form className={styles.input} 
      onSubmit={handleSubmit}
      style={{minHeight: state.parent_height}}>
      <div id="textarea" className={styles.textarea}
        data-placeholder="Write a message"
        contentEditable="plaintext-only"
        suppressContentEditableWarning="true"
        spellCheck="true"
        tabIndex="0"
        onKeyDown={handleKeyDown}>
          {state.stored_text}
          {/** state.img_src ? <img src={state_src} alt="" /> : <></> */}
      </div>
      <div role="toolbar">
        <div>
          {state.is_bold 
            ? <BoldButtonCreate handleClick={handleCreateBold} />
            : <BoldButtonRemove handleClick={handleRemoveBold} />
          }
          <ItalicButton />
          <LinkButton />
        </div>
        <div>
          <MentionButton />
          <EmojiButton />
          <UploadImageButton />
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
