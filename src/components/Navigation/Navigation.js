import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
import iconToday from '../../images/icon-today.png';
import iconCalendar from '../../images/icon-calendar.png';
import iconStat from '../../images/icon-stat.png';
import iconProfile from '../../images/icon-profile.png';

function Navigation(props) {
  return (
    <nav className={`
      navigation
      ${props.header ? 'navigation_type_header' : ''}
      ${props.footer ? 'navigation_type_footer' : ''}
    `}>
      <ul className="navigation__menu-links">
        <li className={`navigation__menu-item ${props.today ? 'navigation__menu-item_type_active' : ''}`}>
          <Link to="/" className={`navigation__menu-link ${props.today ? 'navigation__menu-link_type_active' : ''}`}>
            <img src={iconToday} alt="иконка меню" className="navigation__menu-img" />
            Сегодня
          </Link>
        </li>
        <li className={`navigation__menu-item ${props.calendar ? 'navigation__menu-item_type_active' : ''}`}>
          <Link to="/calendar" className={`navigation__menu-link ${props.calendar ? 'navigation__menu-link_type_active' : ''}`}>
            <img src={iconCalendar} alt="иконка меню" className="navigation__menu-img" />
            Календарь
          </Link>
        </li>
        <li className={`navigation__menu-item ${props.stat ? 'navigation__menu-item_type_active' : ''}`}>
          <Link to="/statistics" className={`navigation__menu-link ${props.stat ? 'navigation__menu-link_type_active' : ''}`}>
            <img src={iconStat} alt="иконка меню" className="navigation__menu-img" />
            Статистика
          </Link>
        </li>
        <li className={`navigation__menu-item ${props.profile ? 'navigation__menu-item_type_active' : ''}`}>
          <Link to="/profile" className={`navigation__menu-link ${props.profile ? 'navigation__menu-link_type_active' : ''}`}>
            <img src={iconProfile} alt="иконка меню" className="navigation__menu-img" />
            Профиль
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;