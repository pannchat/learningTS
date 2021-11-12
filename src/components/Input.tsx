import React from 'react';
import styled from 'styled-components';
import { HiChatAlt } from 'react-icons/hi'

interface ItemProps {
    todolist: {
        id: number,
        title: string,
        check: boolean,
    }[],
    addTodo(title: string): void,
}

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

class Input extends React.Component<ItemProps> {
    state = {
        value: "",
    }

    todoInput = React.createRef<HTMLInputElement>();

    addItem = () => {
        this.props.addTodo(this.state.value)
        this.setState({ value: "" });
        this.todoInput.current?.focus();

    }

    handleKeyUp = (e: any) => {
        if (e.key == "Enter" && this.state.value) {
            this.addItem();
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value })
    }

    render() {
        return (
            <InputContainer>
                <InputBox
                    ref={this.todoInput}
                    value={this.state.value}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.onChange}
                />
                <SendBtn><HiChatAlt className="icon" onClick={this.addItem} size={30} /></SendBtn>
            </InputContainer>
        )
    }
}

export default Input;