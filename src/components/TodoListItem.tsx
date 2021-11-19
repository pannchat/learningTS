import React from 'react';
import styled from 'styled-components'
import { HiBadgeCheck, HiOutlineBadgeCheck, HiTrash,HiPencil, HiXCircle } from 'react-icons/hi'

import TodoListTooltip from './TodoListTooltip'
import {connect} from 'react-redux'

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
    removeTodo(id:string):void,
    toggleTodo(id:string):void,
    updateTodo(todo: {id:string, title:string, check:boolean}):void,
    swapItemTodo(swapItem:{start:string, end:string}):void,

}
// interface ItemState{
//     editMode : boolean,
//     editText : string
// }
// ItemProps, ItemState
class TodoListItem extends React.Component<ItemProps> {
 
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
        this.props.toggleTodo(this.props.todoItem.id)
    }
    handleClickRemoveButton = () =>{
        this.props.removeTodo(this.props.todoItem.id)
    }
    handleChangeEditInput = (targetValue:string) =>{
        this.setState({
            editText:targetValue
        })
    }
    handleClickUpdate = () => {
        const {id,check} = this.props.todoItem;
        const editTodoItem = {id:id, title:this.state.editText, check:check}
        this.props.updateTodo(editTodoItem)
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
                        const startItem = e.dataTransfer.getData('dragItemId')
                        const endItem = this.props.todoItem.id
                        this.props.swapItemTodo(
                            {start:startItem, end:endItem}
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
const mapStateToProps = (state: any) => {
    return {

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        removeTodo: (id: string) => dispatch({
            type: 'removeTodo',
            payload: id,
        }),
        toggleTodo: (id: string) => dispatch({
            type: 'toggleTodo',
            payload: id,
        }),
        updateTodo: (todo: {id:string, title:string, check:false}) => dispatch({
            type: 'updateTodo',
            payload: todo,
        }),
        swapItemTodo: (swapItem : {start:string, end:string}) => dispatch({
            type: 'swapItemTodo',
            payload: swapItem,
        })
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (TodoListItem);