import React from 'react';
import styled from 'styled-components'
import { HiBadgeCheck, HiOutlineBadgeCheck, HiTrash } from 'react-icons/hi'

interface ItemProps {
    todoItem: {
        id: number,
        title: string,
        check: boolean,
    },
    onToggle(id: number): void,
    onRemove(id: number): void,
}

const RemoveBtn = styled.div`
    opacity:0.2;
    &:hover{
        cursor:pointer;
        opacity:1;
    }
`;

const CheckBtn = styled.div`
    opacity:0.5;
    &:hover{
        cursor:pointer;
        opacity:1;
    }
`;

const ItemContainer = styled.div`
    display:flex;
    margin:10px 0;
`;

const Todolist = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    padding:5px;
`;

class Item extends React.Component<ItemProps> {

    render() {
        return (
            <>
                <ItemContainer>
                    <Todolist>{this.props.todoItem.title}</Todolist>
                    <CheckBtn>
                        {this.props.todoItem.check
                            ? <HiBadgeCheck size={30} onClick={() =>
                                this.props.onToggle(this.props.todoItem.id)} />
                            : <HiOutlineBadgeCheck size={30} onClick={() =>
                                this.props.onToggle(this.props.todoItem.id)} />
                        }
                    </CheckBtn>
                    <RemoveBtn onClick={() => this.props.onRemove(this.props.todoItem.id)}>
                        <HiTrash size={30} />
                    </RemoveBtn>
                </ItemContainer>
            </>
        )
    }
}

export default Item;