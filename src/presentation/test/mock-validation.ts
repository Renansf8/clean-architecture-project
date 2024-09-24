import { Validation } from "../protocols/validation";

export class ValidationStub implements Validation {
  errorMessage!: string | null;

  validate (): string {
    return this.errorMessage!
  }
}