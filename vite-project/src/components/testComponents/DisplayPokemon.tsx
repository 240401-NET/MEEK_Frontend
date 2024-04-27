import './DisplayPokemon.css'
import { useEffect, useState } from 'react'
import { NavLink as Link } from 'react-router-dom';

export function DisplayPokemon () {
    const [data, setData] = useState(null)

    useEffect(() =>{
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error))
    }, []);

    return (
        <div>
            <Link to="/displaypokemon">
                <button>
                    Display pokemon
                </button>
            </Link>
            {data? <pre>{JSON.stringify(data, null, 2)}</pre>: 'Loading'}
        </div>
    )
}
