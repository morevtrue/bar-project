import React, {useState, useEffect} from "react";
import './WelcomePage.css';
import imageFirst from '../../images/image-1.png';
import imageSecond from '../../images/image-2.png';
import imageThird from '../../images/image-3.png';
import imageFourth from '../../images/image-4.png';
import { useNavigate } from 'react-router-dom';

function WelcomePage(props) {
  const imageArr = [imageFirst, imageSecond, imageThird, imageFourth];
  const textArr = [
    'Отмечайте важные особенности каждый день',
    'Регулируйте свою жизнь',
    'Следите за своим состоянием',
    'Получайте экспертную поддержку',
  ]
  const [click, setClick] = useState(0);
  const navigate = useNavigate();

  const handleClickButtonNext = () => {
    if (click === 0) {
      setClick(1);
    } else if (click === 1) {
      setClick(2);
    } else if (click === 2) {
      setClick(3);
    } else if (click === 3) {
      navigate('/', { replace: true });
    }
  }

  const handleClickButtonExit = () => {
    navigate('/', { replace: true });
  }

  return (
    <section className="welcome-page">
      <div className="welcome-page__content">
        <button onClick={handleClickButtonExit} className="welcome-page__button-exit">
          Пропустить
        </button>
        <img src={imageArr[click]} alt="изображение приветствия" className="welcome-page__image" />
      </div>
      <h1 className="welcome-page__title">
        {textArr[click]}
      </h1>
      <div className="welcome-page__footer-content">
        <button onClick={handleClickButtonNext} className="welcome-page__button-next">{click !== 3 ? 'Дальше' : 'Войти'}</button>
        <div className="welcome-page__points">
          <span className={`welcome-page__point ${click === 0 ? 'welcome-page__point_active' : ''}`}></span>
          <span className={`welcome-page__point ${click === 1 ? 'welcome-page__point_active' : ''}`}></span>
          <span className={`welcome-page__point ${click === 2 ? 'welcome-page__point_active' : ''}`}></span>
          <span className={`welcome-page__point ${click === 3 ? 'welcome-page__point_active' : ''}`}></span>
        </div>
      </div>
    </section>
  )
}

export default WelcomePage;