import React, { memo } from "react"
import Styles from './form-status-styles.module.scss'
import Spinner from "../spinner/spinner"

const Footer: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <p className={Styles.error}>Erro</p>
    </div>
  )
}

export default memo(Footer)
