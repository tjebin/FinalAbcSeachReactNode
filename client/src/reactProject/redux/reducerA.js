import reducerB  from './reducerB';
import { toDos } from '../shared/toDos';
import { HOTELS } from '../shared/hotels';

const initialState = {
    listToDos: toDos,
    hotels: HOTELS
  };
  
  const reducer = (state = initialState, action) => {
    if (action.type === "ADD_TODO") {
        var toDo = {};
        toDo.name = action.name;
        toDo.id = state.listToDos.length+1;
        toDo.date = action.date;
        toDo.isCompleted = action.completed;
        return Object.assign({}, state, {
            listToDos : state.listToDos.concat(toDo)
        });
    }

    if (action.type === "MAKE_COMPLETED") {
      var filteredItems = state.listToDos.filter(function (item) {
        if(item.id == action.id) {
            if(!item.isCompleted){
              item.isCompleted = true;
            }else{
              item.isCompleted = false;
            }
        }
        return (item);
      });
      return Object.assign({}, state, {
        listToDos : filteredItems
      });
    }

    if (action.type === "MAKE_DELETED") {
      var filteredItems = state.listToDos.filter(function (item) {
        if(item.id != action.id) {
          return (item);
        }
      });
      return Object.assign({}, state, {
        listToDos : filteredItems
      });
    }

    if (action.type === "FILTER_ITEMS") {
      alert("1nnn");
      var filteredItems = state.listToDos.filter(function (item) {
        if(action.filter == "all") {
          return (item);
        }else if(action.filter == "completed") {
          
          return (item.isCompleted == true ? item : null);
        }
      });
      return Object.assign({}, state, {
        listToDos : filteredItems
      });
    }
    
    return state;
  };
  
  export default reducer;

