import moment from "moment";
import {
    capitalizeFirstLetter,
    changeMonthFormat,
    checkDateFromIsValid,
    checkDateIsValid,
    checkDateToIsValid, filterCall
} from "./components_utils";
import {BAD_RATE, DEFINE_RATE, GOOD_RATE, MEDIUM_RATE} from "../componets/buttons/rate_button";



export const getHeaderDate = () =>{
    let date = moment()
    date = date.lang('ru').format('dddd, DD ')+changeMonthFormat(date.lang('ru').format('MMMM'));
    return capitalizeFirstLetter(date)
}

export const getOnlyTime = (date) =>{
        return date.slice(11,16);
}

export const getYesterday = () =>{
    let yesterday = moment().subtract(1, 'day').format("YYYY-MM-DD")
    return yesterday
}
export const getBeforeYesterday = () =>{
    let yesterday = moment().subtract(2, 'day').format("YYYY-MM-DD")
    return yesterday
}

export const getGroups = (data,sortBy) =>{
    let filteredDate = filterCall(data,sortBy)
    let group = filteredDate.reduce(function(acc,v){
        let l = v.date.slice(0,10);
        if(!acc[l]) acc[l] = [];
        acc[l].push(v);
        return acc;
    }, { });

    return Object.values(group);

}

export const checkCustomDateIsValid = (dateFrom,dateTo) =>{
        if(checkDateIsValid(dateFrom)&&checkDateIsValid(dateTo)){
            if(checkDateFromIsValid(dateFrom,dateTo)&&checkDateToIsValid(dateTo)){
                return true
            }else{
                return false
            }
        }
        else{
            return false
        }
}

export const checkGroupName = (d) =>{
    if(getYesterday()==d[0].date.slice(0,10)){
        return 'вчера'
    }
    else if(getBeforeYesterday()==d[0].date.slice(0,10)){
        return 'позавчера'
    }
    return d[0].date.slice(0,10)

}


export const getTypeOfRateById = (id) =>{
    let lastNum=String(id)[String(id).length-1]
    if(lastNum<8){
        if(lastNum<6){
            if(lastNum<4){return DEFINE_RATE}
            else{return MEDIUM_RATE}
        }else{return GOOD_RATE}
    }else{return BAD_RATE}
}
export const getTime_MM_SS = (time) =>{return moment.utc(time * 1000).format('mm:ss')}



