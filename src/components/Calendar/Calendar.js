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
import { api } from "../../utils/Api";
import ShareButton from "../ShareButton/ShareButton";

function Calendar(props) {
  const {
    value_emotionList,
    value_text,
  } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [inputText, setInputText] = useState(value_text || '');
  registerLocale('ru', ru);
  const [emotionCurrent, setEmotionCurrent] = useState({});
  const [buttonText, setButtonText] = useState('Сохранить заметку');
  const [isSaveButton, setIsSaveButton] = useState(false);

  function handleChangeInput(evt) {
    setInputText(evt.target.value);
  }

  useEffect(() => {
    if (inputText !== value_text) {
      setIsSaveButton(false);
      setButtonText('Сохранить заметку');
    }
  }, [inputText, value_text])

  function handleSubmitText(evt) {
    evt.preventDefault();
    setButtonText('Подождите...')
    api.
      updateEmotionState({
        text: inputText,
        emotionId: emotionCurrent._id,
      }).finally(() => {
        setButtonText('Заметка сохранена!');
        setIsSaveButton(true);
      })
  }

  useEffect(() => {
    let currentDate = startDate.toLocaleDateString();
    const emotion = value_emotionList.find(item => {
      return currentDate === Intl.DateTimeFormat('ru').format(item.date) && item;
    })
    setEmotionCurrent(emotion);
    if (emotion !== undefined) {
      setInputText(emotion.text);
    }
  }, [startDate, value_emotionList])
  console.log(emotionCurrent)

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
        <form className={`calendar__form ${emotionCurrent !== undefined ? 'calendar__form_type_active' : ''}`} name="calendarForm" onSubmit={handleSubmitText}>
          <h2 className="calendar__form-title">
            Ваша заметка в этот день:
          </h2>
          <textarea
            type="text"
            name="calendarFormInput"
            className="calendar__form-input"
            id="calendar-form-input"
            placeholder="Напишите свою заметку здесь..."
            value={inputText || ''}
            onChange={handleChangeInput}
          />
          <button className={`calendar__form-button ${isSaveButton ? 'calendar__form-button_type_save' : ''}`} disabled={isSaveButton}>
            {buttonText}
          </button>
        </form>
        <ShareButton />
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
  value_emotionList: state.value_emotionList
})

export default connect(
  mapStateToProps,
)(Calendar);