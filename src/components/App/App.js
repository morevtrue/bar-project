import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { createStore, combine, createEvent } from 'effector';
import { useUnit } from 'effector-react';
import './App.css';
import Calendar from '../Calendar/Calendar';
import Profile from '../Profile/Profile';
import Statistics from '../Statistics/Statistics';
import Today from '../Today/Today';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const [irritabillity, setIrritabillity] = useState(1);
  const [mania, setMania] = useState(1);
  const [anxiety, setAnxiety] = useState(1);
  const [panic, setPanic] = useState(1);
  const [despondency, setDespondency] = useState(1);
  const [depression, setDepression] = useState(1);
  const [loggedIn, setLoggedIn] = useState(true);

  // const $irritabillityStore = createStore(0);
  // const irritabillityValue = createEvent();

  // $irritabillityStore.on(irritabillityValue, (state, data) => data)

  // $irritabillityStore.watch(value => {
  //   console.log(value);
  // })

  // // const { value } = useUnit({
  //   value: $irritabillityStore,
  // })
  // const handleClickIrritabillity = useUnit(irritabillityValue);

  // console.log(irritabillityValue)

  return (
    <div className="app">
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Login />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route
          path="/calendar"
          element={
            <Calendar
              irritabillity={irritabillity}
              mania={mania}
              anxiety={anxiety}
              despondency={despondency}
              depression={depression}
              panic={panic}
            />
          }
        />
        <Route
          path="/statistics"
          element={
            <Statistics
              irritabillity={irritabillity}
              mania={mania}
              anxiety={anxiety}
              despondency={despondency}
              depression={depression}
              panic={panic}
            />
          }
        />
        <Route
          path="/"
          element={
            <Today
              setIrritabillity={setIrritabillity}
              setMania={setMania}
              setAnxiety={setAnxiety}
              setDespondency={setDespondency}
              setDepression={setDepression}
              setPanic={setPanic}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
