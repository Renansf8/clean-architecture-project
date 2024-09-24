import React, { useState, useEffect } from "react";
import Styles from './login-styles.module.scss'
import {LoginHeader, Footer, FormStatus, Input } from "../../components";
import Context from '../../contexts/form/form-context'
import { Validation } from "../../protocols/validation";
import { Authentication } from "../../../domain/usecases";

type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError:  validation?.validate('email', state.email )!,
      passwordError:  validation?.validate('password', state.password )!
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.emailError || state.passwordError) return
      setState({ ...state, isLoading: true})
      const account = await authentication?.auth({ email: state.email, passoword: state.password})
      localStorage.setItem('accessToken', account?.accessToken!)
    } catch (error: any) {
      setState({ 
        ...state, 
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
      <form action="" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login