import {
    ADD_CONTACT,
    CONTACT_ERROR,
    GET_CONTACTS,
    REMOVE_CONTACT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// To get all contacts
export const getContacts = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('http://localhost:5000/api/contacts', config);
        // const res = await axios.post('https://abcsearch.herokuapp.com/api/contacts', formData, config);

        console.log(" got contacts @ client side " + GET_CONTACTS.length);
        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch(setAlert('Could not get', 'danger'))
        dispatch({
            type: CONTACT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To add a contact
export const addContact = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/api/contacts', formData, config);
        // const res = await axios.post('https://abcsearch.herokuapp.com/api/contacts', formData, config);
        dispatch({
            type: ADD_CONTACT,
            payload: res.data
        });

        dispatch(setAlert('Contact Created!!! ', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch(setAlert('Could not be saved', 'danger'))
        dispatch({
            type: CONTACT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//To remove a contact
export const removeContact = (contactId) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/contacts/${contactId}`);
        //await axios.delete(`https://abcsearch.herokuapp.com/api/flights/${flightId}`);
        dispatch({
            type: REMOVE_CONTACT,
            payload: contactId // for filtering out
        });
        dispatch(setAlert('Contact Removed ', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CONTACT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
