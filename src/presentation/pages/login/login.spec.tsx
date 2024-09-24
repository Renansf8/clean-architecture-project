import React from "react";
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react'
import Login from "./login";
import { ValidationStub } from "../../test";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = 'mensagem de erro'
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🛑')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🛑')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId("email")
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🛑')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId("password")
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🛑')
  })
})