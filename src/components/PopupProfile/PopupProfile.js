import React from "react";
import './PopupProfile.css';

function PopupProfile(props) {
  const handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }
  return (
    <section className={`popup-info-profile ${props.popupProfile.isOpen ? 'popup-info-profile_opened' : ''}`} onMouseDown={handleOverlayClosePopup}>
      <div className="popup-info-profile__container">
        <button className="popup-info-profile__close-button" type="button" onClick={() => props.onClose()}></button>
        <p className="popup-info-profile__text">{props.popupProfile.text}</p>
      </div>
    </section>
  )
}

export default PopupProfile;