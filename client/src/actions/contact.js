import {
    ADD_CONTACT,
    CONTACT_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// To add a contact
export const addContact = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //const res = await axios.post('http://localhost:5000/api/contacts', formData, config);
        const res = await axios.post('https://abcsearch.herokuapp.com/api/contacts', formData, config);
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

