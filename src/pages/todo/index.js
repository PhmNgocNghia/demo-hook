import React, { useReducer, useMemo } from "react";
import TodoItem from "./TodoItem";
import useInputValue from "../../hooks/useInputValue";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return [...state.splice(action.index)];
    case "EDIT_TODO":
      var clonedState = [ ...state ];
      clonedState[action.index] = action.payload;
      return clonedState
    case "TOGGLE_TODO":
      var clonedState = [ ...state ];
      clonedState[action.index].completed = !clonedState[action.index].completed;
      return clonedState
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
    if (addTodoText.value != "") {
      dispatchTodo({
        type: "ADD_TODO",
        payload: {
          name: addTodoText.value,
          completed: false
        }
      });
    }
  };

  const editTodo = (index, newValue) => {
    dispatchTodo({
      type: "EDIT_TODO",
      payload: {
        index,
        name: newValue
      }
    });
  };

  const toggleTodo = index => {
    dispatchTodo({
      type: "TOGGLE_TODO",
      index
    });
  };

  const deleteTodo = index => {
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
          onDelete={()=>deleteTodo}
          onToggle={()=>toggleTodo(index)}
        />
      ))}
    </div>
  );
});

export default TodoContainer;
