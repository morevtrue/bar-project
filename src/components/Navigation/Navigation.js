import React, {useState, useEffect} from "react";
import './Navigation.css';
import { Link } from "react-router-dom";
import { ReactComponent as IconToday } from '../../images/icon-today.svg';
import { ReactComponent as IconCalendar } from '../../images/icon-calendar.svg';
import { ReactComponent as IconStat } from '../../images/icon-stat.svg';
import { ReactComponent as IconProfile } from '../../images/icon-profile.svg';
import { ReactComponent as IconInfo } from '../../images/icon-info-nav.svg';

function Navigation(props) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`
      navigation
      ${props.header ? 'navigation_type_header' : ''}
      ${props.footer ? 'navigation_type_footer' : ''}
    `}>
      <div className="navigation__menu">
        <ul className="navigation__menu-links">
          {
          width > 840 && 
          <li className="navigation__menu-item navigation__menu-item_type_test">
            <Link to="/" className={`navigation__menu-link navigation__menu-test ${props.today ? 'navigation__menu-link_type_active navigation__menu-link_type_active-test' : ''}`}>
              <p className="navigation__menu-text">Сегодня</p>
            </Link>
          </li>
        }
          <li className={`navigation__menu-item`}>
            <Link to="/calendar" className={`navigation__menu-link ${props.calendar ? 'navigation__menu-link_type_active' : ''}`}>
              {
                width < 841 ? <IconCalendar alt="иконка меню" className={`navigation__menu-img ${!props.calendar ? 'navigation__menu-inactive' : ''}`} /> :               <p className="navigation__menu-text">Календарь</p>
              }
            </Link>
          </li>
          <li className={`navigation__menu-item ${props.stat ? 'navigation__menu-item_type_active' : ''}`}>
            <Link to="/statistics" className={`navigation__menu-link ${props.stat ? 'navigation__menu-link_type_active' : ''}`}>
            {
                width < 841 ? <IconStat alt="иконка меню" className={`navigation__menu-img ${!props.stat ? 'navigation__menu-inactive' : ''}`} /> :               <p className="navigation__menu-text">Статистика</p>
              }
            </Link>
          </li>
          <li className={`navigation__menu-item ${props.profile ? 'navigation__menu-item_type_active' : ''}`}>
            <Link to="/profile" className={`navigation__menu-link ${props.profile ? 'navigation__menu-link_type_active' : ''}`}>
            {
                width < 841 ? <IconProfile alt="иконка меню" className={`navigation__menu-img ${!props.profile ? 'navigation__menu-inactive' : ''}`} /> :               <p className="navigation__menu-text">Профиль</p>
              }
            </Link>
          </li>
          <li className={`navigation__menu-item ${props.about_project ? 'navigation__menu-item_type_active' : ''}`}>
            <Link to="/about-project" className={`navigation__menu-link ${width < 841 ? 'navigation__menu-link-info' : '' } ${props.about_project ? 'navigation__menu-link_type_active' : ''}`}>
            {
                width < 841 ? <IconInfo alt="иконка меню" className={`navigation__menu-img ${!props.about_project ? 'navigation__menu-inactive' : ''}`} /> :               <p className="navigation__menu-text">О проекте</p>
              }
            </Link>
          </li>
        </ul>
        {
          width < 841 && <ul className="navigation__menu-links navigation__menu-links_type_test">
          <li className="navigation__menu-item navigation__menu-item_type_test">
            <Link to="/" className={`navigation__menu-link navigation__menu-test ${props.today ? 'navigation__menu-link_type_active navigation__menu-link_type_active-test' : ''}`}>
              <IconToday alt="иконка меню" className={`navigation__menu-img ${props.today ? 'navigation__menu-active-test' : ''}`} />
              <p className="navigation__menu-text">Сегодня</p>
            </Link>
          </li>
        </ul>
        }
      </div>
    </nav>
  )
}

export default Navigation;