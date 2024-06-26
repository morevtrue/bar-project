import React, { useState, useEffect, useCallback } from "react";
import './Char.css';
import { connect } from 'react-redux';
import { api } from "../../utils/Api";
import actionCreatorIrritabillity from '../../store/actionCreators/actionCreatorIrritabillity';
import actionCreatorMania from '../../store/actionCreators/actionCreatorMania';
import actionCreatorAnxiety from '../../store/actionCreators/actionCreatorAnxiety';
import actionCreatorPanic from '../../store/actionCreators/actionCreatorPanic';
import actionCreatorDespondency from '../../store/actionCreators/actionCreatorDespondency';
import actionCreatorDepression from '../../store/actionCreators/actionCreatorDepression';

function Char(props) {
  // const [isClickPopupButton, setIsClickPopupButton] = useState(false);
  const [clickedId, setClickedId] = useState(-1);
  const {
    value_irritabillity,
    value_mania,
    value_anxiety,
    value_panic,
    value_despondency,
    value_depression,
    actionCreatorIrritabillity,
    actionCreatorMania,
    actionCreatorAnxiety,
    actionCreatorPanic,
    actionCreatorDespondency,
    actionCreatorDepression
  } = props;

  function handleClickPopup() {
    props.onInfoClick(props.info);
  }

  function handleResponse(item) {
    props.setEmotionToday({
      irritabillity: item.irritabillity,
      mania: item.mania,
      anxiety: item.anxiety,
      panic: item.panic,
      despondency: item.despondency,
      depression: item.depression,
      _id: item._id
    })
  }

  const handleClick = (id, evt) => {
    setClickedId(id);
    if (props.card.id === 1) {
      actionCreatorMania(evt.target.value)
      api
        .updateEmotionState({
          mania: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    } else if (props.card.id === 2) {
      actionCreatorIrritabillity(evt.target.value);
      api
        .updateEmotionState({
          irritabillity: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    } else if (props.card.id === 3) {
      actionCreatorAnxiety(evt.target.value);
      api
        .updateEmotionState({
          anxiety: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    } else if (props.card.id === 4) {
      actionCreatorPanic(evt.target.value);
      api
        .updateEmotionState({
          panic: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    } else if (props.card.id === 5) {
      actionCreatorDespondency(evt.target.value);
      api
        .updateEmotionState({
          despondency: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    } else if (props.card.id === 6) {
      actionCreatorDepression(evt.target.value);
      api
        .updateEmotionState({
          depression: evt.target.value,
          emotionId: props.emotionToday._id,
        })
        .then(item => {
          handleResponse(item);
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    if (props.card.id === 1) {
      setClickedId(value_mania);
    }

    if (props.card.id === 2) {
      setClickedId(value_irritabillity);
    }

    if (props.card.id === 3) {
      setClickedId(value_anxiety);
    }

    if (props.card.id === 4) {
      setClickedId(value_panic);
    }

    if (props.card.id === 5) {
      setClickedId(value_despondency);
    }

    if (props.card.id === 6) {
      setClickedId(value_depression);
    }
  }, [props.card.id, value_anxiety, value_irritabillity, value_mania, value_despondency, value_panic, value_depression])

  return (
    <>
      <div className="char">
        <div className="char__text-content">
          <h2 className="char__title">{props.title}</h2>
          <button
            onClick={handleClickPopup}
            className="char__show-more-button">
          </button>
        </div>
        <ul className="char__buttons">
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(0, evt)}
              className={clickedId >= 0 ? 'char__button char__button_type_active' : 'char__button'}
              value={0}
            >
              0%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(20, evt)}
              className={clickedId >= 20 ? 'char__button char__button_type_active' : 'char__button'}
              value={20}
            >
              20%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(40, evt)}
              className={clickedId >= 40 ? 'char__button char__button_type_active' : 'char__button'}
              value={40}
            >
              40%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(60, evt)}
              className={clickedId >= 60 ? 'char__button char__button_type_active' : 'char__button'}
              value={60}
            >
              60%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(80, evt)}
              className={clickedId >= 80 ? 'char__button char__button_type_active' : 'char__button'}
              value={80}
            >
              80%
            </button>
          </li>
          <li className="char__item">
            <button
              onClick={(evt) => handleClick(100, evt)}
              className={clickedId >= 100 ? 'char__button char__button_type_active' : 'char__button'}
              value={100}
            >
              100%
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  value_irritabillity: state.value_irritabillity,
  value_mania: state.value_mania,
  value_anxiety: state.value_anxiety,
  value_panic: state.value_panic,
  value_despondency: state.value_despondency,
  value_depression: state.value_depression
})

const mapDispatchToProps = dispatch => ({
  actionCreatorIrritabillity: value => dispatch(actionCreatorIrritabillity(value)),
  actionCreatorMania: value => dispatch(actionCreatorMania(value)),
  actionCreatorAnxiety: value => dispatch(actionCreatorAnxiety(value)),
  actionCreatorDespondency: value => dispatch(actionCreatorDespondency(value)),
  actionCreatorPanic: value => dispatch(actionCreatorPanic(value)),
  actionCreatorDepression: value => dispatch(actionCreatorDepression(value))
})

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
))(Char);