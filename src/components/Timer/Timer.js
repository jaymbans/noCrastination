// Timer portion of the app
import PlayButton from '../PlayButton/PlayButton'

// importing progressbar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// component imports
import PauseButton from '../PauseButton/PauseButton';
import SettingsButton from '../Settings/SettingsButton';
import TodoButton from '../ToDo/ToDoButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../Settings/SettingsContext';


function Timer() {
  // contexts
  const settingsInfo = useContext(SettingsContext);

  // states
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); //can be work, break, or null
  const [secsLeft, setSecsLeft] = useState(0);


  // references
  const secsLeftRef = useRef(secsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  const countDown = () => {
    secsLeftRef.current--; //sends the seconds left to the timer -1 second
    setSecsLeft(secsLeftRef.current);
  }




  const startTimer = () => {
    secsLeftRef.current = settingsInfo.workTime * 60;
    setSecsLeft(secsLeftRef.current);
  }


  const toggleMode = () => {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workTime : settingsInfo.breakTime) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecsLeft(nextSeconds);
    secsLeftRef.current = nextSeconds;
  }

  useEffect(() => {
    startTimer();

    const timeInterval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }

      if (secsLeftRef.current === 0) {
        return toggleMode()
      }

      countDown();
    }, 1000)
    return () => clearInterval(timeInterval);
  }, [settingsInfo]);





  const totalSecs = mode === 'work'
    ? settingsInfo.workTime * 60
    : settingsInfo.breakTime * 60;

  const percentageTimeLeft = Math.round(secsLeft / totalSecs * 100);

  const mins = Math.floor(secsLeft / 60);
  let secs = secsLeft % 60;
  if (secs < 10) {
    secs = `0${secs}`
  }

  return (
    <div>
      <CircularProgressbar
        value={percentageTimeLeft}
        text={`${mins}:${secs}`}
        background={true}
        styles={buildStyles({
          textColor: 'white',
          pathColor: 'white',
          trailColor: 'rgb(57, 182, 254)', backgroundColor: 'rgb(57, 182, 254)',
          backgroundPadding: '100',
        })}
      />
      <div className={'play-pause'}>
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}
      </div>
      <div className={'edit-buttons'}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
        <TodoButton onClick={() => settingsInfo.setShowTasks(true)} />
      </div>
    </div>

  )
}

export default Timer;


