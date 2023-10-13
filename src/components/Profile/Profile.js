import React from "react";
import './Profile.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Profile() {
  return (
    <>
      <Header profile={true} />
      <main className="profile">
        <div className="profile__content-sos">
          <p className="profile__button-text">Если вам нужна помощь, нажмите на кнопку ниже:</p>
          <button className="profile__button-sos"></button>
        </div>
        <form className="profile__form" name="profileForm">
          <h1 className="profile__form-title">Ваш профиль</h1>
          <label htmlFor="profile-input-name" className="profile__form-label">Имя</label>
          <input
            type="text"
            name="profileInputName"
            className="profile__form-input"
            id="profile-input-name"
            placeholder="Ваше имя..."
          />
          <div className="profile__form-fieldset">
            {/* <legend className="profile__form-legend">Пол</legend> */}
            <p className="profile__form-text-gender">Пол:</p>
            <div className="profile__form-gender">
              <label htmlFor="profile-input-radio-men" className="profile__form-label">Мужской</label>
              <input
                type="radio"
                name="profileInputRadio"
                className="profile__form-input"
                id="profile-input-radio-men"
              />
            </div>
            <div className="profile__form-gender">
              <label htmlFor="profile-input-radio-women" className="profile__form-label">Женский</label>
              <input
                type="radio"
                name="profileInputRadio"
                className="profile__form-input"
                id="profile-input-radio-women"
              />
            </div>
          </div>
          <label htmlFor="profile-input-phone" className="profile__form-label">Ваш телефон</label>
          <input
            type="tel"
            name="profileInputPhone"
            className="profile__form-input"
            id="profile-input-phone"
            placeholder="Ваш номер телефона..."
          />
          <label htmlFor="profile-input-otherPhone" className="profile__form-label">Телефон доверенного лица</label>
          <input
            type="tel"
            name="profileInputOtherPhone"
            className="profile__form-input"
            id="profile-input-otherPhone"
            placeholder="Телефон доверенного лица..."
          />
          <label htmlFor="profile-input-date" className="profile__form-label">Дата рождения</label>
          <input
            type="date"
            name="profileInputDate"
            className="profile__form-input"
            id="profile-input-date"
          />
          <button className="profile__button">Сохранить</button>
          <button className="profile__button profile__button_type_exit">Выйти из профиля</button>
        </form>
      </main>
      <Footer profile={true} />
    </>)
}

export default Profile;