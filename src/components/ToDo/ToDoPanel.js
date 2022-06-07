// import components
import ToDoList from './TodoList';
import { useContext } from 'react';
import ToDoContext from './ToDoContext';

function ToDoPanel() {
  return (
    <div className='todoPanel'>
      <ToDoList />
    </div>
  )
}

export default ToDoPanel;


