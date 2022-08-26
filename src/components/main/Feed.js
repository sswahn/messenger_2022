import DOMPurify from 'dompurify'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../Provider'
import config from '../../config'
import server from '../../utilities/Server'
import styles from './main.module.css'
import Dropdown from '../dropdown/Dropdown'

export default () => {
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ data: [] })

  const loadData = async event => {
    const response = await server.get(config.api.read.message)
    if (response.error !== undefined) {
      return alert(response.error.message)
    }
    dispatch({ type: 'feed', payload: response.message })
    setState({ data: response.message })
  }

  const parseContent = content => {
    content.replaceAll()
  }

  // updates state when context change
  useEffect(() => {
    //setState({ data: context.data })
  }, [context.data])

  // scroll to bottom
  useEffect(()=> {
    // to avoid scroll down on edit/delete, 
    // need condition here:
    window.scroll(0, document.body.offsetHeight)
  }, [state.data])

  // initial load data from api
  useEffect(() => {
    //loadData()
  }, [])

  return (
    <div id="feed" className={styles.feed}>
      {state.data.length ? state.data.map(item => 
        <article id={item.id} key={item.id}>
          <header>
            <img src="" alt="" />
            <button rel="author">{item.user}</button>
            <time dateTime="">{item.date}</time>
          </header>
          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.message)}}></div>
          <Dropdown />
        </article>
      ) : <article>Leave a message</article>}
    </div>
  )
}