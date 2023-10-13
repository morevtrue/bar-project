import React, { useEffect, useState } from "react";
import './Calendar.css';
import Header from "../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import Footer from "../Footer/Footer";
import WheelOfLife from "../WheelOfLife/WheelOfLife";

function Calendar(props) {
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ru', ru)

  return (
    <>
      <Header calendar={true} />
      <main className="calendar">
        <div className="calendar__container">
          <DatePicker
            locale="ru"
            selected={startDate}
            // className="calendar__month"
            onChange={(date => setStartDate(date))}
            showDisabledMonthNavigation
            inline
          />
        </div>
        <WheelOfLife
          irritabillity={props.irritabillity}
          mania={props.mania}
          anxiety={props.anxiety}
          despondency={props.despondency}
          depression={props.depression}
          panic={props.panic}
        />
        {/* <div className="calendar__data">
          <div className="calendar__wheel-life">
            <div className="calendar__wheel-75 calendar__wheel-life_type_anxiety">
              <div className="calendar__wheel-50 calendar__wheel-life_type_mania">
                <div className="calendar__wheel-25">
                  <div className="
                  calendar__wheel-0
                  "
                  ></div>
                </div>

              </div>

            </div>
          </div>

        </div> */}
      </main>
      <Footer calendar={true} />
    </>
  )
}

export default Calendar;