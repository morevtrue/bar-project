import React, { useState, useEffect } from "react";
import './Statistics.css';
import Header from "../Header/Header";
import WheelOfLife from "../WheelOfLife/WheelOfLife";
import GraphicStateEkzogenic from "../GraphicStateEkzogenic/GraphicStateEkzogenic";
import GraphicStateEndogenic from "../GraphicStateEndogenic/GraphicStateEndogenic";
import Footer from "../Footer/Footer";
import { currentMonth } from "../../utils/constants";
import { currentYear } from "../../utils/constants";
import { months } from "../../utils/constants";

function Statistics() {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear)

  function handleClickNextMonth() {
    setMonth(month + 1);
  }

  function handleClickLatestMonth() {
    setMonth(month - 1);
  }

  useEffect(() => {
    if (month > 11) {
      setYear(year + 1)
      setMonth(0);
    } else if (month < 0) {
      setYear(year - 1);
      setMonth(11);
    }
  })

  return (
    <>
      <Header stat={true} />
      <main className="statistics">
        <div className="statistics__month">
          <button className="statistics__month-latest" onClick={handleClickLatestMonth}></button>
          <h1 className="statistics__month-name">
            {months[month]} {year}
          </h1>
          <button className="statistics__month-next" onClick={handleClickNextMonth}></button>
        </div>
        <div className="statistics__data">
          <WheelOfLife isStat={true} />
          <div className="statistics__graphics">
            <h1 className="statistics__graphic-name">Экзогенное состояние</h1>
            <GraphicStateEkzogenic />
            <h2 className="statistics__graphic-name">Эндогенное состояние</h2>
            <GraphicStateEndogenic />
          </div>
        </div>
      </main>
      <Footer stat={true} />
    </>)
}

export default Statistics;