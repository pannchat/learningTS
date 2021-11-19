import React from 'react';
import styled from 'styled-components'
import { textSpanIntersectsWithPosition } from 'typescript';
import TodoItem from './TodoListItem';
import styles from './style.module.scss'
import { connect } from 'react-redux';

interface ItemProps {
    todolist: {
        id: string,
        title: string,
        check: boolean,
    }[],
    
}

const EmptyTodolist = styled.div`
    display:flex;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    color:#aaa;
    font-size:20pt;
`;
const TodoListContainer = styled.div`
    width:100%;
    height:100%;
    max-width: 500px;
`;
class TodoList extends React.Component<ItemProps>{

    render() {
        console.log('test11 TodoList', this.props.todolist)
        return (
            <TodoListContainer>
                {this.props.todolist.length !== 0
                ? this.props.todolist.map(item => (
                    <TodoItem key={item.id} todoItem={item}/>
                ))
                : (<EmptyTodolist>
                    오늘 할 일을 추가해보세요.
                </EmptyTodolist>)
            }
            </TodoListContainer>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        todolist: state.todoList,
    }
}

export default connect(mapStateToProps) (TodoList);