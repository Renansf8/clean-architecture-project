import { createContext } from 'react'

type FormConntextProps = {
  isLoading: boolean,
  errorMessage: string
}

export default createContext<FormConntextProps>({ isLoading: false, errorMessage: '' })