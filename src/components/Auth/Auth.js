import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Auth.css';
import { useFormWithValidation } from '../../utils/useForm';

function Auth(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [errReg, setErrReg] = React.useState(false);
  const [errLogin, setErrLogin] = React.useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  React.useEffect(() => {
    if (values.password !== values.passwordRepeat && props.isRegister) {
      setPasswordCheck('Пароли не совпадают');
      setIsCheckPassword(true);
    } else if (values.password === '' && values.passwordRepeat === '' && props.isRegister) {
      setPasswordCheck('');
    } else if (values.password === values.passwordRepeat && values.password !== undefined && props.isRegister) {
      setPasswordCheck('Пароли совпадают');
      setIsCheckPassword(false);
    } else {
      setPasswordCheck('');
    }
  }, [values.password, values.passwordRepeat, props.isRegister])

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!props.isRegister) {
      props.onSubmitAuth(values.password, values.email);
    } else {
      props.onSubmitRegister(values.password, values.email);
    }

    if (props.isBadRequest || props.conflictErr) {
      setErrReg(true);
    } else {
      setErrReg(false);
    }

    if (props.isBadRequestLogin || props.isUnathorized) {
      setErrLogin(true);
    } else {
      setErrReg(true);
    }
  }

  function handleChangeInput(evt) {
    if (props.isRegister) {
      props.setIsFirstAuth(true);
    }
    handleChange(evt);
    setErrLogin(false);
    setErrReg(false);
  }

  return (
    <section className="auth">
      <div className="auth__content">
        <form className="auth__form" name="authForm" onSubmit={handleSubmit}>
          <div className="auth__form-content">
            <h1 className="auth__form-title">{props.helloText}</h1>
            <ul className="auth__form-inputs">
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-email" className="auth__form-label">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="auth__form-input"
                  id="auth-form-email"
                  placeholder="Введите e-mail здесь"
                  value={values.email || ""}
                  onChange={handleChangeInput}
                  required
                />
                <span className="auth__form-input-login-err" id="auth-form-email-error">
                  {errors.email}
                </span>
              </li>
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-password" className="auth__form-label">Пароль</label>
                <input
                  type="password"
                  name="password"
                  className={`auth__form-input 
                    ${isCheckPassword && props.isRegister ? 'auth__form-password-error_type_active' : ''}
                    ${errors.password ? 'auth__form-password-error_type_active' : ''}`}
                  id="auth-form-password"
                  placeholder="Введите пароль здесь"
                  value={values.password || ""}
                  minLength="6"
                  onChange={handleChangeInput}
                  required
                />
                <span className={`auth__form-password-error ${errors.password ? 'auth__form-password-error_type_active' : ''}`} id="auth-form-password-error">
                  {errors.password || ""}
                </span>
              </li>
              {
                props.isRegister && <li className={`auth__form-input-content ${!props.isRegister ? 'auth__form-input-content_type_hidden' : ''}`}>
                  <label htmlFor="auth-form-repeatPassword" className="auth__form-label">Повторите пароль</label>
                  <input
                    type="password"
                    name="passwordRepeat"
                    className={`auth__form-input ${isCheckPassword ? 'auth__form-password-error_type_active' : ''}`}
                    id="auth-form-repeatPassword"
                    placeholder="Повторите пароль здесь"
                    value={values.passwordRepeat || ""}
                    onChange={handleChangeInput}
                    required
                  />
                  <span className={`auth__form-password-error ${isCheckPassword ? 'auth__form-password-error_type_active' : ''}`}>
                    {passwordCheck}
                  </span>
                </li>
              }
            </ul>
          </div>
          <div className="auth__form-content-button">
            <span className={`auth__error-text ${(props.isUnathorized || props.isBadRequest || props.isBadRequestLogin || props.conflictErr) ? 'auth__error-text_type_active' : ''}`}>
              {(props.errEmail === values.email && ((props.isUnathorized && props.isUnathorizedText) || (props.conflictErr && props.isConflictText) || (props.isBadRequest && props.isBadRequestText) || (props.isBadRequestLogin && props.isBadRequestLoginText))) || ''}
            </span>
            <button
              type="submit"
              className={`auth__form-button ${!isValid || errReg || errLogin || isCheckPassword || props.errEmail === values.email || errors.email ? 'auth__form-button_type_disabled' : ''}`}
              disabled={!isValid || errLogin || errReg || (isCheckPassword && props.isRegister) || props.errEmail === values.email}>
              {props.buttonText}
            </button>
            <div className="auth__form-text-content">
              <p className="auth__form-text">{props.authText}</p>
              <Link to={props.link} className="auth__form-login">{props.authLogin}</Link>
            </div>
            <div className="auth__form-text-content privacy-link">
              <p className="auth__form-text">
                При входе и регистрации вы соглашаетесь с &nbsp;
                <Link to="/privacy" className="auth__form-login privacy-text">политикой обработки персональных данных.</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Auth;