import { render } from "@testing-library/react"
import Input from "./input"
import FormContext from "../../contexts/form/form-context"

describe("Input Component", () => {
  test("Should begin with readOnly", () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: {
        isLoading: true,
        emailError: 'string',
        passwordError: 'string',
        mainError: 'string'
      } }}>
        <Input name="input" />
      </FormContext.Provider>
    )
    const input = getByTestId('input') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})