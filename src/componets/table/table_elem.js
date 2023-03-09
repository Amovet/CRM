import React, {useState} from 'react'
import incomingIco from '../../assets/img/incoming.svg'
import outgoingIco from '../../assets/img/outgoing.svg'
import outgoingMissIco from '../../assets/img/miss_outgoing.svg'
import incomingMissIco from '../../assets/img/miss_incoming.svg'
import staffIco from '../../assets/img/staff_avatar.png'
import phoneIco from '../../assets/img/Phone.svg'
import callFromSiteIco from '../../assets/img/from_site.svg'
import {getOnlyTime, getTime_MM_SS, getTypeOfRateById} from "../../utils";
import {connect} from "react-redux";
import Player from "../player/player";
import RateButton from "../buttons/rate_button";


function TableElement({number, from, date, in_out, status, error, record, stages, time, id, from_site}) {
    const [checked, setChecked] = useState(false)
    const getCallTypeIco = () => {
        if (in_out == 1) {
            return status == 'Дозвонился' ? incomingIco : incomingMissIco
        } else {
            return status == 'Дозвонился' ? outgoingIco : outgoingMissIco
        }
    }

    // this is all for rating substitution depending on id
    let typeOfRate = getTypeOfRateById(id)

    return (
        <tr className='table__elem with-border'>
            <td className='table__type'><img src={getCallTypeIco()} alt=""/></td>
            <td className='table__time'>{getOnlyTime(date)}</td>
            <td className='table__staff'><img src={staffIco} alt=""/></td>
            <td className='table__call'>
                {from_site == 1 ? <img src={callFromSiteIco} alt="" className='call-from-site'/> : null}
                <img src={phoneIco} alt="" className='phone-ico'/>
                {stages !== undefined ? <div className='person_name'>{stages.person_name}</div> : null}
                +{number}
            </td>
            <td className='table__from'>{from}</td>
            <td className='table__rate'>{
                error[0] == undefined ? <RateButton type={typeOfRate}/> :
                    <span>{error[0]}</span>}</td>
            <td className='table__duration'>{getTime_MM_SS(time)}
                {record !== '' ? <Player id={id}/> : null}
            </td>
            <td>
                <input type="checkbox" className={`elem-checkbox ${checked ? 'view' : ''}`} id="checkbox"
                       name="checkbox"
                       onClick={() => setChecked(!checked)}/>
                <label htmlFor="checkbox"/>
            </td>
        </tr>
    );
}


const mapStateToProps = state => ({
    audio: state.Call.audio
})

export default connect(mapStateToProps, null)(TableElement);
