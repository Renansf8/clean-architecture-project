import { createContext } from 'react'

type FormConntextProps = {
  state: {
    isLoading: boolean, 
  },
  errorState: {
    email: string,
    password: string,
    main: string,
  },
}

export default createContext<FormConntextProps>({
  state: {
    isLoading: false, 
  },
  errorState: {
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  },
})