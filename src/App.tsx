import React from 'react';
import Input from './components/Input';
import List from './components/List'
import Header from './components/Header'
import styled from 'styled-components'
interface TodoState {
  todolist: { id: number, title: string, check: boolean }[],
  num: number,
  // count: number,
  // checkCount: number,
}
const MainContainer = styled.div`
  display:flex;
  justify-content:center;
`;
const SubContainer = styled.div`
  width:100%;
  max-width:540px;
  display:flex;
  flex-direction:column;
  padding:10px;
  box-sizing:border-box;

`
class App extends React.Component<{}, TodoState>{
  state = {
    todolist: [
      {
        id: 0,
        title: 'todolist 만들기',
        check: true
      },
      {
        id: 1,
        title: '코드리뷰 받기',
        check: true
      },
      {
        id: 2,
        title: '저녁 식사하기',
        check: false
      }
    ],
    num: 3,

  };

  onToggle = (id: number) => {
    const { todolist } = this.state;
    this.setState({
      todolist: todolist.map(el => el.id === id ? { ...el, check: !el.check } : el)
    })

  }
  onRemove = (id: number) => {
    const { todolist } = this.state;
    this.setState({
      todolist: todolist.filter(el => el.id !== id),

    })
  }

  addTodo = (title: string) => {
    const { todolist } = this.state;

    this.setState({
      todolist: todolist.concat({ id: this.state.num, title: title, check: false }),
      num: ++this.state.num,

    })


    //



  }


  render() {
    return (
      <MainContainer>
        <SubContainer>
          <Header
            total={this.state.todolist.length}
            doneCount={this.state.todolist.filter(item => item.check).length} />
          <List todolist={this.state.todolist}
            onRemove={this.onRemove}
            onToggle={this.onToggle} />
          <Input todolist={this.state.todolist} addTodo={this.addTodo} />
        </SubContainer>
      </MainContainer>
    );
  }
}

export default App;
