import React from "react";
import './PopupDeleteUser.css';

function PopupDeleteUser(props) {
  const handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  function onDelete() {
    props.onDelete();
  }

  return (
    <section className={`popup-delete ${props.isOpen ? 'popup-delete_opened' : ''}`} onMouseDown={handleOverlayClosePopup}>
      <div className="popup-delete__container">
        <button className="popup-delete__close-button" type="button" onClick={() => props.onClose()}></button>
        <div className="popup-delete__content">
          <p className="popup-delete__text">
            Вы точно хотите удалить пользователя?
          </p>
          <div className="popup-delete__buttons">
            <button className={`popup-delete__button ${props.isOpen ? 'popup-delete__button_type_active' : ''}`} onClick={onDelete}>Да</button>
            <button className={`popup-delete__button ${props.isOpen ? 'popup-delete__button_type_active' : ''}`} onClick={props.onClose}>Нет</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopupDeleteUser;