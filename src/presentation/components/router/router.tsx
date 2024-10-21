import React, { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from "../../pages";
import '../../style/global.module.scss'
import { MakeLogin } from "../../../main/factories/pages/login/login-factory";

type Props = {
  makeLogin: ReactNode
}

export const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
