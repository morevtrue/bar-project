import React from "react";
import './PopupInfo.css';

function PopupInfo(props) {
  const handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget && props.emotion.isOpen) {
      props.onClose(props.emotion);
    }
  }

  return (
    <section className={`popup-info ${props.emotion.isOpen ? 'popup-info_opened' : ''}`} onMouseDown={handleOverlayClosePopup}>
      <div className="popup-info__container">
        <button className="popup-info__close-button" type="button" onClick={() => props.onClose(props.emotion)}></button>
        <p className="popup-info__text">{props.emotion.text}</p>
      </div>
    </section>
  )
}

export default PopupInfo;