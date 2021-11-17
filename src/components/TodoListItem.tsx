import React,{PureComponent} from 'react';
import styled from 'styled-components'
import { HiBadgeCheck, HiOutlineBadgeCheck, HiTrash } from 'react-icons/hi'
import TodoListTooltip from './TodoListTooltip'
import styles from './style.module.scss'

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
const ButtonContainer = styled.div`
    display:flex;
    flex: 0 0 60px;
    // width:60px;
`;

const ItemContainer = styled.div`
    display:flex;
    margin:10px 0;
    width:100%;
    max-width:500px;
    box-sizing:border-box;

`;

const Todolist = styled.div`

    max-width:420px;
    height:30px;
    line-height:30px;
    vertical-align:middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
`;

interface ItemProps {
    todoItem: {
        id: string,
        title: string,
        check: boolean,
    },
    onToggle(id: string): void,
    onRemove(id: string): void,
    onSwapItem(start: string, end: string): void
}

class TodoListItem extends React.Component<ItemProps> {
    // shouldComponentUpdate(prevProps:ItemProps){
    //     if (prevProps.todoItem.check === this.props.todoItem.check) return false;
    //     return true;
    // }

    componentDidUpdate(){
        console.log(this.props)
    }
    handleItemDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('dragItemId', this.props.todoItem.id.toString());
    }
    handleItemDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    handleClickToggleButton = () => {
        this.props.onToggle(this.props.todoItem.id)
    }
    handleClickRemoveButton = () =>{
        this.props.onRemove(this.props.todoItem.id)
    }
    render() {
        console.log('test11 render item')
        
        return (
            <>
                <ItemContainer 
                    onDragStart={this.handleItemDragStart}
                    onDragOver={this.handleItemDragOver}
                    onDrop={(e) => {
                        this.props.onSwapItem(
                            e.dataTransfer.getData('dragItemId'),
                            this.props.todoItem.id
                        )
                    }}
                    draggable
                >
                    <TodoListTooltip TooltipContent={this.props.todoItem.title}>
                        <Todolist>
                                {this.props.todoItem.title}
                        </Todolist>
                    </TodoListTooltip>
                    <ButtonContainer>
                        <CheckBtn>
                            {this.props.todoItem.check
                                ? <HiBadgeCheck 
                                    size={30} 
                                    onClick={this.handleClickToggleButton}
                                    />
                                : <HiOutlineBadgeCheck 
                                    size={30} 
                                    onClick={this.handleClickToggleButton} 
                                />
                            }
                        </CheckBtn>
                        <RemoveBtn onClick={this.handleClickRemoveButton}>
                            <HiTrash size={30} />
                        </RemoveBtn>
                    </ButtonContainer>
                </ItemContainer>
            </>
        )
    }
}

export default TodoListItem;