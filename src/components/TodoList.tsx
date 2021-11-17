import React, { PureComponent } from 'react';
import styled from 'styled-components'
import { textSpanIntersectsWithPosition } from 'typescript';
import TodoItem from './TodoListItem';
import styles from './style.module.scss'

interface ItemProps {
    todolist: {
        id: string,
        title: string,
        check: boolean,
    }[],
    onToggle(id: string): void,
    onRemove(id: string): void,
    onSwapItem(start: string, end: string): void
}

const EmptyTodolist = styled.div`
    display:flex;
    width:100%;
    height:300px;
    justify-content:center;
    align-items:center;
    color:#aaa;
    font-size:20pt;
`;
const TodoListContainer = styled.div`
    width:100%;
    max-width: 500px;
`;
class TodoList extends PureComponent<ItemProps>{
    componentDidUpdate(){
        console.log("Update")
    }
    render() {
        
        return (
            <TodoListContainer>
                {this.props.todolist.length !== 0
                ? this.props.todolist.map(item => (
                    <TodoItem key={item.id}
                        todoItem={item}
                        onToggle={this.props.onToggle}
                        onRemove={this.props.onRemove}
                        onSwapItem={this.props.onSwapItem}
                    />
                ))
                : (<EmptyTodolist>
                    오늘 할 일을 추가해보세요.
                </EmptyTodolist>)
            }
            </TodoListContainer>
        )
    }
}


export default TodoList;