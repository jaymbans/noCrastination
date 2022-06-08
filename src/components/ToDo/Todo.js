import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import { CgCloseR } from 'react-icons/cg';
import { FaRegEdit } from 'react-icons/fa';
import { RiCheckboxBlankCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';


function Todo({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: ''
    })
  }

  if (edit.id) {
    return <ToDoForm edit={edit} onSubmit={submitUpdate} />
  }

  return tasks.map((task, index) => (
    <div className={task.isComplete ? 'task-row complete' : 'task-row'} key={index}>
      {task.isComplete ?
        <RiCheckboxCircleFill
          className='check-icon' />
        : <RiCheckboxBlankCircleFill
          className='check-icon' />}

      <div className='task-text' key={task.id} onClick={() => completeTask(task.id)}>
        {task.text}
      </div>

      <div className="icons">
        <FaRegEdit
          onClick={() => setEdit({ id: task.id, value: task.text })}
          className='edit-icon'
        />
        <CgCloseR
          onClick={() => removeTask(task.id)}
          className='delete-icon'
        />
      </div>
    </div>
  ))
}

export default Todo
