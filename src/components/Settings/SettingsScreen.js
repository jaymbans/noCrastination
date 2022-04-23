import ReactSlider from 'react-slider';
import './slider.css';
import { useContext } from 'react';
import SettingsContext from './SettingsContext';
import BackButton from './BackButton';

function SettingsScreen() {
  // grab the timer settings
  const timerInfo = useContext(SettingsContext);

  return (
    <div className={'settings'} style={{ textAlign: 'left' }}>
      <div>Settings:</div>
      <div className={'work-break'}>
        <label className={'slider-label'}>Work Timing (min): {timerInfo.workTime}:00</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={timerInfo.workTime}
          min={1}
          max={60}
          onChange={newTime => timerInfo.setWorkTime(newTime)}
        />
        <label>Break Timing (min): {timerInfo.breakTime}:00</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={timerInfo.breakTime}
          min={1}
          max={60}
          onChange={newTime => timerInfo.setBreakTime(newTime)}
        />
        <BackButton onClick={() => timerInfo.setShowSettings(false)} />
      </div>
    </div>
  )
};

export default SettingsScreen;