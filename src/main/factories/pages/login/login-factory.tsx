import React from "react";
import { Login } from "../../../../presentation/pages";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const MakeLogin: React.FC = () => {
  return (
    <Login 
      authentication={makeRemoteAuthentication()} 
      validation={makeLoginValidation()} 
    />
  )
}