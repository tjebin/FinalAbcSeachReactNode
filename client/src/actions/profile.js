import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data // to get all  Profiles
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('http://localhost:5000/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data // to get all  Profiles
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // to get all  Profiles
        });

        dispatch(setAlert('Experiencde Added', 'Success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
// delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id})`, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // to get all  Profiles
        });

        dispatch(setAlert('Experiencde Removed', 'Success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('http://localhost:5000/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // to get all  Profiles
        });

        dispatch(setAlert('Education Added', 'Success'));
        history.push('/dashboard');

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete education
export const deleteEducation = id => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id})`, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // to get all  Profiles
        });

        dispatch(setAlert('Education Removed', 'Success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// delete account and user and profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure you want to delete this account completely? This can not be undone ')) {
        try {
            await axios.delete(`http://localhost:5000/api/profile/`);
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanantly deleted!!'));

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}
// get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('http://localhost:5000/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data // to get all  Profiles
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// get profile by id
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data // to get all  Profiles
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Get githubrepos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data // to get all  Repos
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
