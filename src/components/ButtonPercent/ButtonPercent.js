import React, { useState, useEffect } from "react";
import './ButtonPercent.css';

function ButtonPercent(props) {

  useEffect(() => {
    if (props.cardId === 1) {
      props.setIrritabillity(props.clickedId + 1);
    }

    if (props.cardId === 2) {
      props.setMania(props.clickedId + 1)
    }

    if (props.cardId === 3) {
      props.setAnxiety(props.clickedId + 1)
    }

    if (props.cardId === 4) {
      props.setPanic(props.clickedId + 1)
    }

    if (props.cardId === 5) {
      props.setDespondency(props.clickedId + 1)
    }

    if (props.cardId === 6) {
      props.setDepression(props.clickedId + 1)
    }
  })

  return (
    <li className="char__item" key={props.buttonId}>
      <button
        key={props.buttonId}
        onClick={() => props.handleClick(props.buttonId)}
        className={props.buttonId === props.clickedId ? 'char__button char__button_type_active' : 'char__button'}>
        {props.button}
      </button>
    </li>
  )
}

export default ButtonPercent;