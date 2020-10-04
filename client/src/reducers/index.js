import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import flight from './flight';
import contact from './contact';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    flight,
    contact
}); 