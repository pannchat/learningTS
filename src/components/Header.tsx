import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

interface todoProps {
    todolist: {
        id: string,
        title: string,
        check: boolean,
    }[],
}

const HeadCotainer = styled.div`

    border-bottom:solid 2px black;

    border-radius:10px 10px 0 0;
    color:black;
    font-size:20pt;
    font-weight:bold;
`;

const Total = styled.div`
    display:flex;
    justify-content:end;
    & > b{
        color:#1098ad;to
    }
`;

class Header extends React.Component<todoProps> {

    render() {
        const total = this.props.todolist.length;
        const doneCount = this.props.todolist.filter(item => item.check).length;
        return (
            <>
                <Total>total : {total}/<b>{doneCount}</b></Total>
                <HeadCotainer>
                    TodoList
                </HeadCotainer>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return{
        todolist: state.todoList
    }
} 

export default connect(mapStateToProps) (Header);