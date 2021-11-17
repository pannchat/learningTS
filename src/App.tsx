import React from 'react';
import TodoListInput from './components/TodoListInput';
import TodoList from './components/TodoList'
import Header from './components/Header'
import styled from 'styled-components'
import TodoListSort from './components/TodoListSort'
import { v4 as uuidv4 } from 'uuid';

const MainContainer = styled.div`
    display:flex;
    justify-content:center;
`;

const SubContainer = styled.div`
    width:500px;
    display:flex;
    flex-direction:column;
    padding:10px;
    box-sizing:border-box;
`

interface TodoState {
    todoList: {
        id: string,
        title: string,
        check: boolean
    }[],
}

enum SortType {
    'inputOrder' = 'inputOrder',
    'ascending' = 'ascending',
    'descending' = 'descending',
    'importance' = 'importance'
}

class App extends React.Component<{}, TodoState>{
    state: TodoState = {
        todoList: [],
    };

    componentDidMount() {
        // const data = [];
        // for (let index = 0; index < 2000; index++) {
        //     data.push({
        //         id: uuidv4(),
        //         title: 'test' + index.toString(),
        //         check: false,
        //     })
        // }

        // this.setState({
        //     todoList: data
        // })
    }

    handleToggle = (id: string) => {
        const { todoList } = this.state;
        this.setState({
            todoList: todoList.map(item => item.id === id ? 
                { 
                    ...item, 
                    check: !item.check 
                } : item
            )
        })
    }

    handleRemove = (id: string) => {
        const { todoList } = this.state;
        this.setState({
            todoList: todoList.filter(item => item.id !== id),
        })
    }

    handleAddTodo = (title: string) => {
        const { todoList } = this.state;
        const newTodo = {
            id: uuidv4(),  
            title: title, 
            check: false 
        };

        this.setState({
            todoList: todoList.concat(newTodo),
        })
    }

    handleChangeSelect = (typeValue: SortType) => {
        const { todoList } = this.state;
        switch (typeValue) {
            case SortType.ascending:
                this.setState({
                    todoList: todoList.sort((a, b) => {
                        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                    })
                })
                break;
            case SortType.descending:
                this.setState({
                    todoList: todoList.sort((a, b) => {
                        return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
                    })
                })
                break;
            case SortType.importance:
                this.setState({
                    todoList: todoList.sort((a, b) => {
                        return a.check < b.check ? -1 : a.check > b.check ? 1 : 0;
                    })
                })
                break;
            case SortType.inputOrder:
                this.setState({
                    todoList: todoList.sort((a, b) => {
                        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
                    })
                })
                break;
        }
    }

    handleSwapItem = (start: string, end: string) => {
        const startItem = this.state.todoList.filter((item) => {
            return item.id === start;
        })

        const endItem = this.state.todoList.filter((item) => {
            return item.id === end;
        })

        if(startItem.length !== 1 || endItem.length !== 1) {
            throw new Error('잘못된 값이 입력됨');
        }

        this.setState({
            todoList: this.state.todoList.map((item) => {
                if (start === item.id) {
                    return endItem[0];
                } else if (end === item.id) {
                    return startItem[0];
                }

                return item;
            })
        });
    }

    render() {
        const doneCount = this.state.todoList.filter(item => item.check).length;
        return (
            <>  

                <MainContainer>
                    <SubContainer>
                        <Header
                            total={this.state.todoList.length}
                            doneCount={doneCount} />
                        <TodoListSort onChangeSelect={this.handleChangeSelect} />
                        <TodoList todolist={this.state.todoList}
                            onRemove={this.handleRemove}
                            onToggle={this.handleToggle}
                            onSwapItem={this.handleSwapItem}
                        />
                
                        <TodoListInput 
                            todolist={this.state.todoList} 
                            addTodo={this.handleAddTodo}
                        />

                    </SubContainer>
                </MainContainer>
            </>
        );
    }
}

export default App;

