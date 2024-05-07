import React, { useState, useEffect } from 'react';
import './TrainerPage.css';
import Search from '../assets/search.png';
import { TrainerPageLogic } from '../models/TrainerPageLogic';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UseEffectOnce } from '../services/UseEffectOnce';
import { DeleteATeam, getAllTrainerTeams } from '../services/TrainerServices';
import { BackEndPokemonTeamInterface, MoveSet, PokemonTeamMember, StatImplementation } from '../models/Pokemon';

export function TrainerPage() {
    const {user, token} = useAuth();
    const navigate = useNavigate();
    const [teamDatas, setTeamDatas] = useState<BackEndPokemonTeamInterface[]>([])
    const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true);
    // const [displayedTeams, setDisplayedTeams] = useState<number>(5)

    // calls custom use effect function to redirect page and pop up windows alert only once!
    UseEffectOnce (()=> {
        if(!user && !token){
            window.alert("Unauthorized. Please login to view teams");
            navigate("/");
        }
        else {
            TrainerPageLogic()
        }
    })

    useEffect (() => {
        loadTrainerTeams();
    }, [teamDatas])
    

    const loadTrainerTeams = async () => {
        if(onFirstLoad){
            const response = await getAllTrainerTeams();
            console.log(response);
            if (JSON.stringify(response) !== JSON.stringify(teamDatas)){
                setTeamDatas(response);
            }
        }
        setOnFirstLoad(false);
        console.log(teamDatas)
    }

    const url : string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    const downloadText = (teamDatas: BackEndPokemonTeamInterface) => {
        // Extract team data
        const { id, name, pokemonTeamMembers } = teamDatas as { id: number; name: string; pokemonTeamMembers: PokemonTeamMember[] };
        // Create text content
        let textContent = `Team Name: ${name}\n\n`;
        textContent += `Team ID: ${id}\n\n`;
    
        textContent += "Pokemon:\n\n";
        pokemonTeamMembers.forEach((poke: { pkmApiId: number, name: string, nickname: string, level: number, gender: boolean; isShiny: boolean, teraType: string, heldItem: string, chosenAbility: string; rosterOrder: number, nature: string, pokemonMoveSet: MoveSet, pokemonStats: StatImplementation[]}) => {
            textContent += `${poke.name}`;
            textContent += ` ${poke.gender}`;
            textContent += ` @ ${poke.heldItem}\n`;
            textContent += `Ability: ${poke.chosenAbility}\n`;
            textContent += `Shiny: ${poke.isShiny}\n`;
            textContent += `Tera Type: ${poke.teraType}\n`;
            textContent += `EVs: ${poke.pokemonStats.filter(stat => stat.effort > 0).map((stat) => {
                let statAbbreviation = stat.name;
                switch (stat.name) {
                    case 'hp':
                        statAbbreviation = 'Hp'
                        break;
                    case 'attack':
                        statAbbreviation = 'Atk';
                        break;
                    case 'defense':
                        statAbbreviation = 'Def';
                        break;
                    case 'special-attack':
                        statAbbreviation = 'SpA';
                        break;
                    case 'special-defense' :
                        statAbbreviation = 'SpD';
                        break;
                    case 'speed' :
                        statAbbreviation = 'Spe';
                        break;
                    // Add cases for other stats as needed
                }
                return (stat.effort > 0) ? `${statAbbreviation} ${stat.effort} ` : '';
            }).join('/ ')}\n`;
            textContent += `IVs: ${poke.pokemonStats.filter(stat => stat.individual < 31).map((stat) => {
                let statAbbreviation = stat.name;
                switch (stat.name) {
                    case 'hp':
                        statAbbreviation = 'Hp'
                        break;
                    case 'attack':
                        statAbbreviation = 'Atk';
                        break;
                    case 'defense':
                        statAbbreviation = 'Def';
                        break;
                    case 'special-attack':
                        statAbbreviation = 'SpA';
                        break;
                    case 'special-defense' :
                        statAbbreviation = 'SpD';
                        break;
                    case 'speed' :
                        statAbbreviation = 'Spe';
                        break;
                    // Add cases for other stats as needed
                }
                return (stat.individual < 0) ? `${statAbbreviation} ${stat.individual} ` : '';
            }).join('/ ')}\n`;
            textContent += `${poke.nature} Nature\n`;
            for (const key in poke.pokemonMoveSet) {
                if (Object.prototype.hasOwnProperty.call(poke.pokemonMoveSet, key) && key !== 'pkmTmId') {
                  textContent += `- ${poke.pokemonMoveSet[key as keyof typeof poke.pokemonMoveSet]}\n`;
                }
              }
        });
    
        // Blob object for the text data
        const blob = new Blob([textContent], { type: "text/plain" });
    
        // Temporary URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `pokemon_team_${id}.txt`; // Set the filename for the downloaded file
    
        // Append the anchor element to the document body
        document.body.appendChild(a);
    
        // Click the anchor element to trigger the download
        a.click();
    
        // Remove the anchor element and URL object
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const [expandedRow, setExpandedRow] = useState<number | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'name' | 'teraType' | 'chosenAbility' | 'heldItem'>('name');

    const toggleRow = (id: number) => {
        setExpandedRow(prevExpandedRow => (prevExpandedRow === id ? undefined : id));
    };

    const editTeam = (id: number) => {
        console.log(`Editing team with ID ${id}`);
    };

    const deleteTeam = async (id: number) => {
        const response = await DeleteATeam(id)
        console.log(response);
        console.log(`Deleting team with ID ${id}`);
        setOnFirstLoad(true);
        startAutoRefresh();
    };

    const sortPokemon = (sortBy: string) => {
        setSortBy(sortBy as 'name' | 'teraType' | 'chosenAbility' | 'heldItem');
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const [startIndex, setStartIndex] = useState(0);

    const sortedPokemon = teamDatas.slice(startIndex, startIndex + 5).map(team => ({
        ...team,
        pokemonTeamMembers: [...team.pokemonTeamMembers].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        })
    }));

    const startAutoRefresh = () => {
        const intervalId = setInterval(() => {
          window.location.reload();
        }, 3000); // Refresh every 5 seconds (adjust the interval as needed)
    
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      };

    // const statAbbreviations = {
    //     'hp': 'HP',
    //     'attack': 'Atk',
    //     'defense': 'Def',
    //     'special-attack': 'SpA',
    //     'special-defense': 'SpD',
    //     'speed': 'Spe',
    //   };

      
    return (
        <div className='body'>
            <Link to="/">
                <button>Logout</button>
            </Link>
            <main className="table" id="pokemon_table">
                <section className="table__header">
                    <h1>Pokemon Teams</h1>
                    <div className="input-group">
                        <input type="search" placeholder='SEARCH TEAM BY ID/NAME' />
                        <img src={Search} alt="" />
                    </div>
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sortPokemon('id')}>Team ID</th>
                                <th onClick={() => sortPokemon('name')}>Team Name</th>
                                <th>Pokemon</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPokemon.map((team) => (
                                <React.Fragment key={team.id}>
                                    <tr>
                                        <td>{team.id}</td>
                                        <td>{team.name}</td>
                                        <td>
                                            <div className="pokemon-container">
                                                {team.pokemonTeamMembers.map((pokemon) => (
                                                    <div key={pokemon.name} className="pokemon-item">
                                                        <img src={pokemon.isShiny ? url+'shiny/'+`${pokemon.pkmApiId}`+".png" : url+`${pokemon.pkmApiId}`+".png"} alt={pokemon.name} />
                                                        <p>{pokemon.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                        <button className="view-button" onClick={() => toggleRow(team.id)}title="View Team"></button>
                                        <a href="http://localhost:5173/#/Pokemonteambuilder" title="Edit Team"><button className="edit-button" onClick={() => editTeam(team.id)}></button></a>
                                        <button className="delete-button" onClick={() => deleteTeam(team.id)}title="Delete Team"></button>
                                        <button className="download-button" onClick={() => downloadText(team)} title="Export Team"></button>
                                        </td>
                                    </tr>
                                    {expandedRow === team.id && (
                                        <tr>
                                            <td colSpan={4}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Pokemon</th>
                                                            <th>Gender</th>
                                                            <th>Held Item</th>
                                                            <th>Ability</th>
                                                            <th>Shiny</th>
                                                            <th>Tera Type</th>
                                                            <th>EVs</th>
                                                            <th>IVs</th>
                                                            <th>Nature</th>
                                                            <th>Move List</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {team.pokemonTeamMembers.map((pokemon) => (
                                                            <tr key={pokemon.name}>
                                                                <td><a href={pokemon.name}><img src={pokemon.isShiny ? url+'shiny/'+`${pokemon.pkmApiId}`+".png" : url+`${pokemon.pkmApiId}`+".png"} alt={pokemon.name} /></a>{pokemon.name}</td>
                                                                <td>{pokemon.gender ? "female" : "male"}</td>
                                                                <td>{pokemon.heldItem}</td>
                                                                <td>{pokemon.chosenAbility}</td>
                                                                <td>{pokemon.isShiny.toString()}</td>
                                                                <td>{pokemon.teraType}</td>
                                                                <td>{pokemon.pokemonStats.map(stat => (stat.effort > 0) ? `${stat.name} ${stat.effort}/ ` : "")}</td>
                                                                <td>{pokemon.pokemonStats.map(stat => (stat.individual < 31) ? `${stat.name} ${stat.effort}/ ` : "")}</td>
                                                                <td>{pokemon.nature}</td>
                                                                <td>
                                                                    {Object.keys(pokemon.pokemonMoveSet).map((key) => (
                                                                        key !== 'pkmTmId' && (
                                                                        <React.Fragment key={key}>
                                                                            {isNaN(Number(key))}
                                                                            {pokemon.pokemonMoveSet[key as keyof typeof pokemon.pokemonMoveSet]} <br />
                                                                        </React.Fragment>
                                                                        )
                                                                    ))}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </section>
                {startIndex < teamDatas.length ? <button onClick={() => setStartIndex(startIndex + 5)}>Next</button> : ''}
                {startIndex >= 5 ? <button onClick={() => setStartIndex(startIndex - 5)}>Prev</button> : ''}
            </main>
        </div>  
    );
}

// Example team data (replace with actual Database data)
// const teamData = [
//     {
//         teamId: '1',
//         teamName: 'Alpha',
//         pokemon: [
//             {name: 'Charizard', image: 'https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/charizard.png', gender: true, heldItem: 'Iapapa Berry', teraType: 'Fire', ability: 'Blaze', shiny: true, evs: '4 Atk / 252 SpA / 252 Spe', ivs: 'Atk / SpA / Spe', nature: 'Adamant', moveList: ['Fire Blast\n','Fly\n','Iron Tail\n','Dragon Dance\n'] },
//             {name: 'Swampert', image: 'https://img.pokemondb.net/sprites/black-white/normal/swampert.png', gender: true, heldItem: 'Leftovers', teraType: 'Water', ability: 'Torrent', shiny: true, evs: '252 HP / 4 Atk / 252 SpA', ivs: 'HP / Atk / SpA', nature: 'Adamant', moveList: ['Earthquake\n','Ice Beam\n','Surf\n','Hydro Pump\n'] },
//             {name: 'Tyranitar', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/tyranitar.png', gender: true, heldItem: 'Charcoal', teraType: 'Rock', ability: 'Sand Stream',shiny: true, evs: '252 HP / 252 Atk / 4 SpA', ivs: 'HP / Atk / SpA', nature: 'Adamant', moveList: ['Body Slam\n','Hyper Beam\n','Rock Slide\n','Earthquake\n'] },
//             {name: 'Empoleon', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/empoleon.png', gender: true, heldItem: 'Chople Berry', teraType: 'Water', ability: 'Torrent', shiny: false, evs: '4 Atk / 252 SpA / 252 Spe', ivs: 'Atk / SpA / Spe', nature: 'Adamant', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
//             {name: 'Incineroar', image: 'https://img.pokemondb.net/sprites/sword-shield/normal/incineroar.png', gender: true, heldItem: 'Life Orb', teraType: 'Fire', ability: 'Blaze', evs: '252 HP / 252 Atk / 4 SpD', ivs: 'HP / Atk / SpD', nature: 'Adamant', moveList: ['Fire Blast\n','Close Combat\n','Cross Chop\n','Dark Pulse\n'] },
//             {name: 'Mew', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/mew.png', gender: true, heldItem: 'Choice Scarf', teraType: 'Psychic', ability: 'Synchronize', evs: '4 Atk / 252 SpA / 252 Spe', ivs: 'Atk / SpA / Spe', nature: 'Adamant', moveList: ['Fire Blast\n','Fly\n','Blizzard\n','Shadow Ball\n'] },
//         ]
//     },
//     {
//         teamId: '2',
//         teamName: 'Omega',
//         pokemon: [
//             {name: 'Gyarados', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/gyarados.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Intimidate', evs: '252 HP / 252 Atk / 4 Def', nature: 'Adamant', moveList: ['Waterfall\n','Dragon Dance\n','Earthquake\n','Ice Fang\n'] },
//             {name: 'Lucario', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/lucario.png', heldItem: 'Life Orb', teraType: 'Fighting', ability: 'Inner Focus', evs: '4 HP / 252 Atk / 252 Spe', nature: 'Jolly', moveList: ['Close Combat\n','Extreme Speed\n','Bullet Punch\n','Swords Dance\n'] },
//             {name: 'Gardevoir', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/gardevoir.png', heldItem: 'Choice Specs', teraType: 'Psychic', ability: 'Trace', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Psychic\n','Moonblast\n','Focus Blast\n','Shadow Ball\n'] },
//             {name: 'Pikachu', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/pikachu.png', heldItem: 'Light Ball', teraType: 'Electric', ability: 'Static', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Quick Attack\n','Volt Switch\n'] },
//             {name: 'Blastoise', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/blastoise.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Torrent', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Brave', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
//             {name: 'Raichu', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/raichu.png', heldItem: 'Life Orb', teraType: 'Electric', ability: 'Static', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Focus Blast\n','Volt Switch\n'] },
//         ]
//     },

//     {
//         teamId: '3',
//         teamName: 'Gamma',
//         pokemon: [
//             {name: 'Lugia', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/lugia.png', heldItem: 'Leftovers', teraType: 'Psychic', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Adamant', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Ice Fang\n'] },
//             {name: 'Celebi', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/celebi.png', heldItem: 'Life Orb', teraType: 'Psychic', ability: 'Levitate', evs: '4 HP / 252 Atk / 252 Spe', nature: 'Jolly', moveList: ['Psychic\n','Moonblast\n','Focus Blast\n','Shadow Ball\n'] },
//             {name: 'Ho-oh', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/ho-oh.png', heldItem: 'Choice Specs', teraType: 'Fire', ability: 'Levitate', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Flamethrower\n','Moonblast\n','Sacred Fire\n','Fly\n'] },
//             {name: 'Entei', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/entei.png', heldItem: 'Light Ball', teraType: 'Fire', ability: 'Cute Charm', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Fire Blast\n','Solar Beam\n','Focus Blast\n','Sacred Fire\n'] },
//             {name: 'Suicune', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/suicune.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Brave', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
//             {name: 'Raikou', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/raikou.png', heldItem: 'Life Orb', teraType: 'Electric', ability: 'Pressure', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Focus Blast\n','Volt Switch\n'] },
//         ]
//     },

//     {
//         teamId: '4',
//         teamName: 'Zeta',
//         pokemon: [
//             {name: 'Dragonite', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/dragonite.png', heldItem: 'Leftovers', teraType: 'Dragon', ability: 'Multiscale', evs: '252 HP / 252 Atk / 4 Spe',nature: 'Adamant', moveList: ['Dragon Dance\n', 'Outrage\n', 'Earthquake\n', 'Fire Punch\n']},
//             {name: 'Mewtwo', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/mewtwo.png', heldItem: 'Life Orb', teraType: 'Psychic', ability: 'Pressure', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Psystrike\n', 'Aura Sphere\n', 'Ice Beam\n', 'Thunderbolt\n']},
//             {name: 'Groudon', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/groudon.png', heldItem: 'Red Orb', teraType: 'Ground', ability: 'Drought', evs: '252 HP / 252 Atk / 4 Def', nature: 'Adamant', moveList: ['Precipice Blades\n', 'Fire Punch\n', 'Dragon Claw\n', 'Stone Edge\n']},
//             {name: 'Zapdos', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/zapdos.png', heldItem: 'Leftovers', teraType: 'Electric', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 Spe', nature: 'Adamant', moveList: ['Thunderbolt\n', 'Fly\n', 'Brave Bird\n', 'Recover\n']},
//             {name: 'Metagross', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/metagross.png', heldItem: 'Leftovers', teraType: 'Psychic', ability: 'Pressure', evs: '252 HP / 4 Def / 252 SpD', nature: 'Calm', moveList: ['Psychic\n', 'Zen Headbutt\n', 'Thunderbolt\n', 'Recover\n']},
//             {name: 'Kyogre', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/kyogre.png', heldItem: 'Choice Scarf', teraType: 'Water', ability: 'Drizzle', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Origin Pulse\n', 'Ice Beam\n', 'Thunder\n', 'Water Spout\n']}
//         ]
//     }

    
    // Add more team objects as needed until Database is done
// ];

export default TrainerPage;

