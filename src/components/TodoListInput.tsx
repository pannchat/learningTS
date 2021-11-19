import React from 'react';
import styled from 'styled-components';
import { HiChatAlt } from 'react-icons/hi'
import { connect } from 'react-redux';

const InputContainer = styled.div`
    background-color:#e9ecef;
    border-radius:5px;
    padding:10px;
    display:flex;

`;

const InputBox = styled.input`
    width:100%;
    border:none;
    &:focus{
        outline:none;
    }
`;

const SendBtn = styled.div`
    &:hover{
        cursor:pointer;
    }
`;

interface ItemProps {
    todolist: {
        id: string,
        title: string,
        check: boolean,
    }[],
    addTodo(title: string): void,
}

interface ItemState {
    inputValue : string
}
class TodoListInput extends React.Component<ItemProps,ItemState> {

    state = {
        inputValue: "",
    }
    todoInput = React.createRef<HTMLInputElement>();

    addItem = () => {
        this.props.addTodo(this.state.inputValue)
        this.setState({ inputValue: "" });

        if (this.todoInput.current) {
            this.todoInput.current.focus();
        }
    }

    handleClickSendBtn = () => {
        this.addItem();
    }

    handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && this.state.inputValue) {
            this.addItem();
        }
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value })
    }

    render() {
        return (
            <InputContainer>
                <InputBox
                    ref={this.todoInput}
                    value={this.state.inputValue}
                    onKeyUp={this.handleInputKeyUp}
                    onChange={this.handleInputChange}
                />
                <SendBtn>
                    <HiChatAlt 
                        className="icon" 
                        onClick={this.handleClickSendBtn}
                        size={30}
                    />
                </SendBtn>
            </InputContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        todolist: state.todolist,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addTodo: (title: string) => dispatch({
            type: 'addTodo',
            payload: title,
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListInput);