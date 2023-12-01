import React from "react";
import './PopupLogout.css';

function PopupLogout(props) {
  const handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  function signOut() {
    props.onLogout();
  }

  return (
    <section className={`popup-logout ${props.isOpen ? 'popup-logout_opened' : ''}`} onMouseDown={handleOverlayClosePopup}>
      <div className="popup-logout__container">
        <button className="popup-logout__close-button" type="button" onClick={() => props.onClose(props.emotion)}></button>
        <div className="popup-logout__content">
          <p className="popup-logout__text">
            Вы точно хотите выйти?
          </p>
          <div className="popup-logout__buttons">
            <button className={`popup-logout__button ${props.isOpen ? 'popup-logout__button_type_active' : ''}`} onClick={signOut}>Да</button>
            <button className={`popup-logout__button ${props.isOpen ? 'popup-logout__button_type_active' : ''}`} onClick={props.onClose}>Нет</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopupLogout;