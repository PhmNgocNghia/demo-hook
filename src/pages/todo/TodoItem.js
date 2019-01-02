import React, { useState } from "react";
import useToggle from "../../hooks/useToggler";

const TodoItem = React.memo(({todo:
  { name, completed}, onToggle, onEdit, onDelete
}) => {
  const { editTodoNameText, setEditTodoNameText } = useState("");
  const { editTodoNameErr, setEditTodoErr } = useState("") 

  const onOpen = (() => {
    setEditTodoNameText(name);
  }).bind(this)
  

  const { isToggle, toggle } = useToggle(onOpen);


  const editTodoNameFunc = () => {
    if (editTodoNameText === '') {
        setEditTodoErr('Name field must not be left empty')
    } else {
      onEdit({
        name: editTodoNameText,
        completed
      })
    }
  }

  const deleteTodoFunc = () => {
    if (console.confirm('Do you want to delete this todo ?') === true) {
      onDelete()
    }
  }

  const renderTodoItem = () => {
    return (
      <>
      {!isToggle ? (
        <div>
            <input type="checkbox" value={completed} onClick={()=>{
              onToggle()
              onOpen()
            }} />
            {`name: ${name} / completed: ${completed}`}
            <button onClick={toggle}>edit</button>
            <button onClick={deleteTodoFunc}>delete</button>
        </div>
        ): (
            <div>
              {editTodoNameErr}
              name: <input type="text" value={editTodoNameText} />
              <button onClick={editTodoNameFunc}>save edit</button>
            </div>
        )}
        <hr/>
      </>
    )
  }

  return (<div>
    {renderTodoItem()}
  </div>);
});

export default TodoItem;
