import React from "react";
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from "./login";
import { ValidationStub } from "../../test";

type SutTypes = {
  sut: RenderResult;
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError!
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🛑')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🛑')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🛑')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🛑')
  })

  test('Should show valid email state if Validation secceeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation secceeds', () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})