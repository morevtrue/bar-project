import React from "react";
import './Footer.css';
import Navigation from "../Navigation/Navigation";

function Footer(props) {
  return (
    <footer className="footer">
      <Navigation
        footer={true}
        today={props.today}
        calendar={props.calendar}
        stat={props.stat}
        profile={props.profile}
      />
    </footer>
  )
}

export default Footer;