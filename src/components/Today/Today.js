import React from "react";
import './Today.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Char from "../Char/Char";
import { infoData } from "../../utils/constants";
import { date } from "../../utils/constants";
import ShareButton from "../ShareButton/ShareButton";

function Today(props) {

  return (
    <>
      <Header
        today={true} />
      <main className="today">
        <div className="today__content">
          <h1 className="today__title">Как ваше самочувствие?</h1>
          <p className="today__text">Сегодня: {date}</p>
        </div>
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
        <ShareButton 
            label="Поделиться"
            title="Поделиться состоянием"
            text="Вы можете отправить скрин вашего текущего состояния доверенному лицу"
        />
      </main>
      <Footer today={true} />
    </>
  )
}

export default Today;