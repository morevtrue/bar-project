import React from "react";
import './Header.css';
import logo from '../../images/logo.png';
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип сайта" className={`header__logo ${props.isToday ? 'header__logo_type_active' : ''}`} />
      <Navigation
        header={true}
        today={props.today}
        calendar={props.calendar}
        stat={props.stat}
        profile={props.profile}
      />
    </header>
  )
}

export default Header;