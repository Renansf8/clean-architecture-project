import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-field-validation"

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('any_email')
    expect(error).toBeFalsy()
  })
})