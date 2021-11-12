import React from 'react';
import styled from 'styled-components'
interface todoProps {
    total: number,
    doneCount: number
}
// interface todoState {
//     count: number
// }
const HeadCotainer = styled.div`
background-color:#e9ecef;
border:solid 1px #ced4da;
padding:10px;
border-radius:10px 10px 0 0;
color:#1098ad;
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

    componentDidMount() {

    }
    render() {
        return (
            <>
                <Total>total : {this.props.total}/<b>{this.props.doneCount}</b></Total>
                <HeadCotainer>
                    TodoList
                </HeadCotainer>
            </>
        )
    }
}

export default Header;