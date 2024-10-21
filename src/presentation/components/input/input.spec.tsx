import { fireEvent, render } from "@testing-library/react"
import Input from "./input"
import FormContext from "../../contexts/form/form-context"

const makeSut = () => render(
  <FormContext.Provider value={{ state: {
    isLoading: true,
    emailError: 'string',
    passwordError: 'string',
    mainError: 'string'
  } }}>
    <Input name="input" />
  </FormContext.Provider>
)

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test("should remove readOnly on focus", () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('input') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})