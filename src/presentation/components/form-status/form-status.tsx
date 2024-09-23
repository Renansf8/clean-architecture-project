import React, { useContext } from "react"
import Styles from './form-status-styles.module.scss'
import Spinner from "../spinner/spinner"
import Context from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <p className={Styles.error}>{mainError}</p>}
    </div>
  )
}

export default FormStatus
