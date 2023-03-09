export const SET_CALL_DATA = 'SET_CALL_DATA';
export const SET_PERSON = 'SET_PERSON';
export const SET_PERIOD = 'SET_PERIOD';
export const SET_STREAM_AUDIO = 'SET_STREAM_AUDIO';
export const SET_AUDIO = 'SET_AUDIO';
export const THREE_DAYS = 'THREE_DAYS';
export const SET_SORT_DEFAULT = 'SET_SORT_DEFAULT';
export const SET_SELECTED_PERIOD = 'SET_SELECTED_PERIOD';
export const WEEK = 'WEEK';
export const MONTH = 'MONTH';
export const YEAR = 'YEAR';
export const SELECTED = 'SELECTED';
export const FETCH_MORE_CALL = 'FETCH_MORE_CALL';
export const SET_SORT_BY = 'SET_SORT_BY';

export const periodArr = [THREE_DAYS, WEEK, MONTH, YEAR];


let initialState =
    {
        calls: [],
        callsTotalCount: 0,
        person: [],
        period: THREE_DAYS,
        selectedPeriod: null,
        selectErrorType: null,
        sortBy: {
            byType: false,
            byStaff: false,
            byTypeCall: false,
            byFrom: false,
            byError: false,
        },
        audio: null,
        streamAudioId: null,
    };


const CallReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CALL_DATA:
            return {
                ...state,
                calls: action.data,
                callsTotalCount: action.totalCount
            }
        case FETCH_MORE_CALL:
            return {
                ...state,
                calls: [...state.calls, ...action.data],
            }
        case SET_PERSON:
            return {
                ...state,
                person: action.person
            }
        case SET_PERIOD:
            return {
                ...state,
                period: action.period
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: {...state.sortBy, ...action.value}
            }
        case SET_SELECTED_PERIOD:
            return {
                ...state,
                selectedPeriod: action.period
            }
        case SET_AUDIO:
            return {
                ...state,
                audio: action.file
            }
        case SET_STREAM_AUDIO:
            return {
                ...state,
                streamAudioId: action.id
            }
        case SET_SORT_DEFAULT:
            return {
                ...state,
                sortBy: initialState.sortBy
            }
        default:
            return state;

    }


}

export const setCallData = (data, totalCount) => {
    return {
        type: SET_CALL_DATA,
        data,
        totalCount
    }
}
export const setSortBy = (value) => {
    return {
        type: SET_SORT_BY,
        value
    }
}
export const setStreamAudio = (id) => {
    return {
        type: SET_STREAM_AUDIO,
        id
    }
}
export const setPerson = (person) => {
    return {
        type: SET_PERSON,
        person
    }
}
export const setPeriod = (period) => {
    return {
        type: SET_PERIOD,
        period
    }
}
export const setSortDefault = () => {
    return {
        type: SET_SORT_DEFAULT,
    }
}
export const fetchMoreCall = (data) => {
    return {
        type: FETCH_MORE_CALL,
        data
    }
}
export const setAudio = (file) => {
    return {
        type: SET_AUDIO,
        file
    }
}
export const setSelectedPeriod = (period) => {
    return {
        type: SET_SELECTED_PERIOD,
        period
    }
}


export default CallReducer;