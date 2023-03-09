import React from 'react'
import LogoIco from '../../assets/img/skilla_logo.svg'
import Results from '../../assets/img/results.svg'
import Orders from '../../assets/img/orders.svg'
import Mails from '../../assets/img/mail.svg'
import Calls from '../../assets/img/calls.svg'
import counterparties from '../../assets/img/counterparties.svg'
import documents from '../../assets/img/documents.svg'
import executor from '../../assets/img/executor.svg'
import reports from '../../assets/img/reports.svg'
import knowledge_base from '../../assets/img/knowledge_base.svg'
import settings from '../../assets/img/settings.svg'
import button_plus from '../../assets/img/button_plus.svg'
import button_alert from '../../assets/img/button_alert.svg'
import SideBarElement from "./side_bar_element";
import BigBlueButton from "../buttons/big_blue_button";


function SideBar() {
    return (
        <section className='side-bar'>
            <div className="side-bar__logo-container">
                <img src={LogoIco} className="side-bar__logo"/>
            </div>
            <div className="side-bar__menu-container side-bar-menu">
                <SideBarElement name={'Итоги'} img={Results} active={false}/>
                <SideBarElement name={'Заказы'} img={Orders} active={false}/>
                <SideBarElement name={'Сообщения'} img={Mails} active={false}/>
                <SideBarElement name={'Звонки'} img={Calls} active={true}/>
                <SideBarElement name={'Контрагенты'} img={counterparties} active={false}/>
                <SideBarElement name={'Документы'} img={documents} active={false}/>
                <SideBarElement name={'Исполнители'} img={executor} active={false}/>
                <SideBarElement name={'Отчеты'} img={reports} active={false}/>
                <SideBarElement name={'База знаний'} img={knowledge_base} active={false}/>
                <SideBarElement name={'Настройки'} img={settings} active={false}/>
            </div>
            <div className="side-bar__buttons-container">
                <BigBlueButton name={'Добавить заказ'} img={button_plus}/>
                <BigBlueButton name={'Оплата'} img={button_alert}/>
            </div>
        </section>
    );
}

export default SideBar;