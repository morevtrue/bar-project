import React, { useEffect, useState } from "react";
import './Calendar.css';
import Header from "../Header/Header";
import ShareButton from "../ShareButton/ShareButton";
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import Footer from "../Footer/Footer";
import WheelOfLife from "../WheelOfLife/WheelOfLife";
import { Link } from 'react-router-dom';
import actionCreatorDate from "../../store/actionCreators/actionCreatorDate";
import actionCreatorEmotionList from "../../store/actionCreators/actionCreatorEmotionList";


function Calendar(props) {
  const {
    value_emotionList,
    actionCreatorDate,
    actionCreatorEmotionList,
  } = props;
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru);
  const [emotionCurrent, setEmotionCurrent] = useState({});

  useEffect(() => {
    let currentDate = startDate.toLocaleDateString();
    const emotion = value_emotionList.find(item => {
      return currentDate === Intl.DateTimeFormat('ru').format(item.date) && item;
    })
    actionCreatorDate(currentDate);
    setEmotionCurrent(emotion);
  }, [startDate, value_emotionList, actionCreatorEmotionList])

  return (
    <>
      <Header calendar={true} />
      <main className="calendar">
        <section className="calendar__container">
          <DatePicker
            locale="ru"
            selected={startDate}
            onChange={(date => setStartDate(date))}
            showDisabledMonthNavigation
            inline
          />
        </section>
        <WheelOfLife
          paddingRight={20}
          irritabillity={emotionCurrent !== undefined ? emotionCurrent.irritabillity : 0}
          mania={emotionCurrent !== undefined ? emotionCurrent.mania : 0}
          anxiety={emotionCurrent !== undefined ? emotionCurrent.anxiety : 0}
          panic={emotionCurrent !== undefined ? emotionCurrent.panic : 0}
          despondency={emotionCurrent !== undefined ? emotionCurrent.despondency : 0}
          depression={emotionCurrent !== undefined ? emotionCurrent.depression : 0}
        />
        <div className="calendar__buttons">
          {emotionCurrent !== undefined ? (emotionCurrent.text === '' ? <Link to="/calendar/note" className="calendar__button">Создать заметку</Link> : <div className="calendar__note">
            <h2 className="calendar__note-title">Заметка: {startDate.toLocaleDateString()}</h2>
            <Link to="/calendar/note" className="calendar__note-edit"></Link>
          </div>) : <div className="calendar__note">
            <h2 className="calendar__note-title">Нет заметок</h2>
          </div>}
          <ShareButton 
              label="Поделиться"
              title="Поделиться состоянием"
              text="Вы можете отправить скрин вашего текущего состояния доверенному лицу"
          />
        </div>
            
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
  value_text: state.value_text,
  value_emotionList: state.value_emotionList,
  value_date: state.value_date
})

const mapDispatchToProps = dispatch => ({
  actionCreatorDate: value => dispatch(actionCreatorDate(value)),
  actionCreatorEmotionList: value => dispatch(actionCreatorEmotionList(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);