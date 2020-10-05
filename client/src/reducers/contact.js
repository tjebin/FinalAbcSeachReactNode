import {
    ADD_CONTACT,
    GET_CONTACTS,
    CONTACT_ERROR,
    REMOVE_CONTACT
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
        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
                loading: false
            };
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== payload),
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