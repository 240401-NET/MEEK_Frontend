import './App.css';
import './components/HomePage';
import { HomePage } from './components/HomePage';
import { TeamBuilder } from './components/TeamBuilder';
import { TrainerPage } from './components/TrainerPage';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/trainer' element={<TrainerPage />}></Route>
        <Route path='/teambuilder' element={<TeamBuilder />}></Route>
      </Routes>
    </HashRouter>
  )
}
export default App
