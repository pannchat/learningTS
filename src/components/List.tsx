import React from 'react';
import styled from 'styled-components'
import Item from './Item';

interface ItemProps {
    todolist: {
        id: number,
        title: string,
        check: boolean,
    }[],
    onToggle(id: number): void,
    onRemove(id: number): void,
    // onCheckCount(): void,
}
class List extends React.Component<ItemProps>{


    render() {
        // this.state.todolist.map((item: any) => console.log(item.id));
        return (
            <>
                {this.props.todolist.map(items => (
                    <Item key={items.id}
                        todoItem={items}
                        onToggle={this.props.onToggle}
                        onRemove={this.props.onRemove}
                    />
                ))}
            </>
        )
    }
}

export default List;