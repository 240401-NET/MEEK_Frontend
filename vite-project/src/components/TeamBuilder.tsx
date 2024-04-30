import './TeamBuilder.css'
import {NavLink as Link} from "react-router-dom"
// import PokemonTeamCreator from './pokemonComponents/PokemonTeamCreator'
// import PokemonTeamBuilder from '../pages/PokemonTeamBuilder'

export function TeamBuilder()
{
    return (
        <div>
            <Link to="/trainer">
                <button>Show all trainer teams</button>
            </Link>
            <Link to="/">
                <button>Logout</button>
            </Link>
            {/* <PokemonTeamCreator></PokemonTeamCreator> */}
            {/* <PokemonTeamBuilder></PokemonTeamBuilder> */}
        </div>
    )
}