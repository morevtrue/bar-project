import React, { useEffect, useState } from "react";
import './Calendar.css';
import Header from "../Header/Header";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import Footer from "../Footer/Footer";
import WheelOfLife from "../WheelOfLife/WheelOfLife";

function Calendar(props) {
  const {
    value_irritabillity,
    value_mania,
    value_anxiety,
    value_panic,
    value_despondency,
    value_depression,
    value_emotionList,
  } = props;
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru);
  const [emotionCurrent, setEmotionCurrent] = useState({
    irritabillity: value_irritabillity,
    mania: value_mania,
    anxiety: value_anxiety,
    panic: value_panic,
    despondency: value_despondency,
    depression: value_depression,
    date: new Date().toLocaleDateString(),
    _id: 0,
  });

  useEffect(() => {
    let currentDate = startDate.toLocaleDateString();
    const dateNow = new Date().toLocaleDateString();
    const dateEmotion = Intl.DateTimeFormat('ru').format(value_emotionList.at(-1).date);
    // const month = value_emotionList.at(-1).date.getFullYear()
    // console.log(month)

    if (dateEmotion !== currentDate) {
      setEmotionCurrent(value_emotionList.find(item => {
        return currentDate === Intl.DateTimeFormat('ru').format(item.date) && item;
      }))
    } else if (emotionCurrent === undefined && dateNow !== currentDate) {
      setEmotionCurrent({
        irritabillity: 0,
        mania: 0,
        anxiety: 0,
        panic: 0,
        despondency: 0,
        depression: 0,
        date: currentDate,
        _id: 0,
      })
    } else if (emotionCurrent === undefined && dateNow === currentDate) {
      setEmotionCurrent({
        irritabillity: value_irritabillity,
        mania: value_mania,
        anxiety: value_anxiety,
        panic: value_panic,
        despondency: value_despondency,
        depression: value_depression,
        date: currentDate,
        _id: 0,
      })
    } else if (emotionCurrent.date !== currentDate) {
      setEmotionCurrent({
        irritabillity: value_irritabillity,
        mania: value_mania,
        anxiety: value_anxiety,
        panic: value_panic,
        despondency: value_despondency,
        depression: value_depression,
        date: currentDate,
        _id: 0,
      })
    }
  }, [startDate, emotionCurrent, value_anxiety, value_depression, value_despondency, value_irritabillity, value_mania, value_panic, value_emotionList])


  return (
    <>
      <Header calendar={true} />
      <main className="calendar">
        <div className="calendar__container">
          <DatePicker
            locale="ru"
            selected={startDate}
            onChange={(date => setStartDate(date))}
            showDisabledMonthNavigation
            inline
          />
        </div>
        <WheelOfLife
          irritabillity={emotionCurrent !== undefined ? emotionCurrent.irritabillity : 0}
          mania={emotionCurrent !== undefined ? emotionCurrent.mania : 0}
          anxiety={emotionCurrent !== undefined ? emotionCurrent.anxiety : 0}
          panic={emotionCurrent !== undefined ? emotionCurrent.panic : 0}
          despondency={emotionCurrent !== undefined ? emotionCurrent.despondency : 0}
          depression={emotionCurrent !== undefined ? emotionCurrent.depression : 0}
        />
      </main>
      <Footer calendar={true} />
    </>
  )
}

const mapStateToProps = state => ({
  value_irritabillity: state.value_irritabillity,
  value_mania: state.value_mania,
  value_anxiety: state.value_anxiety,
  value_panic: state.value_panic,
  value_despondency: state.value_despondency,
  value_depression: state.value_depression,
  value_emotionList: state.value_emotionList
})

export default connect(
  mapStateToProps,
)(Calendar);