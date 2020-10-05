import {
    GET_FLIGHTS,
    FLIGHT_ERROR,
    ADD_FLIGHT,
    REMOVE_FLIGHT,
    REMOVE_ALERT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// To get all flights
export const getFlights = (formData) => async dispatch => {
    try {
        // let url = `http://localhost:5000/api/flights?from=${formData.from}&to=${formData.to}&departure=${formData.departure}&arrival=${formData.arrival}`;
        let url = `https://abcsearch.herokuapp.com/api/flights?from=${formData.from}&to=${formData.to}&departure=${formData.departure}&arrival=${formData.arrival}`;
        const res = await axios.get(url);
        dispatch({
            type: REMOVE_ALERT
        });
        alert(" res length " + res.data.length);
        dispatch({
            type: GET_FLIGHTS,
            payload: res.data // to get all flights
        });
    } catch (err) {
        dispatch({
            type: FLIGHT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To add flight
export const addFlight = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //  const res = await axios.post('http://localhost:5000/api/flights', formData, config);
        const res = await axios.post('https://abcsearch.herokuapp.com/api/flights', formData, config);
        dispatch({
            type: REMOVE_ALERT
        });

        dispatch({
            type: ADD_FLIGHT,
            payload: res.data
        });
        dispatch(setAlert('Flight Added !! ', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FLIGHT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//To remove a flight
export const removeFlight = (flightId) => async dispatch => {
    try {
        //await axios.delete(`http://localhost:5000/api/flights/${flightId}`);
        await axios.delete(`https://abcsearch.herokuapp.com/api/flights/${flightId}`);
        dispatch({
            type: REMOVE_FLIGHT,
            payload: flightId // for filtering out
        });
        dispatch(setAlert('Flight Removed ', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FLIGHT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}



