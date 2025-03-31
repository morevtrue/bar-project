import React from "react";
import './AboutProject.css';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import live from '../../images/live.png';
import group from '../../images/group.jpg';
import vk from '../../images/vk.png';
import offline from '../../images/offline.jpg';
import { Link } from "react-router-dom";
import logo_faise from '../../images/faise.svg';

function AboutProject(props) {
    return (
        <>
            {props.auth ? <></> : <Header about_project={true} />}
            <main className="about-project">
                <div className="about-project_head">
                    <h1 className="about-project__title">О проекте</h1>
                    {props.auth ? <Link to="/" className="about-project__form-button-back"></Link> : <></>}
                </div>
                <div className="about-project__container">
                    <ul className="about-project__links">
                        <li className="about-project__link">
                            <p className="about-project__paragraph link-name">
                                Наше сообщество в ВК:&nbsp;
                                <a className="link" href="https://vk.com/prosvetvtebe" target="blank">https://vk.com/prosvetvtebe</a>
                            </p>
                        </li>
                        <li className="about-project__link">
                            <p className="about-project__paragraph link-name">
                                Телеграмм канал:&nbsp;
                                <a className="link" href="https://t.me/prosvet_v_tebe" target="blank">https://t.me/prosvet_v_tebe</a>
                            </p>
                        </li>
                    </ul>
                    <p className="about-project__paragraph">
                        С 2020 года мы проводим различные мероприятия для людей с расстройствами настроения.                
                    </p>
                    <p className="about-project__paragraph">
                        Данное приложение является развитием нашей идеи.
                    </p>
                    <p className="about-project__paragraph">
                        <b>Календарь настроения</b> - это проект для тех, кому ежедневно требуется мониторить свое состояние, 
                        кто погружен в тревогу, депрессию, апатию, очень много переживает или находится в подавленом состоянии.
                        Для всех, кому необходимо следить за собой, за своим состоянием и предлагается продукт <b>Календарь настроения</b>.
                    </p>
                    <p className="about-project__paragraph">
                        В нём вы можете вести дневник своего состояния, делиться результатами с близкими и наставниками.
                        В дальнейшем появятся новости нашего проекта, анонсы событий и календарь мероприятий.                
                    </p>
                    <p className="about-project__paragraph">
                    <b>Наша цель</b> - повышение процента верно установленных диагнозов через создание доступных инструментов комплексной самодиагностики для людей с расстройствами тревожно-аффективного спектра на основе клинических рекомендаций Российского общества психиатров по диагностике и лечению аффективных расстройств. 
                    Нашим продуктом могут пользовать все граждане РФ в возрасте от 18 лет, имеющие признаки расстройства тревожно-аффективного спектра. Пользователи могут облегчить своё состояние и достигнуть ремиссии, что достигается в том числе благодаря ведению дневника настроения.                
                    </p>
                    <p className="about-project__paragraph about-project__paragraph_title">
                        Основные форматы нашего проекта:
                    </p>
                    <ul className="about-project__list">
                        <li className="about-project__list-item">
                            <p className="about-project__paragraph about-project__paragraph_item-title">
                                Прямые эфиры
                            </p>
                            <p className="about-project__paragraph about-project__paragraph_item">
                                Обсуждаем актуальные темы, связанные с аффективными и тревожными расстройствами. 
                                Модераторами таких мероприятий становятся практикующие специалисты и люди, имеющие большой опыт жизни с диагностированным расстройством.
                            </p>
                            <img className="about-project__img" src={live}></img>
                        </li>
                        <li className="about-project__list-item">
                            <p className="about-project__paragraph about-project__paragraph_item-title">
                                Группы поддержки равных
                            </p>
                            <p className="about-project__paragraph about-project__paragraph_item">
                                Комфортное и безопасное пространство для высказывания личных переживаний. Вы сможете поделиться своим состоянием, обратить внимание на собственные эмоции и чувства, получить поддержку от людей, имеющих похожий опыт.
                            </p>
                            <img className="about-project__img" src={group}></img>
                        </li>
                        <li className="about-project__list-item">
                            <p className="about-project__paragraph about-project__paragraph_item-title">
                                Общее онлайн-пространство
                            </p>
                            <p className="about-project__paragraph about-project__paragraph_item">
                                Общение с понимающими людьми и единомышленниками. Делитесь своими мыслями и узнавайте новости о предстоящих мероприятиях проекта.
                                Чтобы присоединиться к чату, напишите в сообщения нашего сообщества в ВК.
                                (<a className="link" href="https://vk.com/club227297802" target="blank">Ссылка на сообщество</a>)
                            </p>
                            <img className="about-project__img" src={vk}></img>
                        </li>
                        <li className="about-project__list-item">
                            <p className="about-project__paragraph about-project__paragraph_item-title">
                                Оффлайн-мероприятия
                            </p>
                            <p className="about-project__paragraph about-project__paragraph_item">
                                Общаемся со специалистами, обсуждаем особенности расстройств настроения, учимся слышать себя, осваиваем полезные практики и делимся личным опытом.
                            </p>
                            <img className="about-project__img" src={offline}></img>
                        </li>
                    </ul>
                    <div className="partners_container">
                        <p className="about-project__paragraph about-project__paragraph_fund">
                            Проект создан при поддержке <span className="about-project__paragraph_bold">Федерального государственного бюджетного учреждения «Фонд содействия развитию малых форм предприятий в научно-технической сфере»</span> в рамках программы <span className="about-project__paragraph_bold">«Студенческий стартап»</span> федерального проекта <span className="about-project__paragraph_bold">«Платформа университетского
                            технологического предпринимательства»</span>.
                        </p>
                        <img className="faise-logo" src={logo_faise}></img>
                    </div>
                    <p className="about-project__paragraph about-project__paragraph-link">
                        Партнеры проекта:
                    </p>
                    <ul className="about-project__links">
                        <li className="about-project__link">
                            <p className="about-project__paragraph link-name">
                                Фонд содействия развитию малых форм предприятий в научно-технической сфере (Фонд содействия инновациям) :&nbsp;
                                <a className="link" href="https://fasie.ru/" target="blank">https://fasie.ru</a>
                            </p>
                        </li>
                    </ul>
                </div>
                <h2 className="about-project__company">
                    ООО "ПРОСВЕТ ТЕХНОЛОГИИ", ОГРН: 1245200004686, ИНН: 5262394376, КПП: 526201001.
                </h2>
            </main>
            {props.auth ? <></> : <Footer about_project={true} />}
        </>
    )
}

export default AboutProject;