import {createStore,combineReducers} from 'redux';
import reducerA  from './reducerA';
import reducerB  from './reducerB';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            rA: reducerA
        })
        // our initialState
    );

    return store;
}