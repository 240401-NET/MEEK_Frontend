import './App.css';
import './components/HomePage';
import { HomePageRenderer } from './components/HomePage';
import { TeamBuilder } from './components/TeamBuilder';
import { TrainerPage } from './components/TrainerPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayPokemon from './components/testComponents/DisplayPokemon.tsx';
import PokemonTeamBuilder from './pages/PokemonTeamBuilder.tsx';
// import PokemonTeamCreator from './components/pokemonComponents/PokemonTeamCreator.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePageRenderer />}></Route>
        <Route path='/trainer' element={<TrainerPage />}></Route>
        <Route path='/teambuilder' element={<TeamBuilder />}></Route>
        <Route path='/displaypokemon' element={<DisplayPokemon />}></Route>
        <Route path='/savepokemon' element={<PokemonTeamBuilder/>}></Route>
        {/* <Route path='/show' element = {<PokemonTeamCreator/>}></Route> */}
      </Routes>
    </Router>
  )
}
export default App
