import React, { useState, useEffect, useCallback, useMemo } from "react";
import './Char.css';
import { infoData } from "../../utils/constants";
import ButtonPercent from "../ButtonPercent/ButtonPercent";
// import iconInfo from '../../images/icon-info.svg';

function Char(props) {
  const [isClickPopupButton, setIsClickPopupButton] = useState(false);
  const [clickedId, setClickedId] = useState(-1);
  // const buttonList = ['0%', '25%', '50%', '75%', '100%'];

  const handleClick = (id) => {
    setClickedId(id);
  }

  useEffect(() => {
    console.log(clickedId)
    if (props.card.id === 1) {
      props.setIrritabillity(clickedId + 1);
      // localStorage.setItem('irritabillity-value', props.irritabillity)
      // props.irritabillityValue(props.clickedId + 1)
    }
    console.log(props.irritabillityValue)

    if (props.card.id === 2) {
      props.setMania(clickedId + 1)
    }

    if (props.card.id === 3) {
      props.setAnxiety(clickedId + 1)
    }

    if (props.card.id === 4) {
      props.setPanic(clickedId + 1)
    }

    if (props.card.id === 5) {
      props.setDespondency(clickedId + 1)
    }

    if (props.card.id === 6) {
      props.setDepression(clickedId + 1)
    }
  })

  // const closeOverlay = useEffect(() => {
  //   const button = Array.from(document.querySelectorAll('.char__show-more-button'));
  //   const handleOverlayClosePopup = (evt, button) => {
  //     if (evt.target !== evt.currentTarget && button !== evt.currentTarget && isClickPopupButton) {
  //       handleSwitchStatePopupInfo();
  //     }
  //   }

  //   button.forEach((button, evt) => {
  //     handleOverlayClosePopup(evt, button);
  //     document.addEventListener('mousedown', handleOverlayClosePopup);
  //   })

  //   return () => {
  //     document.removeEventListener('mousedown', handleOverlayClosePopup);
  //   }
  // }, [handleSwitchStatePopupInfo, isClickPopupButton])

  const handleSwitchStatePopupInfo = useCallback(() => {
    console.log('t')
    console.log(isClickPopupButton)
    if (isClickPopupButton) {
      setIsClickPopupButton(false);
    } else {
      setIsClickPopupButton(true);
    }
  }, [isClickPopupButton])


  useEffect(() => {
    if (!isClickPopupButton) return;
    const handleEscapeClosePopup = (evt) => {
      if (evt.key === 'Escape') {
        handleSwitchStatePopupInfo();
      }
    }
    document.addEventListener('keydown', handleEscapeClosePopup);
    return () => {
      document.removeEventListener('keydown', handleEscapeClosePopup);
    }
  }, [isClickPopupButton, handleSwitchStatePopupInfo]);

  return (
    <>
      <div className="char">
        <div className="char__text-content">
          <h2 className="char__title">{props.title}</h2>
          <button
            onClick={handleSwitchStatePopupInfo}
            className="char__show-more-button">
          </button>
          <div className={`char__popup ${isClickPopupButton ? 'char__popup_opened' : ''}`}>
            <p className="char__popup-text">{props.text}</p>
          </div>
        </div>
        <ul className="char__buttons">
          <li className="char__item">
            <button
              onClick={() => handleClick(0)}
              className={clickedId === 0 ? 'char__button char__button_type_active' : 'char__button'}>
              0%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={() => handleClick(1)}
              className={clickedId === 1 ? 'char__button char__button_type_active' : 'char__button'}>
              25%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={() => handleClick(2)}
              className={clickedId === 2 ? 'char__button char__button_type_active' : 'char__button'}>
              50%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={() => handleClick(3)}
              className={clickedId === 3 ? 'char__button char__button_type_active' : 'char__button'}>
              75%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={() => handleClick(4)}
              className={clickedId === 4 ? 'char__button char__button_type_active' : 'char__button'}>
              100%
            </button>
          </li>
          {/* {
            buttonList.map((button, index) => (
              <ButtonPercent
                // handleClickIrritabillity={props.handleClickIrritabillity}
                // irritabillityValue={props.irritabillityValue}
                key={index}
                button={button}
                buttonId={index}
                cardId={props.card.id}
                handleClick={handleClick}
                clickedId={clickedId}
                setIrritabillity={props.setIrritabillity}
                setMania={props.setMania}
                setAnxiety={props.setAnxiety}
                setDespondency={props.setDespondency}
                setDepression={props.setDepression}
                setPanic={props.setPanic}

              />
            ))
          } */}
        </ul>
      </div>
    </>
  )
}

export default Char;