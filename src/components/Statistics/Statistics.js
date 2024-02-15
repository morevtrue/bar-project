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
import { connect } from 'react-redux';

function Statistics(props) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [fullMonth, setFullMonth] = useState();
  const [summIrritabillity, setSummIrritabillity] = useState(0);
  const [summMania, setSummMania] = useState(0);
  const [summAnxiety, setSummAnxiety] = useState(0);
  const [summPanic, setSummPanic] = useState(0);
  const [summDespondency, setSummDespondency] = useState(0);
  const [summDepression, setSummDepression] = useState(0);
  const [dayCountEkzogenic, setDayCountEkzogenic] = useState([]);
  const [dayCountEndogenic, setDayCountEndogenic] = useState([]);
  const {
    value_emotionList
  } = props;

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

    if (month < 9) {
      setFullMonth(`0${month + 1}`);
    } else {
      setFullMonth(`${month + 1}`);
    }

    const currentArr = value_emotionList !== [] && value_emotionList.filter(item => {
      const fullDate = Intl.DateTimeFormat('ru').format(item.date);
      return fullDate.includes(`${fullMonth}.${year}`)
    });

    const irritabillityCount = currentArr.filter(item => {
      return item.irritabillity !== 0
    })

    const maniaCount = currentArr.filter(item => {
      return item.mania !== 0
    })

    const anxietyCount = currentArr.filter(item => {
      return item.anxiety !== 0
    })

    const panicCount = currentArr.filter(item => {
      return item.panic !== 0
    })

    const despondencyCount = currentArr.filter(item => {
      return item.despondency !== 0
    })

    const depressionCount = currentArr.filter(item => {
      return item.depression !== 0
    })

    setDayCountEkzogenic(currentArr.map(item => {
      const summ = {
        date: item.date,
        count: item.irritabillity + item.despondency + item.anxiety
      }
      return summ
    }))

    setDayCountEndogenic(currentArr.map(item => {
      const summ = {
        date: item.date,
        count: item.mania + item.depression + item.panic
      }
      return summ
    }))

    setSummIrritabillity(currentArr.reduce(
      (summ, item) => summ + item.irritabillity, 0
    ) / irritabillityCount.length);

    setSummMania(currentArr.reduce(
      (summ, item) => summ + item.mania, 0
    ) / maniaCount.length);

    setSummAnxiety(currentArr.reduce(
      (summ, item) => summ + item.anxiety, 0
    ) / anxietyCount.length);

    setSummPanic(currentArr.reduce(
      (summ, item) => summ + item.panic, 0
    ) / panicCount.length);

    setSummDespondency(currentArr.reduce(
      (summ, item) => summ + item.despondency, 0
    ) / despondencyCount.length);

    setSummDepression(currentArr.reduce(
      (summ, item) => summ + item.depression, 0
    ) / depressionCount.length)

  }, [fullMonth, month, value_emotionList, year])


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
          <WheelOfLife isStat={true}
            irritabillity={Math.floor(summIrritabillity)}
            mania={Math.floor(summMania)}
            anxiety={Math.floor(summAnxiety)}
            panic={Math.floor(summPanic)}
            despondency={Math.floor(summDespondency)}
            depression={Math.floor(summDepression)}
          />
          <div className="statistics__graphics">
            <h1 className="statistics__graphic-name">Уровень психических проблем</h1>
            <GraphicStateEkzogenic
              month={month}
              year={year}
              dayCountEkzogenic={dayCountEkzogenic}
            />
            <h2 className="statistics__graphic-name">Уровень физиологических проблем</h2>
            <GraphicStateEndogenic
              month={month}
              year={year}
              dayCountEndogenic={dayCountEndogenic}
            />
          </div>
        </div>
      </main>
      <Footer stat={true} />
    </>)
}

const mapStateToProps = state => ({
  value_emotionList: state.value_emotionList,
  value_irritabillity: state.value_irritabillity,
  value_mania: state.value_mania,
  value_anxiety: state.value_anxiety,
  value_panic: state.value_panic,
  value_despondency: state.value_despondency,
  value_depression: state.value_depression
})

export default connect(
  mapStateToProps,
)(Statistics);