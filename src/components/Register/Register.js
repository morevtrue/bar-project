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
        isBadRequest={props.errBadRequest}
        isBadRequestText="Переданы некорректные данные при создании пользователя."
        isConflictText="Такой пользователь уже существует"
        errEmail={props.errEmail}
      />
    </main>
  )
}

export default Register;