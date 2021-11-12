## review
변수 네이밍 신경쓰기
코딩 컨벤션 잘 지키기
```
//잘못된 예
class Input extends React.Component<ItemProps,any> 
//올바른 예 
class Input extends React.Component<ItemProps> {
```

```
  <InputBox
    ref={this.todoInput}
    value={this.state.value}
    onKeyUp={this.handleKeyUp}
    onChange={this.onChange}
  />
```

값은 위쪽에 handler나 function은 아래쪽에
```
interface TodoState {
  todolist: { id: number, title: string, check: boolean }[],
  num: number,
}
```

배열 타입설정은 이런식으로 할 수 있다.
