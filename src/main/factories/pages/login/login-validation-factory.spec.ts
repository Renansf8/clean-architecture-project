import { ValidationComposite } from "../../../../validation/validators"
import { ValidationBuilder } from "../../../../validation/validators/builder/validation-builder"
import { makeLoginValidation } from "./login-validation-factory"

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min().build()
    ]))
  })
})