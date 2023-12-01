import React, { useState } from "react";
import './Today.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Char from "../Char/Char";
import { infoData } from "../../utils/constants";
import { date } from "../../utils/constants";

function Today(props) {

  return (
    <>
      <Header isToday={true} today={true} />
      <main className="today">
        <h1 className="today__title">Сегодня: {date}</h1>
        <p className="today__text">Как ваше самочувствие?</p>
        {
          infoData.map(card => (
            <Char
              name={card.name}
              text={card.text}
              info={card}
              title={card.title}
              key={card.id}
              card={card}
              emotionToday={props.emotionToday}
              setEmotionToday={props.setEmotionToday}
              isClosePopup={false}
              onInfoClick={props.onInfoClick}
            />
          ))
        }
      </main>
      <Footer today={true} />
    </>
  )
}

export default Today;