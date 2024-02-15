import React from "react";
import './Login.css';
import Auth from "../Auth/Auth";

function Login(props) {
  return (
    <main className="login">
      <Auth
        onSubmitAuth={props.onSubmit}
        isUnathorized={props.errUnathorized}
        isUnathorizedText="Неправильные почта или пароль"
        isBadRequestLogin={props.errBadRequestLogin}
        isBadRequestLoginText="Переданы некорректные данные при авторизации."
        isLogin={true}
        helloText="Рады видеть!"
        buttonText="Войти"
        authText="Ещё не зарегистрированы?"
        authLogin="Регистрация"
        link="/sign-up"
        errEmail={props.errEmailLogin}
      />
    </main>
  )
}

export default Login;