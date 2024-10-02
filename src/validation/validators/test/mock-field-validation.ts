import { FieldValidation } from "../../protocols/field-validation"

export class FieldValidationSpy implements FieldValidation {
  error: any = null 
  constructor (readonly field: string) {}
  validate(value: string): Error | null {
    return this.error 
  }
}