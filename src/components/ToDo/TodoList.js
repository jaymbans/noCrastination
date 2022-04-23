import React, { useState } from 'react'
import ToDoForm from './ToDoForm';
import Todo from './Todo';
import useLocalStorage from '../../utilities/useLocalStorage';

function TodoList() {

  const [storage, setStorage] = useLocalStorage('tasks', []);

  const [taskList, setTaskList] = useState(storage);

  const addTask = task => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return
    }
    const newTasks = [task, ...taskList];
    setTaskList(newTasks);
    setStorage(newTasks);
  }

  const completeTask = id => {
    let updatedTasks = taskList.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }

      return task
    })
    setTaskList(updatedTasks);
    setStorage(updatedTasks);
  }

  const removeTask = id => {
    const removeArr = [...taskList].filter(task => task.id !== id);

    setTaskList(removeArr);
    setStorage(removeArr);
  }

  const updateTask = (taskId, newVal) => {
    if (!newVal.text || /^\s*$/.test(newVal.text)) {
      return
    }

    setTaskList(prevTasks => prevTasks.map(task => (task.id === taskId ? newVal : task)))
    setStorage(prevTasks => prevTasks.map(task => (task.id === taskId ? newVal : task)))
  }


  return (
    <div>
      <h1>What's on Your Agenda?</h1>
      <ToDoForm onSubmit={addTask} />
      <Todo
        tasks={taskList}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  )
}

export default TodoList
