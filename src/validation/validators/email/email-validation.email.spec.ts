import { InvalidFieldError } from "../../errors"
import { EmailValidation } from "./email-validation"

const makeSut = (): EmailValidation => new EmailValidation('email') 

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('qualquer_palavra')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate('email@teste.com')
    expect(error).toBeFalsy()
  })
})