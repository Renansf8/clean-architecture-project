import { InvalidFieldError } from "../../errors"
import { EmailValidation } from "./email-validation"
describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('qualquer_palavra')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('email@teste.com')
    expect(error).toBeFalsy()
  })
})