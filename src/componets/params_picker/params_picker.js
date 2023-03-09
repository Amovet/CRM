import React, {useState} from 'react'
import expand from "../../assets/img/expand.svg";
import closeIco from "../../assets/img/exit.svg";
import {useEffect, useRef} from "react";
import RateButton, {BAD_RATE, GOOD_RATE, MEDIUM_RATE} from "../buttons/rate_button";
import {BY_CALL, BY_ERROR, BY_FROM, BY_RATE, BY_STAFF, BY_TYPE, SORT_ON} from "../../utils/components_utils";
import {connect} from "react-redux";
import staffIco from '../../assets/img/staff_avatar.png'
import {setSortBy, setSortDefault} from "../../redux/calls_reducer";
import {getCalls, getFilterByError, getFilterBySource, getFilterByTypeCall} from "../../redux/thunk/calls";


function ParamsPicker(
    {
        type, setSortBy, getFilterByError, person, getFilterByTypeCall,
        setSortDefault, getFilterBySource, sortBy, getCalls
    }) {
    const [isViewMenu, setIsViewMenu] = useState(false)


    const menuRef = useRef();
    const menuRefButton = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isViewMenu && menuRef.current && !menuRef.current.contains(e.target) && !menuRefButton.current.contains(e.target)) {
                setIsViewMenu(false);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isViewMenu])


    switch (type) {
        case BY_TYPE:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name ${sortBy.byType !== false ? 'selected' : ''}`}>
                            {sortBy.byType === false ? 'Все типы' : null}
                            {sortBy.byType === 1 ? 'Входящие' : null}
                            {sortBy.byType === 0 ? 'Исходящие' : null}
                        </div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => {
                                setSortBy({byType: false}), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Все вызовы
                            </div>
                            <div onClick={() => {
                                setSortBy({byType: 1}), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Входящие
                            </div>
                            <div onClick={() => {
                                setSortBy({byType: 0}), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Исходящие
                            </div>
                        </div>
                        :
                        null}
                </div>
            );
        case BY_STAFF:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name ${sortBy.byStaff !== false ? 'selected' : ''}`}>
                            {sortBy.byStaff == false ? 'Все сотрудники' : 'Выбранный пользователь'}
                        </div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => {
                                setSortBy({byStaff: false}), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem staff-elem__all'>Все сотрудники
                            </div>
                            {person.map(e => <div onClick={() => {
                                setSortBy({byStaff: e.person_id}), setIsViewMenu(!isViewMenu)
                            }} key={e.person_id} className='picker-menu__elem staff-elem'>
                                <img src={staffIco} alt=""/>
                                Сотрудник id: {e.person_id}
                            </div>)}
                        </div>
                        :
                        null}
                </div>
            );
        case BY_CALL:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name ${sortBy.byTypeCall !== false ? 'selected' : ''}`}>
                            {sortBy.byTypeCall == false ? 'Все звонки' : null}
                            {sortBy.byTypeCall == 'clients' ? 'Все клиенты' : null}
                            {sortBy.byTypeCall == 'new_clients' ? 'Новые клиенты' : null}
                            {sortBy.byTypeCall == 'workers' ? 'Все исполнители' : null}
                            {sortBy.byTypeCall == 'app' ? 'Через приложение' : null}
                        </div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => {
                                getFilterByTypeCall(false), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Все звонки
                            </div>
                            <div onClick={() => {
                                getFilterByTypeCall('clients'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Все клиенты
                            </div>
                            <div onClick={() => {
                                getFilterByTypeCall('new_clients'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem new-client'>Новые клиенты <div className='info-dot'/></div>
                            <div onClick={() => {
                                getFilterByTypeCall('workers'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Все исполнители
                            </div>
                            <div onClick={() => {
                                getFilterByTypeCall('app'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Через приложение
                            </div>
                        </div>
                        :
                        null}
                </div>
            );
        case BY_FROM:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name ${sortBy.byFrom !== false ? 'selected' : ''}`}>
                            {sortBy.byFrom == false ? 'Все источники' : null}
                            {sortBy.byFrom == 'from_site' ? 'С сайта' : null}
                            {sortBy.byFrom == 'yandex' ? 'Yandex' : null}
                            {sortBy.byFrom == 'google' ? 'Google' : null}
                            {sortBy.byFrom == 'empty' ? 'Прочее' : null}
                        </div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => {
                                getFilterBySource(false), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Все источники
                            </div>
                            <div onClick={() => {
                                getFilterBySource('from_site'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>С сайта
                            </div>
                            <div onClick={() => {
                                getFilterBySource('yandex'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Yandex
                            </div>
                            <div onClick={() => {
                                getFilterBySource('google'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Google
                            </div>
                            <div onClick={() => {
                                getFilterBySource('empty'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Прочее
                            </div>
                        </div>
                        :
                        null}
                </div>
            );
        case BY_RATE:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name`}>Оценки</div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'>Все оценки
                            </div>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'>Распознать
                            </div>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'>Скрипт не
                                использован
                            </div>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'><RateButton
                                type={GOOD_RATE}/></div>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'><RateButton
                                type={MEDIUM_RATE}/></div>
                            <div onClick={() => setIsViewMenu(!isViewMenu)} className='picker-menu__elem'><RateButton
                                type={BAD_RATE}/></div>

                        </div>
                        :
                        null}
                </div>
            );
        case BY_ERROR:
            return (
                <div className='params-picker'>
                    <div className="params" ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                        <div className={`params__name ${sortBy.byError !== false ? 'selected' : ''}`}>
                            {sortBy.byError == false ? 'Все ошибки' : null}
                            {sortBy.byError == 'noerrors' ? 'Без ошибок' : null}
                            {sortBy.byError == 'noscript' ? 'Скрипт не использован' : null}
                        </div>
                        <img src={expand} alt="" className={`${isViewMenu ? 'expand_open' : 'expand_close'}`}/>
                    </div>
                    {isViewMenu ?
                        <div className='params__menu picker-menu' ref={menuRef}>
                            <div onClick={() => {
                                getFilterByError(false), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>По умолчанию
                            </div>
                            <div onClick={() => {
                                getFilterByError('noerrors'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Без ошибок
                            </div>
                            <div onClick={() => {
                                getFilterByError('noscript'), setIsViewMenu(!isViewMenu)
                            }} className='picker-menu__elem'>Скрипт не использован
                            </div>
                        </div>
                        :
                        null}
                </div>
            );
        case SORT_ON:
            return (
                <div className='params-picker' onClick={() => {
                    setSortDefault();
                    getCalls()
                }}>
                    <div className="params sort-close" ref={menuRefButton}>
                        <div className={`params__name`}>Сбросить фильтры</div>
                        <img src={closeIco} alt="" className='sort-close__ico'/>
                    </div>
                </div>
            );
        default:
            return (
                <></>
            );
    }
}

const mapStateToProps = state => ({
    sortBy: state.Call.sortBy,
    person: state.Call.person,
})

export default connect(mapStateToProps, {
    setSortBy,
    getFilterByTypeCall,
    setSortDefault,
    getFilterBySource,
    getFilterByError,
    getCalls
})(ParamsPicker);

