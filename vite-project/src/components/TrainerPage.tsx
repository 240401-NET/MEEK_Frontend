import './TrainerPage.css';
import Search from '../assets/search.png';
import JSON from '../assets/json.png';
import {TrainerPageLogic} from './TrainerPageLogic'
import {NavLink as Link} from "react-router-dom"
import {useEffect} from 'react';

export function TrainerPage()
{
    
    useEffect(() => {
        // Call your logic function here
        TrainerPageLogic();
    }, []); 

    return (
        <div>
            <Link to="/">
                <button>Logout</button>
            </Link>
            <main className="table" id="pokemon_table">
                <section className="table__header">
                    <h1>Pokemon Teams</h1>
                    <div className="input-group">
                        <input type="search" placeholder='SEARCH TEAM BY ID/NAME'/>
                        <img src={Search} alt=""/>
                    </div>
                    <div className="export__file">
                        <label htmlFor="export-file" className='export__file-btn' title='Export File'></label>
                        <input type="checkbox" id="export-file" />
                        <div className="export__file-options">
                            <label>Export / Download As &nbsp; &#10140;</label>
                            <label htmlFor="export-file" id="toJSON">JSON<img src={JSON} alt=""/></label>
                        </div>
                    </div>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Pokemon Id<span className="icon-arrow">&#8593;</span></th>
                                <th>Pokemon Name<span className="icon-arrow">&#8593;</span></th>
                                <th>Type<span className="icon-arrow">&#8593;</span></th>
                                <th>Ability<span className="icon-arrow">&#8593;</span></th>
                                <th>Egg Group<span className="icon-arrow">&#8593;</span></th>
                                <th>Move List<span className="icon-arrow">&#8593;</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><a href="https://pokemondb.net/pokedex/charizard"><img src="https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/charizard.png" alt="Charizard"/></a>Charizard</td>
                                <td>Fire / Flying</td>
                                <td>Blaze</td>
                                <td>
                                    <p className="egg-group dragon">Dragon</p>
                                </td>
                                <td>
                                     Move 1
                                <br/>Move 2
                                <br/>Move 3
                                <br/>Move 4
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><a href="https://pokemondb.net/pokedex/swampert"><img src="https://img.pokemondb.net/sprites/black-white/normal/swampert.png" alt="Swampert"/></a>Swampert</td>
                                <td>Water / Ground</td>
                                <td>Damp</td>
                                <td>
                                    <p className="egg-group water1">Water1</p>
                                </td>
                                <td>    
                                     Move 1
                                <br/>Move 2
                                <br/>Move 3
                                <br/>Move 4
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><a href="https://pokemondb.net/pokedex/tyranitar"><img src="https://img.pokemondb.net/sprites/diamond-pearl/normal/tyranitar.png" alt="Tyranitar"/></a>Tyranitar</td>
                                <td>Rock / Dark</td>
                                <td>Sandstream</td>
                                <td>
                                    <p className="egg-group field">Field</p>
                                </td>
                                <td>    
                                         Move 1
                                    <br/>Move 2
                                    <br/>Move 3
                                    <br/>Move 4
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><a href="https://pokemondb.net/pokedex/empoleon"><img src="https://img.pokemondb.net/sprites/x-y/normal/empoleon.png" alt="Empoleon"/></a>Empoleon</td>
                                <td>Water / Steel</td>
                                <td>Torrent</td>
                                <td>
                                    <p className="egg-group water2">Water2</p>
                                </td>
                                <td>    
                                     Move 1
                                <br/>Move 2
                                <br/>Move 3
                                <br/>Move 4
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><a href="https://pokemondb.net/pokedex/incineroar"><img src="https://img.pokemondb.net/sprites/sword-shield/normal/incineroar.png" alt="Incineroar"/></a>Incineroar</td>
                                <td>Fire / Dark</td>
                                <td>Intimidate</td>
                                <td>
                                    <p className="egg-group human-like">Human-Like</p>
                                </td>
                                <td>    
                                     Move 1
                                <br/>Move 2
                                <br/>Move 3
                                <br/>Move 4
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td><a href="https://pokemondb.net/pokedex/mew"><img src="https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/mew.png" alt="Mew"/></a>Mew</td>
                                <td>Psychic</td>
                                <td>Synchronize</td>
                                <td>
                                    <p className="egg-group undiscovered">Undiscovered</p>
                                </td>
                                <td>    
                                     Move 1
                                <br/>Move 2
                                <br/>Move 3
                                <br/>Move 4
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
        
    )
}