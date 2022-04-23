// default inputs
import './App.css';
import { useState } from 'react';

// component imports
import Timer from './components/Timer/Timer'
import SettingsScreen from './components/Settings/SettingsScreen'
import SettingsContext from './components/Settings/SettingsContext';




// app component
function App() {
  // state management

  // settings
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);




  return (
    <main>
      <SettingsContext.Provider value={{
        // added context to use in settings and time components
        workTime,
        breakTime,
        setWorkTime,
        setBreakTime,
        showSettings,
        setShowSettings
      }}>
        {showSettings ? <SettingsScreen /> : <Timer />}
      </SettingsContext.Provider>

    </main>
  );
}

export default App;
