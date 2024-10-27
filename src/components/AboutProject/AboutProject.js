import React from "react";
import './AboutProject.css';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import live from '../../images/live.png';
import group from '../../images/group.jpg';
import vk from '../../images/vk.png';
import offline from '../../images/offline.jpg';

function AboutProject(props) {
    return (
        <>
            <Header about_project={true} />
            <main className="about-project">
                <h1 className="about-project__title">О проекте</h1>
                <div className="about-project__container">
                    <p className="about-project__paragraph">
                        С 2020 года мы проводим различные мероприятия для людей с расстройствами настроения.                
                    </p>
                    <p className="about-project__paragraph">
                        Данное приложение является развитием нашей идеи.
                    </p>
                    <p className="about-project__paragraph">
                        В нём вы можете вести дневник своего состояния, делиться результатами с близкими и наставниками.
                        В дальнейшем появятся новости нашего проекта, анонсы событий и календарь мероприятий.                
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
                    <p className="about-project__paragraph about-project__paragraph_fund">
                        Проект реализуется при поддержке <span className="about-project__paragraph_bold">"Фонда содействия развитию малых форм предприятий в научно-технической сфере"</span>.
                    </p>
                    <p className="about-project__paragraph about-project__paragraph-link">
                        Полезные ссылки:
                    </p>
                    <ul className="about-project__links">
                        <li className="about-project__link">
                            <p className="about-project__paragraph link-name">
                                Фонд содействия развитию малых форм предприятий в научно-технической сфере:&nbsp;
                                <a className="link" href="https://fasie.ru/" target="blank">https://fasie.ru</a>
                            </p>
                        </li>
                        <li className="about-project__link">
                            <p className="about-project__paragraph link-name">
                                Наше сообщество в ВК:&nbsp;
                                <a className="link" href="https://vk.com/club227297802" target="blank">https://vk.com/club227297802</a>
                            </p>
                        </li>
                    </ul>
                </div>
                <h2 className="about-project__company">
                    ООО "ПРОСВЕТ ТЕХНОЛОГИИ", ОГРН: 1245200004686, ИНН: 5262394376, КПП: 526201001.
                </h2>
            </main>
            <Footer about_project={true} />
        </>
    )
}

export default AboutProject;