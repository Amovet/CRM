import axios from "axios";
import {
    fetchMoreCall,
    MONTH,
    SELECTED,
    setAudio,
    setCallData,
    setPerson, setSortBy,
    THREE_DAYS,
    WEEK,
    YEAR
} from "../calls_reducer";
import moment from "moment";


export const getCalls = () => async (dispatch, getState) => {
    let selectedDate

    let filterTypeCall = getState().Call.sortBy.byTypeCall
    let filterSource = getState().Call.sortBy.byFrom
    let filterError = getState().Call.sortBy.byError

    if (getState().Call.period == THREE_DAYS) {
        selectedDate = {
            from: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == WEEK) {
        selectedDate = {
            from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == MONTH) {
        selectedDate = {
            from: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == YEAR) {
        selectedDate = {
            from: moment().subtract(1, 'year').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == SELECTED) {
        selectedDate = {
            from: getState().Call.selectedPeriod.slice(0, 10),
            to: getState().Call.selectedPeriod.slice(11, 21)
        }
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getState().Auth.token}`
            }
        };
        const res = await axios.post(`https://api.skilla.ru/mango/getList?date_start=${selectedDate.from}&date_end=${selectedDate.to}${filterTypeCall ? `&from_type[]=${filterTypeCall}` : ''}${filterSource ? `&sources[]=${filterSource}` : ''}${filterError ? `&errors[]=${filterError}` : ''}`, ' ', config)
        dispatch(setCallData(res.data.results, res.data.total_rows))
        dispatch(setPersonFromDate(res.data.results))
    } catch (err) {
        console.log(err)

    }

};

export const getCallsUpdate = (offset) => async (dispatch, getState) => {
    let selectedDate

    let filterTypeCall = getState().Call.sortBy.byTypeCall
    let filterSource = getState().Call.sortBy.byFrom
    let filterError = getState().Call.sortBy.byError

    if (getState().Call.period == THREE_DAYS) {
        selectedDate = {
            from: moment().subtract(3, 'days').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == WEEK) {
        selectedDate = {
            from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == MONTH) {
        selectedDate = {
            from: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == YEAR) {
        selectedDate = {
            from: moment().subtract(1, 'year').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    }
    if (getState().Call.period == SELECTED) {
        selectedDate = {
            from: getState().Call.selectedPeriod.slice(0, 10),
            to: getState().Call.selectedPeriod.slice(11, 21)
        }
    }
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getState().Auth.token}`
            }
        };
        const res = await axios.post(`https://api.skilla.ru/mango/getList?date_start=${selectedDate.from}&date_end=${selectedDate.to}&offset=${offset}&limit=25${filterTypeCall ? `&from_type[]=${filterTypeCall}` : ''}${filterSource ? `&sources[]=${filterSource}` : ''}${filterError ? `&errors[]=${filterError}` : ''}`, ' ', config)
        dispatch(fetchMoreCall(res.data.results))
    } catch (err) {
        console.log(err)

    }

};


export const setPersonFromDate = (date) => async (dispatch) => {
    let persons = []
    date.map((e) => {
        let isDuplicate = persons.findIndex(x => x.person_id === e.person_id)
        if (isDuplicate == -1) {
            persons.push({
                person_id: e.person_id,
                person_name: e.person_name,
                person_surname: e.person_surname,
                person_avatar: e.person_avatar
            })
        }

    })
    dispatch(setPerson(persons))
};


export const getRecord = (record, partnership_id) => async (dispatch, getState) => {

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getState().Auth.token}`
            }
        };
        const res = await axios.post(`https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnership_id}`, ' ', config)
        let blob = new Blob([res.data], {type: 'audio/mp3'})
        let audioUrl = window.URL.createObjectURL(blob)
        dispatch(setAudio(audioUrl))
    } catch (err) {
        console.log(err)
    }

};

export const getFilterByTypeCall = (type) => async (dispatch) => {
    dispatch(setSortBy({byTypeCall: type}))
    dispatch(getCalls())
};

export const getFilterBySource = (source) => async (dispatch) => {
    dispatch(setSortBy({byFrom: source}))
    dispatch(getCalls())
};

export const getFilterByError = (type) => async (dispatch) => {
    dispatch(setSortBy({byError: type}))
    dispatch(getCalls())
};
