import './App.css';
import './pages/HomePage.tsx';
import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { HomePageRenderer } from './pages/HomePage.tsx';
// import { TeamBuilder } from './components/TeamBuilder';
import { TrainerPage } from './pages/TrainerPage.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DisplayPokemon from './components/testComponents/DisplayPokemon.tsx';
// import PokemonTeamBuilder from './pages/PokemonTeamBuilder.tsx';
// import PokemonTeamCreator from './components/pokemonComponents/PokemonTeamCreator.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import TeamCreator from './pages/TeamCreator.tsx'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/otherhome' element={<HomePageRenderer />}></Route>
          <Route path='/login' element={<Login username={''} password={''} />}></Route>
          <Route path='/signup' element={<SignUp username={''} email={''} password={''} />}></Route>a
          <Route path='/trainer' element={<TrainerPage />}></Route>
          {/* <Route path='/pokemonTeamBuilder' element={<PokemonTeamBuilder/>}></Route> */}
          <Route path='/teamcreator' element={<TeamCreator></TeamCreator>}></Route>
          {/* <Route path='/show' element = {<PokemonTeamCreator/>}></Route> */}
        </Routes>
      </AuthProvider>
    </Router>
  )
}
export default App
