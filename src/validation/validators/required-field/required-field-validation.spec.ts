import { RequiredFieldError } from "../../errors"
import { RequiredFieldValidation } from "./required-field-validation"

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('email') 

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate('any_email')
    expect(error).toBeFalsy()
  })
})