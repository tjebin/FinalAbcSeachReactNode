export const makeCompleted = (id) => ({
    type: 'MAKE_COMPLETED',
    id: id
});

export const deleteToDo = (id) => ({
    type: 'MAKE_DELETED',
    id: id
});

export const addToDo = (name, date, completed) => ({
    type: 'ADD_TODO',
    name: name,
    date: date,
    isCompleted: completed
});

export const filterToDos = (filter) => ({
    type: 'FILTER_ITEMS',
    filter: filter
});
    
    

   