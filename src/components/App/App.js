import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from '../Calendar/Calendar';
import Profile from '../Profile/Profile';
import Statistics from '../Statistics/Statistics';
import Today from '../Today/Today';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Privacy from '../Privacy/Privacy';
import PopupInfo from '../PopupInfo/PopupInfo';
import PopupLogout from '../PopupLogout/PopupLogout';
import PopupProfile from '../PopupProfile/PopupProfile';
import Note from '../Note/Note';
import LoadingView from '../LoadingView/LoadingView';
import WelcomePage from '../WelcomePage/WelcomePage';
import AboutProject from "../AboutProject/AboutProject";
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
import actionCreatorLoggedInAdmin from '../../store/actionCreators/actionCreatorLoggedInAdmin';
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
    actionCreatorLoggedInAdmin,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  // const [emotionList, setEmotionList] = useState([]);
  const [emotionToday, setEmotionToday] = useState({});
  const [selectedEmotion, setSelectedEmotion] = useState({
    text: '',
    isOpen: false,
  });
  const [profileInfoPhoneText, setProfileInfoPhoneText] = useState({
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
  const [isFirstAuth, setIsFirstAuth] = useState(false);

  function handleInfoClick(info) {
    setSelectedEmotion({
      text: info.text,
      isOpen: true,
    })
  }

  function handleInfoProfileClick() {
    setProfileInfoPhoneText({
      text: "Не обязательно для заполнения. В будущем планируется сервис, который будет предупреждать близких вам людей о проблемах в вашем эмоциональном состоянии, даже если вы будете не в силах об этом рассказать.",
      isOpen: true,
      }
    )
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

  function closePopupProfile() {
    setProfileInfoPhoneText({
      text: "Не обязательно для заполнения. В будущем планируется сервис, который будет предупреждать близких вам людей о проблемах в вашем эмоциональном состоянии, даже если вы будете не в силах об этом рассказать.",
      isOpen: false,
    })
  }

  function closePopupLogout() {
    setIsClickExit(false);
  }

  const navigate = useNavigate();

  // ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    setTimeout(() => {
      tokenCheck();
      setIsLoading(false);
    }, 1000)
  }, [])

  const tokenCheck = () => {
    api
      .checkToken()
      .then((res) => {
        if (res) {
          actionCreatorLoggedIn(true);
        } else {
          api.checkTokenAdmin()
            .then((res) => {
              if (res) actionCreatorLoggedInAdmin(true);
              else {
                actionCreatorLoggedIn(false);
                navigate("/sign-in", { replace: true });
              }
            })
        }
      })
      .catch((err) => {
        console.log(err);
        actionCreatorLoggedIn(false);
        actionCreatorLoggedInAdmin(false);
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
          actionCreatorEmotionList(emotion)
          setCurrentUser(info);
          const latestEmotion = emotion.find(item => {
            return Intl.DateTimeFormat('ru').format(item.date) === date ? item : undefined;
          })

          if (latestEmotion !== undefined) {
            const dateNow = Intl.DateTimeFormat('ru').format(latestEmotion.date);
            if (dateNow !== date) {
              createEmotionListToday();
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
          }

        })
        .catch(err => console.log(err));
    }


  }, [value_loggedIn, actionCreatorAnxiety, actionCreatorDepression, actionCreatorDespondency, actionCreatorIrritabillity, actionCreatorMania, actionCreatorPanic, actionCreatorEmotionList, actionCreatorText, createEmotionListToday, setEmotionToday]);

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
    setIsFirstAuth(true);
    api
      .register(password, login)
      .then((res) => {
        if (res) {
          setErrBadRequest(false);
          setConflictErr(false);
          handleSubmitAuth(password, login);
          navigate('/welcome', { replace: true });
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
        if (isFirstAuth) {
          navigate('/welcome', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
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
        actionCreatorLoggedInAdmin(false);
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

  useEffect(() => {
    if (!profileInfoPhoneText.isOpen) return;
    const handleEscapeClosePopup = (evt) => {
      if (evt.key === 'Escape') {
        setProfileInfoPhoneText({
          text: '',
          isOpen: false,
        });
      }
    }
    document.addEventListener('keydown', handleEscapeClosePopup);
    return () => {
      document.removeEventListener('keydown', handleEscapeClosePopup);
    }
  }, [profileInfoPhoneText]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        isLoading
          ? <LoadingView isLoading={isLoading} />
          : <div className={`app ${!isLoading ? 'app_active' : ''}`}>
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
                        setIsFirstAuth={setIsFirstAuth}
                      />
                    }
                  />
                }
                <Route
                    path="/privacy"
                    element={
                      <Privacy />
                    }
                />
                <Route
                  path="/about-project"
                  element={
                    <AboutProject auth={value_loggedIn ? false : true} />
                  }
                />
                <Route
                  path="/welcome"
                  element={
                    <ProtectedRoute
                      element={WelcomePage}
                      loggedIn={value_loggedIn}
                      isFirstAuth={isFirstAuth}
                    />
                  }
                />
                <Route
                  path="/test"
                  element={
                    <ProtectedRoute
                      element={WelcomePage}
                      loggedIn={value_loggedIn}
                      isFirstAuth={isFirstAuth}
                    />
                  }
                />
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
                      onClickPopup={handleInfoProfileClick}
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
                  path="/calendar/note"
                  element={
                    <ProtectedRoute
                      element={Note}
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
                      ? (!isFirstAuth
                            ? <Navigate to="/" replace />
                            : <Navigate to="/welcome" replace />  
                        )
                      : <Navigate to="/sign-in" replace />
                  }
                />
              </Routes>
              <PopupInfo onClose={closePopupInfo} emotion={selectedEmotion} />
              <PopupLogout onClose={closePopupLogout} onLogout={handleClearCookie} isOpen={isClickExit} />
              <PopupProfile onClose={closePopupProfile} popupProfile={profileInfoPhoneText} />
            </div>
      }
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
  actionCreatorLoggedIn: value => dispatch(actionCreatorLoggedIn(value)),
  actionCreatorLoggedInAdmin: value => dispatch(actionCreatorLoggedInAdmin(value))
})

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
))(App);
