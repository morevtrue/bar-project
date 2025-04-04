import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Auth.css';
import { useFormWithValidation } from '../../utils/useForm';
import logo_faise from '../../images/faise.svg';

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
    if (!props.isRegister && !props.isLoginAdmin) {
      props.onSubmitAuth(values.password, values.email);
    } else if (props.isLoginAdmin) {
      props.onSubmitAdmin(values.password, values.text);
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
            {
              !props.isLoginAdmin && <Link to="/about-project" className="auth__about-project">Информация о проекте</Link>
            }
            <a className="auth__app-link" href="https://drive.google.com/file/d/1bOCVRw_7OygpEG5i2KQ04iyTwwC_wulN/view?usp=sharing" target="blank">Скачать приложение для Android</a>
            <h1 className="auth__form-title">{props.helloText}</h1>
            <ul className="auth__form-inputs">
              <li className="auth__form-input-content">
                <label htmlFor="auth-form-email" className="auth__form-label">{!props.isLoginAdmin ? 'E-mail' : 'Логин'}</label>
                <input
                  type={props.isLoginAdmin ? 'text' : 'email'}
                  name={props.isLoginAdmin ? 'text' : 'email'}
                  className="auth__form-input"
                  id="auth-form-email"
                  placeholder="Введите e-mail здесь"
                  value={(props.isLoginAdmin ? values.text : values.email) || ""}
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
            {
              !props.isLoginAdmin &&
                <>
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
                </>
            }
          </div>
          <div className="auth__form-partners_container">
              <p className="partner__text privacy-link">
                  Проект создан при поддержке <span className="about-project__paragraph_bold">Федерального государственного бюджетного учреждения «Фонд содействия развитию малых форм предприятий в научно-технической сфере»</span> в рамках программы <span className="about-project__paragraph_bold">«Студенческий стартап»</span> федерального проекта <span className="about-project__paragraph_bold">«Платформа университетского
                  технологического предпринимательства»</span>.
              </p>
              <img className="faise" src={logo_faise}></img>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Auth;