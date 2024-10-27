import React, {useState, useEffect} from "react";
import imageFirst from '../../images/image-1.png';
import imageSecond from '../../images/image-2.png';
import imageThird from '../../images/image-3.png';
import imageFourth from '../../images/image-4.png';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './WelcomePage.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


function WelcomePage() {

  const sliderArr = [
    {
      src: imageFirst,
      text: 'Отмечайте важные особенности каждый день',
    },
    {
      src: imageSecond,
      text: 'Регулируйте свою жизнь',
    },
    {
      src: imageThird,
      text: 'Следите за своим состоянием',
    },
    {
      src: imageFourth,
      text: 'Получайте экспертную поддержку',
    },
  ];
  const [click, setClick] = useState(0);
  const navigate = useNavigate();

  const handleChangeButtonNext = (evt) => {
    if (evt.activeIndex === 0) {
      setClick(0);
    } else if (evt.activeIndex === 1) {
      setClick(1);
    } else if (evt.activeIndex === 2) {
      setClick(2);
    } else if (evt.activeIndex === 3) {
      setClick(3);
    }
  }

  const handleClickButtonExit = () => {
    navigate('/', { replace: true });
  }

  const SwiperButtonNext = (evt) => {
    const swiper = useSwiper();
    console.log(evt)
    if (click !== 3) {
      return <button className="welcome-page__button-next" onClick={() => swiper.slideNext()}>Дальше</button>;
    } else {
      return <button className="welcome-page__button-next" onClick={() => navigate('/', { replace: true })}>Войти</button>;
    }
  };


  return (
    <section className="welcome-page">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(evt) => handleChangeButtonNext(evt)}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          sliderArr.map((item) => (
            <SwiperSlide key={item.src}>
              <div className="welcome-page__content">
                <button onClick={handleClickButtonExit} className="welcome-page__button-exit">
                  Пропустить
                </button>
                <img src={item.src} alt={item.text} className="welcome-page__image" />
              </div>
              <h1 className="welcome-page__title">
                {item.text}
              </h1>
              <SwiperButtonNext />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </section>
  )
}

export default WelcomePage;