# TIL

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

# 리덕스
리덕스는 상태관리 라이브러리 입니다. 상태관리란 여러 컴포넌트 간의 데이터 전달과 이벤트 통신을 한 곳에서 관리하는 패턴을 의미합니다. 
리덕스는 Angular, jQuery, vanilla JS등 다양한 framework와 작동되게 설계 되었습니다.

## 왜?
프로젝트의 구조가 단순하다면 local state를 props로 전달 하는 것이 어렵지 않을 것입니다. 하지만 규모가 커지면서 컴포넌트의 수가 늘어 난다면 props drilling을 통한 local state 전달이 어려울 것입니다. 그래서 하나의 store를 두고 store는 상태를 갖습니다, 컴포넌트는 함수를 통해 액션을 리듀서로 전달하고 상태는 리듀서에 의해서만 변경이 가능합니다. 컴포넌트는 이러한 상태를 구독하게 됩니다.


## 3가지 규칙
1. 하나의 애플리케이션 내에는 하나의 스토어가 있습니다.
2. 상태는 읽기전용입니다.
    - 리액트에서는 불변성을 지키기 위해 원본을 건드리지 않고 새로운 객체를 만들어 교체하는 방식으로 업데이트를 합니다. 리덕스에서도 마찬가지로 리덕스에서도 불변성을 유지합니다. 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 ```shallow equality``` 검사를 하기 때문입니다.
3. 변화를 일으키는 함수, 리듀서는 순수함수여야 합니다.
   - 리듀서는 이전 상태와, 액션 객체를 파라미터로 받습니다. 이전 상태는 절대로 건들지 않고, 변화를 일으킨 새로운 상태 객체를 만들어 반환합니다. 똑같은 파라미터로 호출된 리듀서 함수는 언제나 같은 값을 반환해야합니다. 즉 동일한 input은 동일한 output을 반환합니다.
--- 
## sort 함수
```arr.sort([compareFunction])```
> 반환 : 정렬한 배열 원 배열이 정렬됩니다. 복사본이 만들어 지는 것이 아닙니다.


## 변경전

```   
if(action.payload === SortType.ascending){
  return{
    todoList: state.todoList.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    })
  }
}
```
## 변경후 

```   
if(action.payload === SortType.ascending){
  return{
    todoList: [...state.todoList.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    })]
  }
}
```
즉 state를 변경해도 react가 리렌더링을 트리거하지 않습니다. 따라서 새로운 배열을 만들어 리턴해줘야합니다.

