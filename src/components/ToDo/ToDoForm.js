// imports
import React, { useState, useEffect, useRef } from 'react';

function ToDoForm(props) {

  const [taskInput, setTaskInput] = useState(props.edit ? props.edit.value : '');
  // const [taskList, setTaskList] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })


  const handleChange = e => {
    setTaskInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: taskInput
    });

    setTaskInput('');
  }



  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input type='text'
        placeholder='Add Task'
        value={taskInput}
        name='text'
        className='todo-input'
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">Add</button>
    </form>

  )
}

export default ToDoForm;