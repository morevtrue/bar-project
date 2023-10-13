import React, { useEffect } from "react";
import './Login.css';
import Auth from "../Auth/Auth";

function Login(props) {
  return (
    <main className="login">
      <Auth
        helloText="Рады видеть!"
        buttonText="Войти"
        authText="Ещё не зарегистрированы?"
        authLogin="Регистрация"
        link="/sign-up"
      />
    </main>
  )
}

export default Login;