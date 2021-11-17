import React,{PureComponent} from 'react';
import styled from 'styled-components';
import { HiChatAlt } from 'react-icons/hi'

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
    // shouldComponentUpdate(prevProps:ItemProps, prevState:ItemState){
    //     if(
    //         prevState.inputValue === this.state.inputValue 
    //         && prevProps.todolist === this.props.todolist
    //         && prevProps.addTodo === this.props.addTodo
    //     ){  return false }
    //     return true;
    // }
    state = {
        inputValue: "테스트 입력값 입니다. 테스트 입력값 입니다. 테스트 입력값 입니다. 테스트 입력값 입니다.",
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

export default TodoListInput;