import React from 'react';
import TodoListInput from './components/TodoListInput';
import TodoList from './components/TodoList'
import Header from './components/Header'
import styled from 'styled-components'
import TodoListSort from './components/TodoListSort'
import { v4 as uuidv4 } from 'uuid';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux'

const MainContainer = styled.div`
    display:flex;
    justify-content:center;

`;

const SubContainer = styled.div`
    width:300px;
    height:80vh;
    background-color:#fcc419;
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
const Division = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;
const LeftSide = styled.div`
    width:100%;
    height:80vh;

    &>div{
        font-size:90px;
        display: table-cell;
        // vertical-align: top;
        // height:90px;
        // line-height:50px;
        writing-mode: vertical-lr
    }
`;
const RightSide = styled.div`
    width:100%;
    height:80vh;
`;
class App extends React.Component<TodoState>{

    render() {
        return (
            <Division>  
                <LeftSide>
                    <div>2021
                        <div>11</div>
                    </div>
                </LeftSide>
                
                <MainContainer>
                    <SubContainer>
                        <Header />
                        <TodoListSort/>
                        <TodoList/>
                
                        <TodoListInput/>

                    </SubContainer>
                </MainContainer>

                <RightSide>
                    test
                </RightSide>
            </Division>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        todoList: state.todoList
    }
}

export default connect(mapStateToProps)(App);

