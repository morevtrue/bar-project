import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Auth.css';
import logo from '../../images/logo.png';

function Auth(props) {
  const [valueLogin, setValueLogin] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valuePasswordRepeat, setValuePasswordRepeat] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  React.useEffect(() => {
    if (valuePassword !== valuePasswordRepeat && props.isRegister) {
      setPasswordCheck('Пароли не совпадают');
      setIsCheckPassword(true);
    } else if (valuePassword === '' && valuePasswordRepeat === '') {
      setPasswordCheck('');
    } else {
      setPasswordCheck('Пароли совпадают');
      setIsCheckPassword(false);
    }
  }, [valuePassword, valuePasswordRepeat, props.isRegister])

  function handleChangeValueLogin(evt) {
    setValueLogin(evt.target.value);
  }

  function handleChangeValuePassword(evt) {
    setValuePassword(evt.target.value);
  }

  function handleChangeValuePasswordRepeat(evt) {
    setValuePasswordRepeat(evt.target.value);
  }


  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.isLogin) {
      props.onSubmitAuth(valuePassword, valueLogin)
    } else {
      props.onSubmitRegister(valuePassword, valueLogin)

    }
  }

  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__content-logo">
          <img src={logo} alt="логотип сайта" className="auth__logo" />
        </div>
        <form className="auth__form" name="authForm" onSubmit={handleSubmit}>
          <div className="auth__form-content">
            <h1 className="auth__form-title">{props.helloText}</h1>
            <ul className="auth__form-inputs">
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-login" className="auth__form-label">Логин</label>
                <input
                  type="text"
                  className="auth__form-input"
                  id="auth-form-login"
                  placeholder="Введите логин здесь"
                  value={valueLogin}
                  onChange={handleChangeValueLogin}
                />
                <span className={`auth__form-input-login-err ${props.conflictErr && props.isRegister ? 'auth__form-input-login-err_type_active' : ''}`}>Такой логин уже существует</span>
              </li>
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-password" className="auth__form-label">Пароль</label>
                <input
                  type="password"
                  className={`auth__form-input ${isCheckPassword && props.isRegister ? 'auth__form-password-error_type_active' : ''}`}
                  id="auth-form-password"
                  placeholder="Введите пароль здесь"
                  value={valuePassword}
                  onChange={handleChangeValuePassword}
                  autoComplete="on"
                />
              </li>
              {
                props.isRegister && <li className="auth__form-input-content">
                  <label htmlFor="auth-form-repeatPassword" className="auth__form-label">Повторите пароль</label>
                  <input
                    type="password"
                    className={`auth__form-input ${isCheckPassword ? 'auth__form-password-error_type_active' : ''}`}
                    id="auth-form-repeatPassword"
                    placeholder="Повторите пароль здесь"
                    value={valuePasswordRepeat}
                    onChange={handleChangeValuePasswordRepeat}
                  />
                  <span className={`auth__form-password-error ${isCheckPassword ? 'auth__form-password-error_type_active' : ''}`}>
                    {passwordCheck}
                  </span>
                </li>
              }
            </ul>
          </div>
          <div className="auth__form-content-button">
            <button className={`auth__form-button ${isCheckPassword ? 'auth__form-button_type_disabled' : ''}`} disabled={isCheckPassword && props.isRegister}>
              {props.buttonText}
            </button>
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