import React from "react";
import './LoginAdmin.css';
import Auth from "../Auth/Auth";

function LoginAdmin(props) {
  return (
    <main className="login">
      <Auth
        onSubmitAdmin={props.onSubmit}
        isUnathorized={props.errUnathorized}
        isUnathorizedText="Неправильные почта или пароль"
        isBadRequestLogin={props.errBadRequestLogin}
        isBadRequestLoginText="Переданы некорректные данные при авторизации."
        isLoginAdmin={true}
        helloText="Добро пожаловать!"
        buttonText="Войти"
        errEmail={props.errEmailLogin}
      />
    </main>
  )
}

export default LoginAdmin;