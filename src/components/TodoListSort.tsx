import React from 'react'
import { connect } from 'react-redux';
import styles from './style.module.scss';

interface TodoProps{
    sortTodo(typeValue:string) :void ,
}

class TodoListSort extends React.Component<TodoProps>{
    render(){
        return(
            <div id={styles['sort-select']}>
                <select name="sorting" onChange={(e)=>this.props.sortTodo(e.target.value)}>
                    <option value="ascending">오름차순</option>
                    <option value="descending">내림차순</option>
                    <option value="importance">중요도순</option>
                </select>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return{

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sortTodo: (typeValue:string) => dispatch({
            type: 'sortTodo',
            payload: typeValue,
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TodoListSort);