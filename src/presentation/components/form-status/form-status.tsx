import React, { useContext } from "react"
import Styles from './form-status-styles.module.scss'
import Spinner from "../spinner/spinner"
import Context from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <p className={Styles.error}>{errorState.main}</p>}
    </div>
  )
}

export default FormStatus
