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
        about_project={props.about_project}
      />
    </header>
  )
}

export default Header;