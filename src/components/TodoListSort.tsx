import React,{PureComponent} from 'react'
import styles from './style.module.scss';
interface TodoProps{
    onChangeSelect(typeValue:string) :void ,
}


class TodoListSort extends React.Component<TodoProps>{
    componentDidUpdate(){
        console.log(
            this.props
        )
    }

    render(){
        const {onChangeSelect} = this.props;
        return(
            <div id={styles['sort-select']}>
                <select name="sorting" onChange={(e)=>onChangeSelect(e.target.value)}>
                    <option value="inputOrder">입력순</option>
                    <option value="ascending">오름차순</option>
                    <option value="descending">내림차순</option>
                    <option value="importance">중요도순</option>
                </select>
            </div>
        )
    }
}

export default TodoListSort;