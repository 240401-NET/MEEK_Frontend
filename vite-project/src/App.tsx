import './App.css';
import './pages/HomePage.tsx';
import { HomePageRenderer } from './pages/HomePage.tsx';
// import { TeamBuilder } from './components/TeamBuilder';
import { TrainerPage } from './pages/TrainerPage.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DisplayPokemon from './components/testComponents/DisplayPokemon.tsx';
import PokemonTeamBuilder from './pages/PokemonTeamBuilder.tsx';
// import PokemonTeamCreator from './components/pokemonComponents/PokemonTeamCreator.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePageRenderer />}></Route>
        <Route path='/trainer' element={<TrainerPage />}></Route>
        <Route path='/pokemonTeamBuilder' element={<PokemonTeamBuilder/>}></Route>
        {/* <Route path='/show' element = {<PokemonTeamCreator/>}></Route> */}
      </Routes>
    </Router>
  )
}
export default App
