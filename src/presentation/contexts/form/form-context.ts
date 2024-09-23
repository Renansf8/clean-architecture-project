import { createContext } from 'react'

type FormConntextProps = {
  state: {
    isLoading: boolean, 
    emailError: string,
    passwordError: string,
    mainError: string,
  },
  setState?: any
}

export default createContext<FormConntextProps>({
  state: {
    isLoading: false, 
    emailError: '',
    passwordError: '',
    mainError: '',
  },
})