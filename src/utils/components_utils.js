import moment from "moment";

export const BY_TYPE = 'BY_TYPE';
export const BY_STAFF = 'BY_STAFF';
export const BY_CALL = 'BY_CALL';
export const BY_FROM = 'BY_FROM';
export const BY_RATE = 'BY_RATE';
export const BY_ERROR = 'BY_ERROR';
export const SORT_ON = 'SORT_ON';

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const changeMonthFormat = (string) => {
    return string.slice(0, 3);
}

export const checkDateIsValid = (date) => {
    return moment(date, "YYYY-MM-DD", true).isValid()
}

export const checkDateFromIsValid = (dateFrom, dateTo) => {
    //condition: the selected date cannot be earlier than 2019
    if (moment(dateFrom).isAfter('2019-01-01', "day")) {
        //condition: the selected date cannot be earlier than dateTo
        if (moment(dateTo).isAfter(dateFrom)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
export const checkDateToIsValid = (dateTo) => {
    //condition: the selected date cannot be later than now
    if (moment(dateTo).isBefore()) {
        return true
    } else {
        return false
    }
}

export const filterCall = (data, sortBy) => {
    let newCallArr = data
    if (sortBy.byType !== false) {
        newCallArr = newCallArr.filter(call => sortBy.byType == call.in_out)
    }
    if (sortBy.byStaff !== false) {
        newCallArr = newCallArr.filter(call => sortBy.byStaff == call.person_id)
    }
    return newCallArr
}

export const checkIsSort = (sortBy) => {
    if (sortBy.byType === false && sortBy.byStaff === false && sortBy.byTypeCall === false && sortBy.byFrom === false && sortBy.byError === false) {
        return false
    } else {
        return true
    }
}