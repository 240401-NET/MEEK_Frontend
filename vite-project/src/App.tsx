import './App.css';
import './components/HomePage';
import { HomePage } from './components/HomePage';
import { TeamBuilder } from './components/TeamBuilder';
import { TrainerPage } from './components/TrainerPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
// import { DisplayPokemon } from './components/testComponents/DisplayPokemon';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/trainer' element={<TrainerPage />}></Route>
        <Route path='/teambuilder' element={<TeamBuilder />}></Route>
        <Route path='/displaypokemon' element={<DisplayPokemon />}></Route>
      </Routes>
    </HashRouter>
  )
}
export default App
