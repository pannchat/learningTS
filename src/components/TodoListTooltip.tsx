import React, { Children } from 'react';
import styled from 'styled-components'


const TodoListTitle  = styled.div`
    width:100%;
`;
const TooltipContainer = styled.div`
    position:relative;
    width:100%;
    display:flex;
    flex: 1 1 100%;
    
`;
const Tooltip = styled.div<{show : boolean}>`
    width:100%;
    position:absolute;
    overflow-wrap: break-word;
    top:30px;
    background-color: rgba(0,0,0,1);
    transition: all 0.5s;
    box-sizing: border-box;
    border-radius:5px;
    padding:7px;
    color:white;
    z-index:1;
    animation-name: showTooltip;

    animation-duration: 1s;
    @keyframes showTooltip {
        from { opacity:0 }
        to { opacity:1 }
    }
`;
interface ItemProps {
    children: React.ReactNode,
    TooltipContent:string,
}
interface ItemState{
    onMouseCheck:boolean
}
class TodoListTooltip extends React.Component<ItemProps,ItemState>{
    shouldComponentUpdate(prevProps:ItemProps, prevState:ItemState){
        if(
            prevProps.TooltipContent === this.props.TooltipContent
            && prevState.onMouseCheck === this.state.onMouseCheck
        ) return false;
        else return true;
    }
    componentDidUpdate(){
        // console.log("tooltip")
    }
    state={
        onMouseCheck:false
    }
    handleMouseOver = () => {
        this.setState({
            onMouseCheck:true,
        })
        console.log("onmouseover")
    }
    handleMouseOut = () => {
        this.setState({
            onMouseCheck:false,
        })
        console.log("onmouseout")
    }
    handleDragOver = () => {
        this.setState({
            onMouseCheck:false,
        })
    }
    render(){
        return(
            <TooltipContainer 
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onDragOver={this.handleDragOver}
            >
                <TodoListTitle>
                    {this.props.children}
                </TodoListTitle>
                
                {this.state.onMouseCheck && (
                    <Tooltip show={true}>
                        {this.props.TooltipContent}
                    </Tooltip>)
                }
                
            </TooltipContainer>
        )
    }
}

export default TodoListTooltip;