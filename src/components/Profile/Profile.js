import React, { useState, useEffect } from "react";
import '../../../node_modules/react-phone-number-input/style.css';
import ru from 'react-phone-number-input/locale/ru'
import PhoneInput from "react-phone-number-input";
import './Profile.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import rus from 'date-fns/locale/ru';
import MaskedInput from 'react-maskedinput';
import PWAInstallComponent from "../PWAInstallComponent/PWAInstallComponent";

function Profile(props) {
  const [valueGender, setValueGender] = useState([
    {
      value: 'Мужской',
      active: false,
    },
    {
      value: 'Женский',
      active: false,
    },
  ]);

  const [valueCurrentGender, setValueCurrentGender] = useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const [valueName, setValueName] = useState('');
  const [valuePhone, setValuePhone] = useState('');
  const [valueAnotherPhone, setValueAnotherPhone] = useState('');
  const [valueDate, setValueDate] = useState('');
  registerLocale('ru', rus);

  function handleClickPopup() {
    props.onClickPopup();
  }

  useEffect(() => {
    if (props.loggedIn) {
      setValueName(currentUser.name);
      setValueCurrentGender(currentUser.gender);
      setValuePhone(currentUser.phone);
      setValueAnotherPhone(currentUser.anotherPhone);
      if (currentUser.dateOfBirth) {
        setValueDate(new Date(currentUser.dateOfBirth));
      }
    }
  }, [currentUser, props.loggedIn]);
  
  function handleChangeName(evt) {
    setValueName(evt.target.value);
    if (evt.target.value === '' || evt.target.value === currentUser.name) {
      props.setIsActiveButtonSubmit(true);
    } else {
      props.setIsActiveButtonSubmit(false);
    }
  }

  function handleChangePhone(number) {
    setValuePhone(number);
    if (number === '' || number === currentUser.phone) {
      props.setIsActiveButtonSubmit(true);
    } else {
      props.setIsActiveButtonSubmit(false);
    }
  }

  function handleChangeAnotherPhone(number) {
    setValueAnotherPhone(number);
    if (number === '' || number === currentUser.anotherPhone) {
      props.setIsActiveButtonSubmit(true);
    } else {
      props.setIsActiveButtonSubmit(false);
    }
  }

  function handleChangeGender(evt) {
    if (evt.target.value === 'Мужской') {
      setValueGender([
        {
          value: 'Мужской',
          active: true,
        },
        {
          value: 'Женский',
          active: false,
        },
      ])
      setValueCurrentGender(evt.target.value);

    } else if (evt.target.value === 'Женский') {
      setValueGender([
        {
          value: 'Мужской',
          active: false,
        },
        {
          value: 'Женский',
          active: true,
        },
      ])
      setValueCurrentGender(evt.target.value);
    }
    setValueCurrentGender(evt.target.value);
    if (evt.target.value === '' || evt.target.value === currentUser.gender) {
      props.setIsActiveButtonSubmit(true);
    } else {
      props.setIsActiveButtonSubmit(false);
    }
  }

  useEffect(() => {
    if (valueCurrentGender === 'Мужской') {
      setValueGender([
        {
          value: 'Мужской',
          active: true,
        },
        {
          value: 'Женский',
          active: false,
        },
      ])
    } else if (valueCurrentGender === 'Женский') {
      setValueGender([
        {
          value: 'Мужской',
          active: false,
        },
        {
          value: 'Женский',
          active: true,
        },
      ])
    }
  }, [valueCurrentGender]);

  function handleSubmitForm(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: valueName,
      gender: valueCurrentGender,
      phone: valuePhone,
      anotherPhone: valueAnotherPhone,
      dateOfBirth: valueDate
    })
  }

  return (
    <>
      <Header profile={true} />
      <main className="profile">
        <form className="profile__form" name="profileForm" onSubmit={handleSubmitForm}>
          <h1 className="profile__form-title">Ваш профиль</h1>
          <label htmlFor="profile-input-name" className="profile__form-label">Ваше имя</label>
          <input
            type="text"
            name="profileInputName"
            className="profile__form-input"
            id="profile-input-name"
            placeholder="Введите ваше имя..."
            value={valueName || ''}
            onChange={handleChangeName}
          />
          <label htmlFor="profile-input-date" className="profile__form-label">Дата рождения</label>
          <DatePicker 
            name="profileInputDate"
            className="profile__form-input profile__form-input-birth"
            id="profile-input-date"
            // value={valueDate || ''}
            selected={valueDate}
            onChange={(date, evt) => {
              setValueDate(date);
              if (date === '' || date === new Date(currentUser.dateOfBirth) || date === null) {
                props.setIsActiveButtonSubmit(true);
              } else {
                props.setIsActiveButtonSubmit(false);
              }
            }}
            dateFormat='dd.MM.y'
            open={false}
            locale='ru'
            placeholderText="дд.мм.гггг"
            customInput={
              <MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />
            }
          />
          <p className="profile__form-label">Пол</p>
          <div className="profile__form-fieldset">
            <div className="profile__form-gender">
              <input
                onChange={handleChangeGender}
                checked={valueGender[0].active}
                value={valueGender[0].value || ''}
                type="radio"
                name="profileInputRadio"
                className="profile__form-input profile__form-gender custom-checkbox"
                id="profile-input-radio-men"
              />
              <label htmlFor="profile-input-radio-men" className="profile__form-label">{valueGender[0].value}</label>
            </div>
            <div className="profile__form-gender">
              <input
                onChange={handleChangeGender}
                checked={valueGender[1].active}
                value={valueGender[1].value || ''}
                type="radio"
                name="profileInputRadio"
                className="profile__form-input profile__form-gender custom-checkbox"
                id="profile-input-radio-women"
              />
              <label htmlFor="profile-input-radio-women" className="profile__form-label">{valueGender[1].value}</label>
            </div>
          </div>
          <div className="profile__form-phone-info-text">
            <label htmlFor="profile-input-phone" className="profile__form-label">Ваш телефон</label>
            <button className="profile__form-button-show-more" onClick={handleClickPopup}></button>
          </div>
          <PhoneInput
            placeholder="Ваш номер телефона..."
            id="profile-input-phone"
            name="profileInputPhone"
            value={valuePhone || ''}
            onChange={(phone => { handleChangePhone(phone) })}
            defaultCountry="RU"
            className="profile__form-input"
            labels={ru}
          />
          <div className="profile__form-phone-info-text">
            <label htmlFor="profile-input-otherPhone" className="profile__form-label">Телефон доверенного лица</label>
            <button className="profile__form-button-show-more" onClick={handleClickPopup}></button>
          </div>
          <PhoneInput
            placeholder="Введите номер телефона..."
            id="profile-input-otherPhone"
            name="profileInputOtherPhone"
            value={valueAnotherPhone || ''}
            onChange={(phone => { handleChangeAnotherPhone(phone) })}
            defaultCountry="RU"
            className="profile__form-input"
            labels={ru}
          />
          <a href="https://forms.yandex.ru/u/665d8d4473cee702618b0002/" className="profile__link" target="_blank">Обратная связь</a>
          <PWAInstallComponent />
          <button className={`profile__button ${props.isActiveButtonSubmit ? 'profile__button_type_active' : ''}`} disabled={props.isActiveButtonSubmit}>Сохранить</button>
          <button className="profile__button profile__button_type_exit" onClick={props.onClickExit}>Выйти из профиля</button>
        </form>
      </main>
      <Footer profile={true} />
    </>)
}

export default Profile;