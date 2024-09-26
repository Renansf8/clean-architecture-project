import React from "react";
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from "./login";
import { ValidationStub } from "../../test";
import { BrowserRouter } from "react-router-dom";


type SutTypes = {
  sut: RenderResult;
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError!
  const sut = render(
    <>
    <BrowserRouter>
      <Login validation={validationStub} />
    </BrowserRouter>
    </>
    )
  return {
    sut,
  }
}

const simulateValidSubmit = (sut: RenderResult,  email = "any_email", password = "any_password"): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = "any_email"): void => {
  const emailInput = sut.getByTestId("email")
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = "any_password"): void => {
  const passwordInput = sut.getByTestId("password")
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🛑' : '🟢')
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean) => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}


describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = 'mensagem de erro'

    const { sut } = makeSut({validationError})
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation secceeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation secceeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should go to sign up page', () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    console.log('teste', window.location.href)
    expect(window.location.pathname).toBe('/signup')
  })
})