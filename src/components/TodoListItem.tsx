import React,{PureComponent} from 'react';
import styled from 'styled-components'
import { HiBadgeCheck, HiOutlineBadgeCheck, HiTrash,HiPencil, HiXCircle } from 'react-icons/hi'

import TodoListTooltip from './TodoListTooltip'
import styles from './style.module.scss'

const RemoveBtn = styled.div`
    opacity:0.2;
    &:hover{
        cursor:pointer;
        opacity:1;
    }
`;

const Button = styled.div`
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
const Input = styled.input`
    width:100%;
`;
interface ItemProps {
    todoItem: {
        id: string,
        title: string,
        check: boolean,
    },
    onToggle(id: string): void,
    onRemove(id: string): void,
    onSwapItem(start: string, end: string): void,
    handleItemUpdate(todo:object): void,
}
interface ItemState{
    editMode : boolean,
    editText : string
}
class TodoListItem extends React.Component<ItemProps, ItemState> {
    // shouldComponentUpdate(prevProps:ItemProps){
    //     if (prevProps.todoItem.check === this.props.todoItem.check) return false;
    //     return true;
    // }
    state={
        editMode:false,
        editText : this.props.todoItem.title,
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
    handleChangeEditInput = (targetValue:string) =>{
        this.setState({
            editText:targetValue
        })
    }
    handleClickUpdate = () => {
        const {id,check} = this.props.todoItem;
        const editTodoItem = {id:id, title:this.state.editText, check:check}
        this.props.handleItemUpdate(editTodoItem)
        this.setState({
            editMode : false,
        })
        // this.props.handleItemUpdate();
    }
    handleTodoDoubleClick = () => {
        this.setState({editMode:true});
        if(this.editInput.current) this.editInput.current.focus()
    }
    handleClickCancelButton = () => {
        this.setState({
            editMode:false,
            editText: this.props.todoItem.title
        })
    }
    handleEditInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && this.state.editText) {
            this.handleClickUpdate();
        }
    }
    editInput = React.createRef<HTMLInputElement>();
    render() {
        
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
                    {this.state.editMode
                        ?(
                        <>
                            <Input value={this.state.editText}
                                ref={this.editInput}
                                onChange={(e)=>this.handleChangeEditInput(e.target.value)}
                                onKeyUp={this.handleEditInputKeyUp}
                                >   
                            </Input>
                            <ButtonContainer>
                                <Button>
                                    <HiPencil size={30} onClick={this.handleClickUpdate}/>
                                </Button> 
                                <Button>
                                    <HiXCircle size={30} onClick={this.handleClickCancelButton}/>
                                </Button>    
                            </ButtonContainer>
                        </>
                        )
                        :(<>
                        <TodoListTooltip TooltipContent={this.props.todoItem.title}>
                            <Todolist onDoubleClick={this.handleTodoDoubleClick}>
                                    {this.props.todoItem.title}
                            </Todolist>
                        </TodoListTooltip>
                        <ButtonContainer>
                        <Button>
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
                        </Button>
                        <RemoveBtn onClick={this.handleClickRemoveButton}>
                            <HiTrash size={30} />
                        </RemoveBtn>
                    </ButtonContainer>
                    </>)
                    }
                    
                   

                </ItemContainer>
            </>
        )
    }
}

export default TodoListItem;