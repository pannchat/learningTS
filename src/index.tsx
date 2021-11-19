import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { createStore } from 'redux'
import { v4 as uuidv4 } from 'uuid';
// import rootReducer from '../modules';

// const store = createStore(rootReducer)
enum SortType {
  'inputOrder' = 'inputOrder',
  'ascending' = 'ascending',
  'descending' = 'descending',
  'importance' = 'importance'
}
enum ActionType {
    'addTodo' = 'addTodo',
    'removeTodo' = 'removeTodo',
    'toggleTodo' = 'toggleTodo',
    'updateTodo' = 'updateTodo',
    'swapItemTodo' = 'swapItemTodo',
    'sortTodo' = 'sortTodo'
  }
interface TodoState {
  todoList: {
    id: string,
    title: string,
    check: boolean,
  }[],
}
const initialState:TodoState = {
  todoList:[],
}

const reducer = (state = initialState, action: any) => {
    if(action.type === ActionType.addTodo) {
        return {
            ...state,
            todoList: state.todoList.concat({
              id: uuidv4(),
              title: action.payload,
              check: false
            })
        }
    }

    if(action.type === ActionType.removeTodo) {
      return {
        ...state,
        todoList: state.todoList.filter(item=> {
           return action.payload !== item.id
        })
      }
    }
    
    if(action.type === ActionType.toggleTodo) {
      return {
        todoList: state.todoList.map(item => {
          return item.id === action.payload
          ? { ...item,
              check: !item.check
          } : item
          
        })
      }
    }

    if(action.type === ActionType.updateTodo) {
      return {
        todoList: state.todoList.map(item => {
          return item.id === action.payload.id ? action.payload : item
        })
      }
    }

    if(action.type === ActionType.swapItemTodo) {
      console.log("swap"+action.payload.start ) 
      console.log("swap"+action.payload.end ) 
      const startItem = state.todoList.filter((item) => {
        return item.id === action.payload.start;
      })
      console.log(startItem)

      const endItem = state.todoList.filter((item) => {
          return item.id === action.payload.end;
      })

      if(startItem.length !== 1 || endItem.length !== 1) {
          throw new Error('잘못된 값이 입력됨');
      }
      return {
        todoList: state.todoList.map(item => {
          if (action.payload.start === item.id) {
            return endItem[0];
          } else if (action.payload.end === item.id) {
            return startItem[0];
          }
            return item;
          
        })
      }
  }
  if(action.type === ActionType.sortTodo) {
    console.log(action.payload)
    if(action.payload === SortType.ascending){
        return{
          todoList: [...state.todoList.sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          })]
        }
    } else if (action.payload === SortType.descending){
      return{
        todoList: [...state.todoList.sort((a, b) => {
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        })]
      }
    }else if (action.payload === SortType.importance){
      return {
        todoList: [...state.todoList.sort((a, b) => {
        return a.check < b.check ? -1 : a.check > b.check ? 1 : 0;
        })]
      }
    }else if (action.payload === SortType.inputOrder){
      return{
        todoList: [...state.todoList.sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        })]
      }
    }
  }
    return state;
}

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
