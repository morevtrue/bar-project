import React from "react";
import './Register.css';
import Auth from "../Auth/Auth";

function Register(props) {
  return (
    <main className="register">
      <Auth
        onSubmitRegister={props.onSubmit}
        helloText="Регистрация"
        buttonText="Зарегистрироваться"
        authText="Есть аккаунт?"
        authLogin="Войти"
        link="/"
        isRegister={true}
        conflictErr={props.conflictErr}
        isBadRequest={props.errBadRequest}
        isBadRequestText="Переданы некорректные данные при создании пользователя."
        isConflictText="Такой пользователь уже существует"
        errEmail={props.errEmail}
        setIsFirstAuth={props.setIsFirstAuth}
      />
    </main>
  )
}

export default Register;