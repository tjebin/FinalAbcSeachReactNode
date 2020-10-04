import {
    GET_FLIGHTS,
    FLIGHT_ERROR,
    ADD_FLIGHT,
    REMOVE_FLIGHT
} from '../actions/types';

const initialState = {
    flights: [],
    flight: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_FLIGHTS:
            return {
                ...state,
                flights: payload,
                loading: false
            };
        case ADD_FLIGHT:
            return {
                ...state,
                // flights: payload,
                loading: false
            };
        case FLIGHT_ERROR:
            return {
                ...state,
                error: payload,
                flights: null,
                flight: null,
                loading: false
            };
        case REMOVE_FLIGHT:
            return {
                ...state,
                flights: state.flights.filter(flight => flight._id !== payload),
                loading: false
            };
        default:
            return state;
    }
}