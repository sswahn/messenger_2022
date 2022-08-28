import styles from './button.module.css'

export default ({ handleClick }) => {

  return (
    <button type="button" className={styles.tooltip} onClick={handleClick}>
      <i className="fa fa-bold"></i>
      <span className={styles.tooltiptext}>Bold</span>
    </button>
  )
}