import React from "react";
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
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