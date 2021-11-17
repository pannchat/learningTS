TIL
    - 변수,함수명은 길어져도 명확하게
  - Props, State Generic으로 타입 지정하기
  - ref 사용시에 current접근할 때는 옵셔널 체이닝보다 
    ``` 
    if (this.todoInput.current) {
        this.todoInput.current.focus();
    }
    ```
    위와 같이 처리해주기.
    
  - 배열의 index에 접근해야할 경우 해당 배열의 length를 체크 해주기
    ```
    const startItem = this.state.todoList.filter((item) => {
        return item.id === start;
    })

    const endItem = this.state.todoList.filter((item) => {
        return item.id === end;
    })

    if(startItem.length !== 1 || endItem.length !== 1) {
        throw new Error('잘못된 값이 입력됨');
    }
    ``` 
