
import { HOTELS } from '../shared/hotels';
import { toDos } from '../shared/toDos';

export const initialState = {
    hotels: HOTELS,
    toDos:toDos
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
    }
    
    return state;
};