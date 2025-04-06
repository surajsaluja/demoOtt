import './App.css';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import AppNavigation from './Navigation/AppNavigation';
import AppNavigationv5 from './Navigation/AppNavigationv5';
import { useEffect } from 'react';
// import {Outlet} from 'react-router-dom'

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center'
});



function App() {

  useEffect(()=>{
    console.log(window.tizen);
    },[])

  return (
    <div className="App">
      <AppNavigationv5 />
    </div>
  );
}

export default App;
