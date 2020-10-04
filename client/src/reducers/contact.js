import {
    ADD_CONTACT,
    CONTACT_ERROR
} from '../actions/types';

const initialState = {
    contacts: [],
    contact: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: payload,
                loading: false
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: payload,
                contacts: null,
                contact: null,
                loading: false
            };
        default:
            return state;
    }
}