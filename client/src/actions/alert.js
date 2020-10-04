import { SET_ALERT } from './types';
import { REMOVE_ALERT } from './types';
import { v4 as uuid } from "uuid";

export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
    const id = uuid;

    dispatch({
        type: REMOVE_ALERT
    });

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
}