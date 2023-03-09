import React, {useEffect, useRef, useState} from 'react'
import arrow from '../../assets/img/arrow_slider.svg'
import date from '../../assets/img/date.svg'
import InputMask from 'react-input-mask';
import {checkCustomDateIsValid} from "../../utils";
import {connect} from "react-redux";
import {
    MONTH,
    periodArr,
    SELECTED,
    setPeriod,
    setSelectedPeriod,
    THREE_DAYS,
    WEEK,
    YEAR
} from "../../redux/calls_reducer";
import {getCalls} from "../../redux/thunk/calls";

function DatePicker({period, selectedPeriod, setPeriod, getCalls, setSelectedPeriod}) {
    const [isViewMenu, setIsViewMenu] = useState(false)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [periodArrСount, setPeriodArrСount] = useState(0)
    const menuRef = useRef();
    const menuRefButton = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isViewMenu && menuRef.current && !menuRef.current.contains(e.target) && !menuRefButton.current.contains(e.target)) {
                setIsViewMenu(false);
                setIsValid(true)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isViewMenu])


    const dateSwitch = (value) => {
        if (value == -1) {
            if ((periodArrСount - 1) < 0) {
                setPeriod(periodArr[periodArr.length - 1])
                setPeriodArrСount(periodArr.length - 1)
                getCalls()
            } else {
                setPeriod(periodArr[periodArrСount - 1])
                setPeriodArrСount(periodArrСount - 1)
                getCalls()
            }
        } else {
            if ((periodArrСount + 1) > periodArr.length - 1) {
                setPeriod(periodArr[0])
                setPeriodArrСount(0)
                getCalls()
            } else {
                setPeriod(periodArr[periodArrСount + 1])
                setPeriodArrСount(periodArrСount + 1)
                getCalls()
            }
        }
    }

    const setCustomDate = () => {

        if (checkCustomDateIsValid(dateFrom, dateTo)) {
            setIsValid(true)
            setIsViewMenu(false)
            setPeriod(SELECTED)
            setSelectedPeriod(`${dateFrom}-${dateTo}`)
            getCalls(dateFrom, dateTo)
        } else {
            setIsValid(false)
        }
    }
    return (
        <div className='date-picker'>
            <div className='date-picker__face'>
                <img src={arrow} alt="" className='arrow arrow-left' onClick={() => dateSwitch(-1)}/>
                <div className='date-picker__face-value' ref={menuRefButton} onClick={() => setIsViewMenu(!isViewMenu)}>
                    <img src={date} alt=""/>
                    <div>
                        {period == THREE_DAYS ? '3 дня' : null}
                        {period == WEEK ? 'Неделя' : null}
                        {period == MONTH ? 'Месяц' : null}
                        {period == YEAR ? 'Год' : null}
                        {period == SELECTED ? selectedPeriod : null}
                    </div>
                </div>
                <img src={arrow} alt="" className='arrow arrow-right' onClick={() => dateSwitch(1)}/>
            </div>
            {isViewMenu ?
                <div className='date-picker__menu picker-menu' ref={menuRef}>
                    <div className='picker-menu__elem selected' onClick={() => {
                        setPeriod(THREE_DAYS);
                        setIsViewMenu(false);
                        getCalls()
                    }}>3 дня
                    </div>
                    <div className='picker-menu__elem' onClick={() => {
                        setPeriod(WEEK);
                        setIsViewMenu(false);
                        getCalls()
                    }}>Неделя
                    </div>
                    <div className='picker-menu__elem' onClick={() => {
                        setPeriod(MONTH);
                        setIsViewMenu(false);
                        getCalls()
                    }}>Месяц
                    </div>
                    <div className='picker-menu__elem' onClick={() => {
                        setPeriod(YEAR);
                        setIsViewMenu(false);
                        getCalls()
                    }}>Год
                    </div>
                    <div className='picker-menu__elem select-custom-date'>
                        <div className={`select-custom-date__title ${isValid ? '' : 'error'}`}>Указать даты</div>
                        <div className='select-custom-date__date-container '>
                            <InputMask mask="99.99.9999-99.99.9999" placeholder='__.__.____-__.__.____'
                                       className={`select-custom-date__date ${isValid ? '' : 'error'}`}
                                       onChange={(e) => {
                                           setDateFrom(`${e.target.value.slice(6, 10)}-${e.target.value.slice(3, 5)}-${e.target.value.slice(0, 2)}`);
                                           setDateTo(`${e.target.value.slice(17, 22)}-${e.target.value.slice(14, 16)}-${e.target.value.slice(11, 13)}`)
                                       }}
                                       onKeyDown={(event => {
                                           if (event.keyCode === 13) {
                                               setCustomDate()
                                           }
                                       })}
                            />
                            <img src={date} alt="" onClick={() => setCustomDate()}/>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}

const mapStateToProps = state => ({
    period: state.Call.period,
    selectedPeriod: state.Call.selectedPeriod,
})

export default connect(mapStateToProps, {setPeriod, getCalls, setSelectedPeriod})(DatePicker);
