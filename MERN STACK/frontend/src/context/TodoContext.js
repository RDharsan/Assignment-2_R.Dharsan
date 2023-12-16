import { createContext, useReducer } from 'react'

export const TodoContext = createContext()

export const todosReducer = (state, action)=>{

    switch(action.type){
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return{
                todos: [action.payload, ...state.todos]
            }
        case 'DELETE_TODO':
            return{
                todos: state.todos.filter((w)=> w._id !== action.payload._id)
            }

        case 'SET_EDIT_TODO':
            return {
                ...state,
                editTodo: action.payload,
            };
    
       
        
        default:
            return state
    }
}

export const TodoContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(todosReducer, {
        todos: null,
        editTodo: null,
        
    })


    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            { children }
        </TodoContext.Provider>

    )
}