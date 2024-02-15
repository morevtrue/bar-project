import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from '../Calendar/Calendar';
import Profile from '../Profile/Profile';
import Statistics from '../Statistics/Statistics';
import Today from '../Today/Today';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupInfo from '../PopupInfo/PopupInfo';
import PopupLogout from '../PopupLogout/PopupLogout';
import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { date } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { connect } from 'react-redux';
import actionCreatorText from '../../store/actionCreators/actionCreatorText';
import actionCreatorIrritabillity from '../../store/actionCreators/actionCreatorIrritabillity';
import actionCreatorMania from '../../store/actionCreators/actionCreatorMania';
import actionCreatorAnxiety from '../../store/actionCreators/actionCreatorAnxiety';
import actionCreatorPanic from '../../store/actionCreators/actionCreatorPanic';
import actionCreatorDespondency from '../../store/actionCreators/actionCreatorDespondency';
import actionCreatorDepression from '../../store/actionCreators/actionCreatorDepression';
import actionCreatorEmotionList from '../../store/actionCreators/actionCreatorEmotionList';
import actionCreatorLoggedIn from '../../store/actionCreators/actionCreatorLoggedIn';
import { useCallback } from 'react';

function App(props) {
  const {
    value_irritabillity,
    value_mania,
    value_anxiety,
    value_panic,
    value_despondency,
    value_depression,
    value_text,
    value_loggedIn,
    actionCreatorIrritabillity,
    actionCreatorMania,
    actionCreatorAnxiety,
    actionCreatorPanic,
    actionCreatorDespondency,
    actionCreatorDepression,
    actionCreatorText,
    actionCreatorEmotionList,
    actionCreatorLoggedIn,
  } = props;

  const [currentUser, setCurrentUser] = useState({});
  // const [emotionList, setEmotionList] = useState([]);
  const [emotionToday, setEmotionToday] = useState({});
  const [selectedEmotion, setSelectedEmotion] = useState({
    text: '',
    isOpen: false,
  });
  const [isActiveButtonSubmit, setIsActiveButtonSubmit] = useState(true);
  const [isClickExit, setIsClickExit] = useState(false);
  const [conflictErr, setConflictErr] = useState(false);
  const [errUnathorized, setErrUnathorized] = useState(false);
  const [errBadRequestProfile, setErrBadRequestProfile] = useState(false);
  const [errBadRequest, setErrBadRequest] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [errEmailLogin, setErrEmailLogin] = useState('');

  function handleInfoClick(info) {
    setSelectedEmotion({
      text: info.text,
      isOpen: true,
    })
  }

  function handleLogoutClick() {
    setIsClickExit(true);
  }

  function closePopupInfo(emotion) {
    setSelectedEmotion({
      text: emotion.text,
      isOpen: false,
    });
  }

  function closePopupLogout() {
    setIsClickExit(false);
  }

  const navigate = useNavigate();

  // ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    api
      .checkToken()
      .then((res) => {
        if (res) {
          actionCreatorLoggedIn(true);
          // setIsLoggedIn(true);
        } else {
          // setIsLoggedIn(false);
          actionCreatorLoggedIn(false);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        // setIsLoggedIn(false);
        actionCreatorLoggedIn(false);
        navigate("/sign-in", { replace: true });
      })
  }

  // ПОЛУЧЕНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ 
  const createEmotionListToday = useCallback(() => {
    api
      .addNewEmotionState({
        irritabillity: 0,
        mania: 0,
        anxiety: 0,
        panic: 0,
        despondency: 0,
        depression: 0,
        text: '',
        date: Date.now(),
      })
      .then((emotion) => {
        setEmotionToday(emotion);
        actionCreatorIrritabillity(0);
        actionCreatorMania(0);
        actionCreatorAnxiety(0);
        actionCreatorPanic(0);
        actionCreatorDespondency(0);
        actionCreatorDepression(0);
        actionCreatorText('');
        api
          .getEmotionsState()
          .then(res => {
            actionCreatorEmotionList(res)
          })
          .catch(err => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [actionCreatorEmotionList, actionCreatorAnxiety, actionCreatorIrritabillity, actionCreatorMania, actionCreatorPanic, actionCreatorDespondency, actionCreatorDepression, actionCreatorText, setEmotionToday])

  useEffect(() => {
    if (value_loggedIn) {
      Promise.all([api.getEmotionsState(), api.getProfileContent()])
        .then(([emotion, info]) => {
          // setEmotionList(emotion);
          actionCreatorEmotionList(emotion)
          setCurrentUser(info);
          console.log(emotion)
          const latestEmotion = emotion.find(item => {
            return Intl.DateTimeFormat('ru').format(item.date) === date ? item : undefined;
          })

          // const latestEmotion = emotion.at(-1);

          if (latestEmotion !== undefined) {
            const dateNow = Intl.DateTimeFormat('ru').format(latestEmotion.date);
            // if (emotion.length === 0) {
            //   createEmotionListToday();
            // } else 
            if (dateNow !== date) {
              createEmotionListToday();
              console.log('tic1')
            } else if (dateNow === date) {
              setEmotionToday(emotion.at(-1));
              actionCreatorIrritabillity(latestEmotion.irritabillity);
              actionCreatorMania(latestEmotion.mania);
              actionCreatorAnxiety(latestEmotion.anxiety);
              actionCreatorPanic(latestEmotion.panic);
              actionCreatorDespondency(latestEmotion.despondency);
              actionCreatorDepression(latestEmotion.depression);
              actionCreatorText(latestEmotion.text);
            }
          } else {
            createEmotionListToday();
            console.log('tic2')
          }

        })
        .catch(err => console.log(err));
    }


  }, [value_loggedIn, actionCreatorAnxiety, actionCreatorDepression, actionCreatorDespondency, actionCreatorIrritabillity, actionCreatorMania, actionCreatorPanic, actionCreatorEmotionList, actionCreatorText, createEmotionListToday, setEmotionToday]);

  console.log(emotionToday)

  useEffect(() => {
    if (emotionToday !== undefined && value_loggedIn === true) {
      if (Intl.DateTimeFormat('ru').format(emotionToday.date) === date && (emotionToday.irritabillity !== value_irritabillity || emotionToday.mania !== value_mania || emotionToday.anxiety !== value_anxiety || emotionToday.panic !== value_panic || emotionToday.despondency !== value_despondency || emotionToday.depression !== value_depression || emotionToday.text !== value_text)) {
        api
          .getEmotionsState()
          .then(res => {
            actionCreatorEmotionList(res);
          })
          .catch(err => console.log(err));
      }
    }

  }, [actionCreatorEmotionList, value_irritabillity, value_mania, value_anxiety, value_panic, value_despondency, value_depression, value_text, emotionToday, value_loggedIn]);

  // РЕГИСТРАЦИЯ
  function handleSubmitRegister(password, login) {
    api
      .register(password, login)
      .then((res) => {
        navigate('/sign-in', { replace: true });
        if (res) {
          setErrBadRequest(false);
          setConflictErr(false);
          handleSubmitAuth(password, login);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 400) {
          setErrBadRequest(true);
        } else if (err === 409) {
          setConflictErr(true);
        }
        setErrEmail(login);
      });
  }

  // АВТОРИЗАЦИЯ
  function handleSubmitAuth(password, login) {
    api
      .authorization(password, login)
      .then((res) => {
        actionCreatorLoggedIn(true);
        // setIsLoggedIn(true);
        navigate('/', { replace: true })
        if (res) {
          setErrUnathorized(false);
          setErrBadRequestProfile(false);
        }
        return res;
      })
      .catch((err) => {
        if (err === 401) {
          setErrUnathorized(true);
        } else if (err === 400) {
          setErrBadRequestProfile(true);
        }
        setErrEmailLogin(login);
      })
  }

  // ОБНОВЛЕНИЕ ДАННЫХ ПРОФИЛЯ
  function handleUpdateUser(profileData) {
    api
      .submitProfileData(profileData)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsActiveButtonSubmit(true);
      });
  }

  // ОЧИСТКА КУК ПРИ ВЫХОДЕ
  const handleClearCookie = () => {
    api
      .clearCookie()
      .then(() => {
        // setIsLoggedIn(false);
        navigate('/sign-in', { replace: true });
        actionCreatorIrritabillity(0);
        actionCreatorMania(0);
        actionCreatorAnxiety(0);
        actionCreatorPanic(0);
        actionCreatorDespondency(0);
        actionCreatorDepression(0);
        actionCreatorText('');
        actionCreatorEmotionList([]);
        actionCreatorLoggedIn(false);
        setIsClickExit(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!selectedEmotion.isOpen) return;
    const handleEscapeClosePopup = (evt) => {
      if (evt.key === 'Escape') {
        setSelectedEmotion({
          text: selectedEmotion.text,
          isOpen: false,
        });
      }
    }
    document.addEventListener('keydown', handleEscapeClosePopup);
    return () => {
      document.removeEventListener('keydown', handleEscapeClosePopup);
    }
  }, [selectedEmotion]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          {
            !value_loggedIn && <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleSubmitAuth}
                  errUnathorized={errUnathorized}
                  errBadRequestLogin={errBadRequestProfile}
                  errEmailLogin={errEmailLogin}
                />
              }
            />
          }
          {
            !value_loggedIn && <Route
              path="/sign-up"
              element={
                <Register
                  conflictErr={conflictErr}
                  errBadRequest={errBadRequest}
                  onSubmit={handleSubmitRegister}
                  errEmail={errEmail}
                />
              }
            />
          }
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onLogoutProfile={isClickExit}
                loggedIn={value_loggedIn}
                isActiveButtonSubmit={isActiveButtonSubmit}
                setIsActiveButtonSubmit={setIsActiveButtonSubmit}
                onClickExit={handleLogoutClick}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                element={Calendar}
                emotionToday={emotionToday}
                // emotionList={emotionList}
                loggedIn={value_loggedIn}
              />
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute
                element={Statistics}
                // emotionList={emotionList}
                loggedIn={value_loggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Today}
                loggedIn={value_loggedIn}
                emotionToday={emotionToday}
                setEmotionToday={setEmotionToday}
                onInfoClick={handleInfoClick}
              />
            }
          />
          <Route
            path="*"
            element={
              value_loggedIn
                ? <Navigate to="/" replace />
                : <Navigate to="/sign-in" replace />
            }
          />
        </Routes>
        <PopupInfo onClose={closePopupInfo} emotion={selectedEmotion} />
        <PopupLogout onClose={closePopupLogout} onLogout={handleClearCookie} isOpen={isClickExit} />
      </div>
    </CurrentUserContext.Provider>
  );
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
  value_loggedIn: state.value_loggedIn,
})

const mapDispatchToProps = dispatch => ({
  actionCreatorIrritabillity: value => dispatch(actionCreatorIrritabillity(value)),
  actionCreatorMania: value => dispatch(actionCreatorMania(value)),
  actionCreatorAnxiety: value => dispatch(actionCreatorAnxiety(value)),
  actionCreatorDespondency: value => dispatch(actionCreatorDespondency(value)),
  actionCreatorPanic: value => dispatch(actionCreatorPanic(value)),
  actionCreatorDepression: value => dispatch(actionCreatorDepression(value)),
  actionCreatorText: value => dispatch(actionCreatorText(value)),
  actionCreatorEmotionList: value => dispatch(actionCreatorEmotionList(value)),
  actionCreatorLoggedIn: value => dispatch(actionCreatorLoggedIn(value))
})

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
))(App);
