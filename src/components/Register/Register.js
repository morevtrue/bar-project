import React from "react";
import './Register.css';
import Auth from "../Auth/Auth";

function Register(props) {
  return (
    <main className="register">
      <Auth
        onSubmitRegister={props.onSubmit}
        helloText="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        authText="Уже зарегистрированы?"
        authLogin="Войти"
        link="/sign-in"
        isRegister={true}
        conflictErr={props.conflictErr}
      />
    </main>
  )
}

export default Register;