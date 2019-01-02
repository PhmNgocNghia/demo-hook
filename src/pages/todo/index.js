import React, { useReducer, useMemo } from "react";
import TodoItem from "./TodoItem";
import useInputValue from "../../hooks/useInputValue";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
    const clonedState = [...state]
      return [...state, action.payload];
    case "DELETE_TODO":
      var clonedState = [...state]
      clonedState.splice(action.index,1)
      return clonedState
    case "EDIT_TODO":
      var clonedState1 = [ ...state ];
      clonedState1[action.index] = action.payload;
      return clonedState1
    case "TOGGLE_TODO":
      var clonedState2 = [ ...state ];
      clonedState2[action.index].completed = !clonedState2[action.index].completed;
      return clonedState2
    default:
      return state;
  }
};

const TodoContainer = React.memo(() => {
  const [todos, dispatchTodo] = useReducer(reducer, []);

  const filterTextValue = useInputValue("");
  const addTodoText = useInputValue("");

  const filterTodos = useMemo(
    () => {
      return todos.filter(todo=>todo.name.includes(filterTextValue.value));
    },
    [filterTextValue.value, todos]
  );

  const addTodo = () => {
    if (addTodoText.value !== "") {
      dispatchTodo({
        type: "ADD_TODO",
        payload: {
          name: addTodoText.value,
          completed: false
        }
      });
      addTodoText.SetValue("")
    }
  };

  const editTodo = (newValue, index) => {
    dispatchTodo({
      type: "EDIT_TODO",
      index,
      payload: newValue
    });
  };

  const toggleTodo = index => {
    dispatchTodo({
      type: "TOGGLE_TODO",
      index
    });
  };

  const deleteTodo = index => {
    debugger
    dispatchTodo({
      type: "DELETE_TODO",
      index
    });
  };

  return (
    <div>
      filter todo: <input {...filterTextValue} />
      <hr />
      <input {...addTodoText} />
      <button onClick={addTodo}>add</button>
      <hr />
      {filterTodos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={index}
          onEdit={newTodo => editTodo(newTodo, index)}
          onDelete={()=>deleteTodo(index)}
          onToggle={()=>toggleTodo(index)}
        />
      ))}
    </div>
  );
});

export default TodoContainer;
