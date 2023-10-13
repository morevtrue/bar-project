import React, { useState, useEffect, useCallback } from "react";
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
              // handleClickIrritabillity={props.handleClickIrritabillity}

              // irritabillityValue={props.irritabillityValue}
              text={card.text}
              title={card.title}
              key={card.id}
              card={card}
              setIrritabillity={props.setIrritabillity}
              setMania={props.setMania}
              setAnxiety={props.setAnxiety}
              setDespondency={props.setDespondency}
              setDepression={props.setDepression}
              setPanic={props.setPanic}
            // handleClick={handleClick}

            />
          ))
        }
      </main>
      <Footer today={true} />
    </>
  )
}

export default Today;