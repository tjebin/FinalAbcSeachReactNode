import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken'
// user authentication
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        // axios.defaults.headers.common['x-auth-token'] = token;
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data // to get the user
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        //alert("res ...." + res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAILED
        });
    }
}

//Login user
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('http://localhost:5000/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAILED
        });
    }
}

//Logout user
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    });
}

