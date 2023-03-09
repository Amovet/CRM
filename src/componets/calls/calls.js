import React, {useEffect, useState} from 'react'
import ContentMenuButton from "../buttons/content_menu_button";
import DatePicker from "../date_picker/date_picker";
import searchIco from '../../assets/img/search.svg'
import emptyIco from '../../assets/img/not_found.svg'
import ParamsPicker from "../params_picker/params_picker";
import TableElement from "../table/table_elem";
import {connect} from "react-redux";
import {checkGroupName, getGroups} from "../../utils";
import {getCallsUpdate} from "../../redux/thunk/calls";
import {
    BY_CALL,
    BY_ERROR,
    BY_FROM,
    BY_RATE,
    BY_STAFF,
    BY_TYPE,
    checkIsSort,
    SORT_ON
} from "../../utils/components_utils";


function Calls({calls,getCallsUpdate,sortBy}) {
    const[offsetCall,setOffsetCall]=useState(50)
    const[fetch,setFetch]=useState(false)

    const groupCallsByDate = getGroups(calls,sortBy)
    let DisplayCalls = groupCallsByDate.map(d => {
            if (groupCallsByDate[0] == d) {
                return (
                    d.map(e => <TableElement
                        number={e.from_number}
                        error={e.errors}
                        status={e.status}
                        in_out={e.in_out}
                        date={e.date}
                        from={e.source}
                        key={e.id}
                        record={e.record}
                        time={e.time}
                        id={e.id}
                        from_site={e.from_site}
                        stages={e.stages[0]}
                    />)
                )
            } else {
                return (
                    <React.Fragment key={d[0].date}>
                        <tr className='table__elem with-border'>
                            <td className='group-name table__elem with-border'>
                                <div className='group-name__name'>
                                    {checkGroupName(d)}
                                    <div className='group-name__count'>{d.length}</div>
                                </div>
                            </td>
                        </tr>
                        {
                            d.map(e => <TableElement
                                number={e.from_number}
                                error={e.errors}
                                status={e.status}
                                in_out={e.in_out}
                                date={e.date}
                                from={e.source}
                                key={e.id}
                                record={e.record}
                                time={e.time}
                                id={e.id}
                            />)
                        }
                    </React.Fragment>
                )
            }
        }
    )

    useEffect(()=>{
        document.addEventListener('scroll',scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        }
    },[])

    useEffect(()=>{
        if(fetch){
            getCallsUpdate(offsetCall)
            setOffsetCall(offsetCall+25)
            setFetch(false)
        }
    },[fetch])



    let scrollHandler = (e) =>{
        if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100 ){
            setFetch(true)
        }
    }

    return (
        <section className='calls'>
            <div className='calls__container'>
                <div className="calls__settings">
                    <ContentMenuButton name={`Баланс ${272} ₽`}/>
                    <DatePicker/>
                </div>
                <div className='calls__sort-by'>
                    <div className='calls__sort-by-call'>
                        <img src={searchIco} alt=""/>
                        <input type='text' placeholder='Поиск по звонкам'/>
                    </div>
                    <div className='calls__sort-by-param'>
                        {checkIsSort(sortBy)?<ParamsPicker type={SORT_ON}/>:null}
                        <ParamsPicker type={BY_TYPE}/>
                        <ParamsPicker type={BY_STAFF}/>
                        <ParamsPicker type={BY_CALL}/>
                        <ParamsPicker type={BY_FROM}/>
                        <ParamsPicker type={BY_RATE}/>
                        <ParamsPicker type={BY_ERROR}/>
                    </div>
                </div>
                <div className="table">
                    <table>
                        <thead>
                        <tr className='table-header with-border'>
                            <th className='table__type'>Тип</th>
                            <th className='table__time'>Время</th>
                            <th className='table__staff'>Сотрудник</th>
                            <th className='table__call'>Звонок</th>
                            <th className='table__from'>Источник</th>
                            <th className='table__rate'>Оценка</th>
                            <th className='table__duration'>Длительность</th>
                        </tr>
                        </thead>
                        <tbody>
                        {DisplayCalls}
                        {groupCallsByDate.length==0?<tr>
                            <th>
                                <div className='table__empty'>
                                    <img src={emptyIco} alt="" className='table__empty-img'/>
                                    <div className='table__empty-text'>К сожалению ничего не найдено</div>
                                </div>
                            </th>
                        </tr>:null}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    calls: state.Call.calls,
    sortBy: state.Call.sortBy,
})

export default connect(mapStateToProps, {getCallsUpdate})(Calls);