// default inputs
import './App.css';
import { useState } from 'react';


// component imports
import Timer from './components/Timer/Timer';
import SettingsScreen from './components/Settings/SettingsScreen';
import SettingsContext from './components/Settings/SettingsContext';
import ToDoContext from './components/ToDo/ToDoContext';
import ToDoPanel from './components/ToDo/ToDoPanel';



// app component
function App() {
  // state management

  // settings
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [showTasks, setShowTasks] = useState(false);


  const renderTasks = () => {
    if (showTasks & !showSettings) {
      return <ToDoPanel />
    }
    return
  }


  return (
    <main>
      <SettingsContext.Provider value={{
        // added context to use in settings and time components
        workTime,
        breakTime,
        setWorkTime,
        setBreakTime,
        showSettings,
        setShowSettings,
        showTasks,
        setShowTasks
      }}>
        {showSettings ? <SettingsScreen /> : <Timer />}
        {renderTasks()}
      </SettingsContext.Provider>


    </main>
  );
}

export default App;
