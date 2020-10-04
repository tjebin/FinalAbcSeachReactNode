
import { toDos } from '../shared/toDos';

export const ToDos = (state = toDos, action) => {
    switch (action.type) {
        case "MakeCompleted":
            var comment = action.payload;
           // comment.id = state.length;
           // comment.date = new Date().toISOString();
            console.log("Todos : ", comment);
            return state;
        default:
          return state;
      }
};