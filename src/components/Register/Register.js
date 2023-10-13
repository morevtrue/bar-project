import React, { useEffect } from "react";
import './Register.css';
import Auth from "../Auth/Auth";

function Register(props) {
  return (
    <main className="register">
      <Auth
        helloText="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        authText="Уже зарегистрированы?"
        authLogin="Войти"
        link="/sign-in"
        isRegister={true}
      />
    </main>
  )
}

export default Register;