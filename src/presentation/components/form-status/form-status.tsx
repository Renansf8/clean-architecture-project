import React, { useContext } from "react"
import Styles from './form-status-styles.module.scss'
import Spinner from "../spinner/spinner"
import Context from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <p className={Styles.error}>{errorMessage}</p>}
    </div>
  )
}

export default FormStatus
