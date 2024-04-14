import React, { useEffect, useState } from "react";
import { api } from "../../utils/Api";
import { connect } from 'react-redux';
import actionCreatorText from "../../store/actionCreators/actionCreatorText";
import actionCreatorEmotionList from "../../store/actionCreators/actionCreatorEmotionList";
import { date } from '../../utils/constants';
import './Note.css';
import { Link } from 'react-router-dom';


function Note(props) {
  const {
    value_emotionList,
    value_text,
    value_date,
    actionCreatorText,
    actionCreatorEmotionList
  } = props;
  const [inputText, setInputText] = useState(value_text || '');
  const [emotionCurrent, setEmotionCurrent] = useState({});
  const [buttonText, setButtonText] = useState('Сохранить');
  const [isSaveButton, setIsSaveButton] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
      api.getEmotionsState()
        .then((emotion) => {
          const latestEmotion = emotion.find(item => {
            return Intl.DateTimeFormat('ru').format(item.date) === date ? item : undefined;
          })

          if (latestEmotion !== undefined) {
            const dateNow = Intl.DateTimeFormat('ru').format(latestEmotion.date);
            if (dateNow !== value_date) {
              api
                .getEmotionsState()
                .then(res => {
                  actionCreatorEmotionList(res)
                })
                .catch(err => console.log(err));
            } else if (dateNow === value_date) {
              actionCreatorText(latestEmotion.text);
            }
          } 
        })
        .catch(err => console.log(err));


  }, [actionCreatorText]);

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
      })
      .then(() => {
        api
          .getEmotionsState()
          .then(res => {
            actionCreatorEmotionList(res)
          })
          .catch(err => console.log(err));
      })
      .finally(() => {
        setButtonText('Заметка сохранена!');
        setIsSaveButton(true);
      })
  }

  useEffect(() => {
    let currentDate = value_date;
    const emotion = value_emotionList.find(item => {
      return currentDate === Intl.DateTimeFormat('ru').format(item.date) && item;
    })
    setEmotionCurrent(emotion);
    if (emotion !== undefined) {
      setInputText(emotion.text);
    }
  }, [value_date, value_emotionList]);

  return (
    <>
      <form className={`note__form ${emotionCurrent !== undefined ? 'note__form_type_active' : ''}`} name="noteForm" onSubmit={handleSubmitText}>
        <div className="note__form-buttons">
          <Link to="/calendar" className="note__form-button-back"></Link>
          <button className={`note__form-button ${isSaveButton ? 'note__form-button_type_save' : ''}`} disabled={isSaveButton}>
            {buttonText}
          </button>
        </div>
        <h2 className="note__form-title">
          Заметка
        </h2>
        <p className="note__form-date">
          {value_date === startDate.toLocaleDateString() ? `Сегодня: ${value_date}` : `${value_date}`}
        </p>
        <textarea
          type="text"
          name="noteFormInput"
          className="note__form-input"
          id="note-form-input"
          placeholder="Напишите вашу заметку здесь..."
          value={inputText || ''}
          onChange={handleChangeInput}
        />
      </form>
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
  actionCreatorText: value => dispatch(actionCreatorText(value)),
  actionCreatorEmotionList: value => dispatch(actionCreatorEmotionList(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Note);