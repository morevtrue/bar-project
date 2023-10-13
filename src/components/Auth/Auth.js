import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Auth.css';
import logo from '../../images/logo.jpg';

function Auth(props) {
  return (
    <section className="auth">
      <div className="auth__content">
        <img src={logo} alt="логотип сайта" className="auth__logo" />
        <form className="auth__form">
          <div className="auth__form-content">
            <h1 className="auth__form-title">{props.helloText}</h1>
            <ul className="auth__form-inputs">
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-login" className="auth__form-label">Логин</label>
                <input type="text" className="auth__form-input" id="auth-form-login" placeholder="Введите логин здесь" />
              </li>
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-password" className="auth__form-label">Пароль</label>
                <input type="password" className="auth__form-input" id="auth-form-password" placeholder="Введите пароль здесь" />
              </li>
              {
                props.isRegister && <li className="auth__form-input-content">
                  <label htmlFor="auth-form-repeatPassword" className="auth__form-label">Повторите пароль</label>
                  <input type="password" className="auth__form-input" id="auth-form-repeatPassword" placeholder="Повторите пароль здесь" />
                </li>
              }
            </ul>
          </div>
          <div className="auth__form-content-button">
            <button className="auth__form-button">{props.buttonText}</button>
            <div className="auth__form-text-content">
              <p className="auth__form-text">{props.authText}</p>
              <Link to={props.link} className="auth__form-login">{props.authLogin}</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Auth;