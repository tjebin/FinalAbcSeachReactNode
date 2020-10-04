import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

// To get all posts
export const getPosts = () => async dispatch => {
    try {
        //const res = await axios.get('http://localhost:5000/api/posts');
        const res = await axios.get('https://abcsearch.herokuapp.com/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data // to get all  posts
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To get single post
export const getPost = (postId) => async dispatch => {
    try {
        // const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const res = await axios.get(`https://abcsearch.herokuapp.com/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data // to get specific post
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To add  likes count of the post
export const addLike = postId => async dispatch => {
    try {
        // const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`);
        const res = await axios.put(`https://abcsearch.herokuapp.com/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data } // to get all  likes belong to the post
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To remove likes count of the post
export const removeLike = postId => async dispatch => {
    try {

        // const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`);
        const res = await axios.put(`https://abcsearch.herokuapp.com/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data } // to get all  likes belong to the post
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// To delete the post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`https://abcsearch.herokuapp.com/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId // message says 'post removed'
        });

        dispatch(setAlert('Post Removed ', 'Success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Add post
export const addPost = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //const res = await axios.post('http://localhost:5000/api/posts', formData, config);
        const res = await axios.post('https://abcsearch.herokuapp.com/api/posts', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data // to get all  posts
        });
        dispatch(setAlert('Post Created ', 'Success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Add comment to post
export const addComment = (postId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData, config);
        const res = await axios.post(`https://abcsearch.herokuapp.com/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data // all comments of the specific post
        });
        dispatch(setAlert('Comment Created ', 'Success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Remove comment to post
export const removeComment = (postId, commentId) => async dispatch => {
    try {
        //await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`);
        await axios.delete(`http:// https://abcsearch.herokuapp.com/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId // for filtering out
        });
        dispatch(setAlert('Comment Removed ', 'Success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

