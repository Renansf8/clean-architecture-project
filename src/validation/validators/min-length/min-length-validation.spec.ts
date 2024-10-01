import { InvalidFieldError } from '../../errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => new MinLengthValidation('field', 5) 

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return error false if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})