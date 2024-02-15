import React, { useState, useEffect } from "react";
import '../../../node_modules/react-phone-number-input/style.css';
import ru from 'react-phone-number-input/locale/ru'
import PhoneInput from "react-phone-number-input";
import './Profile.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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


  // function signOut() {
  //   props.onLogoutProfile();
  // }

  useEffect(() => {
    if (props.loggedIn) {
      setValueName(currentUser.name);
      setValueCurrentGender(currentUser.gender);
      setValuePhone(currentUser.phone);
      setValueAnotherPhone(currentUser.anotherPhone);
      setValueDate(currentUser.dateOfBirth);
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

  function handleChangeDate(evt) {
    setValueDate(evt.target.value);
    if (evt.target.value === '' || evt.target.value === currentUser.dateOfBirth) {
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
        {/* <div className="profile__content-sos">
          <p className="profile__button-text">Если вам нужна помощь, нажмите на кнопку ниже:</p>
          <button className="profile__button-sos"></button>
        </div> */}
        <form className="profile__form" name="profileForm" onSubmit={handleSubmitForm}>
          <h1 className="profile__form-title">Ваш профиль</h1>
          <label htmlFor="profile-input-name" className="profile__form-label">Имя</label>
          <input
            type="text"
            name="profileInputName"
            className="profile__form-input"
            id="profile-input-name"
            placeholder="Ваше имя..."
            value={valueName || ''}
            onChange={handleChangeName}
          />
          <div className="profile__form-fieldset">
            <p className="profile__form-text-gender">Пол:</p>
            <div className="profile__form-gender">
              <label htmlFor="profile-input-radio-men" className="profile__form-label">{valueGender[0].value}</label>
              <input
                onChange={handleChangeGender}
                checked={valueGender[0].active}
                value={valueGender[0].value || ''}
                type="radio"
                name="profileInputRadio"
                className="profile__form-input profile__form-gender"
                id="profile-input-radio-men"
              />
            </div>
            <div className="profile__form-gender">
              <label htmlFor="profile-input-radio-women" className="profile__form-label">{valueGender[1].value}</label>
              <input
                onChange={handleChangeGender}
                checked={valueGender[1].active}
                value={valueGender[1].value || ''}
                type="radio"
                name="profileInputRadio"
                className="profile__form-input profile__form-gender"
                id="profile-input-radio-women"
              />
            </div>
          </div>
          <label htmlFor="profile-input-phone" className="profile__form-label">Ваш телефон</label>
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
          <label htmlFor="profile-input-otherPhone" className="profile__form-label">Телефон доверенного лица</label>
          <PhoneInput
            placeholder="Ваш номер телефона..."
            id="profile-input-otherPhone"
            name="profileInputOtherPhone"
            value={valueAnotherPhone || ''}
            onChange={(phone => { handleChangeAnotherPhone(phone) })}
            defaultCountry="RU"
            className="profile__form-input"
            labels={ru}
          />
          <label htmlFor="profile-input-date" className="profile__form-label">Дата рождения</label>
          <input
            type="date"
            name="profileInputDate"
            className="profile__form-input"
            id="profile-input-date"
            value={valueDate || ''}
            onChange={handleChangeDate}
          />
          <button className={`profile__button ${props.isActiveButtonSubmit ? 'profile__button_type_active' : ''}`} disabled={props.isActiveButtonSubmit}>Сохранить</button>
          <button className="profile__button profile__button_type_exit" onClick={props.onClickExit}>Выйти из профиля</button>
        </form>
      </main>
      <Footer profile={true} />
    </>)
}

export default Profile;