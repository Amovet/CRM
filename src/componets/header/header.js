import React, {useState} from 'react'
import searchIco from '../../assets/img/search.svg'
import expand from '../../assets/img/expand.svg'
import phoneIco from '../../assets/img/phone_profile.svg'
import emailIco from '../../assets/img/email_profile.svg'
import userAvatar from '../../assets/img/user_avatar.png'
import selectIco from '../../assets/img/login.svg'
import logoutIco from '../../assets/img/logout.svg'
import {getHeaderDate} from "../../utils";
import {useEffect, useRef} from "react";


function Header() {
    const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);


    const menuRef = useRef();
    const menuRefButton = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (userMenuIsOpen && menuRef.current && !menuRef.current.contains(e.target) && !menuRefButton.current.contains(e.target)) {
                setUserMenuIsOpen(false);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [userMenuIsOpen])

    return (
        <header className='header'>
            <div className='header__container'>
                <div className="header__date-and-statistic">
                    <div className='header__date'>{getHeaderDate()}</div>
                    <div className='header__statistic'>
                        <div className="new-call__title">
                            Новые звонки <span>20 из 30</span>
                        </div>
                        <input
                            type="range"
                            className='new-call range-input'
                            min={0}
                            max={30}
                            value={20}
                            onChange={() => {
                            }}
                        />
                    </div>
                    <div className='header__statistic'>
                        <div className="quality__title">
                            Качество разговоров <span>40%</span>
                        </div>
                        <input
                            type="range"
                            className='quality range-input'
                            min={0}
                            max={30}
                            value={20}
                            onChange={() => {
                            }}
                        />
                    </div>
                    <div className='header__statistic'>
                        <div className="сonversion__title">
                            Конверсия в заказ <span>67%</span>
                        </div>
                        <input
                            type="range"
                            className='сonversion range-input'
                            min={0}
                            max={30}
                            value={20}
                            onChange={() => {
                            }}
                        />
                    </div>
                </div>
                <div className="header__user-and-search">
                    <img className="header__search" src={searchIco}/>
                    <div className="header__company">
                        <div>ИП Сидорова Александра Михайловна</div>
                        <img src={expand} alt="" className='expand_close'/>
                    </div>
                    <div className="header__profile-container" onClick={() => setUserMenuIsOpen(!userMenuIsOpen)}>
                        <div className='header__profile' ref={menuRefButton}>
                            <img src={userAvatar} alt="" className='header__profile-avatar'/>
                            <img src={expand} alt="" className={`${userMenuIsOpen ? 'expand_open' : 'expand_close'}`}/>
                        </div>
                        {userMenuIsOpen ?
                            <div className='header__profile-pop-up profile-pop-up' ref={menuRef}>
                                <div className='profile-pop-up__user-info'>
                                    <div className='profile-pop-up__name'>
                                        Петр Петров
                                    </div>
                                    <div className='profile-pop-up__info'>
                                        <div className='profile-pop-up__user-post'>Директор</div>
                                        <div className='dot'></div>
                                        <div className='profile-pop-up__user-city'>Санкт-Петербург</div>
                                    </div>
                                    <div className='profile-pop-up__contact'>
                                        <div className='profile-pop-up__phone profile-contact'>
                                            <img src={phoneIco} alt=""/>
                                            <div>8 (800) 333-27-22</div>
                                        </div>
                                        <div className='profile-pop-up__email profile-contact'>
                                            <img src={emailIco} alt=""/>
                                            <div>hi@skilla.ru</div>
                                        </div>
                                    </div>
                                    <img src={logoutIco} alt='' className='profile-pop-up__logout'/>
                                </div>
                                <div className='profile-staff'>
                                    <div className='profile-staff__title'>Операторы</div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Петр Петренко</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Алексей Алексеев</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Виктор Сидоров</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                </div>
                                <div className='profile-staff'>
                                    <div className='profile-staff__title'>Логисты</div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Иван Иванов</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Михаил Козлов</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                    <div className='profile-staff__elem'>
                                        <img src={userAvatar} alt="" className='profile-staff__ico'/>
                                        <div>Виктор Петров</div>
                                        <img src={selectIco} alt="" className='profile-staff__select'/>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>

                </div>

            </div>
        </header>
    );
}

export default Header;