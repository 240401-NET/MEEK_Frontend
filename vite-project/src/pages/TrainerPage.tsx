import React, { useState } from 'react';
import './TrainerPage.css';
import Search from '../assets/search.png';
import { TrainerPageLogic } from '../models/TrainerPageLogic';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UseEffectOnce } from '../services/UseEffectOnce';

export function TrainerPage() {
    const {user, token} = useAuth();
    const navigate = useNavigate();
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

    const downloadText = (teamData: any) => {
        // Extract team data
        const { teamId, teamName, pokemon } = teamData as { teamId: string; teamName: string; pokemon: any[] };
    
        // Create text content
        let textContent = `Team Name: ${teamName}\n\n`;
        textContent += `Team ID: ${teamId}\n\n`;
    
        textContent += "Pokemon:\n\n";
        pokemon.forEach((poke: { name: any; heldItem: any; ability: any; teraType: any; evs: any; nature: any; moveList: any[]; }) => {
            textContent += `${poke.name}`;
            textContent += ` @ ${poke.heldItem}\n`;
            textContent += `Ability: ${poke.ability}\n`;
            textContent += `Tera Type: ${poke.teraType}\n`;
            textContent += `EVs: ${poke.evs}\n`;
            textContent += `${poke.nature} Nature\n`;
            textContent += '-'+`${poke.moveList.join('-')}\n`;
        });
    
        // Blob object for the text data
        const blob = new Blob([textContent], { type: "text/plain" });
    
        // Temporary URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `pokemon_team_${teamId}.txt`; // Set the filename for the downloaded file
    
        // Append the anchor element to the document body
        document.body.appendChild(a);
    
        // Click the anchor element to trigger the download
        a.click();
    
        // Remove the anchor element and URL object
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'name' | 'teraType' | 'ability' | 'heldItem'>('name');

    const toggleRow = (teamId: string) => {
        setExpandedRow(prevExpandedRow => (prevExpandedRow === teamId ? null : teamId));
    };

    const deleteTeam = (teamId: string) => {
        console.log(`Deleting team with ID ${teamId}`);
    };

    const sortPokemon = (sortBy: string) => {
        setSortBy(sortBy as 'name' | 'teraType' | 'ability' | 'heldItem');
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedPokemon = teamData.map(team => ({
        ...team,
        pokemon: [...team.pokemon].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        })
    }));

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
                                <React.Fragment key={team.teamId}>
                                    <tr>
                                        <td>{team.teamId}</td>
                                        <td>{team.teamName}</td>
                                        <td>
                                            <div className="pokemon-container">
                                                {team.pokemon.map((pokemon) => (
                                                    <div key={pokemon.name} className="pokemon-item">
                                                        <img src={pokemon.image} alt={pokemon.name} />
                                                        <p>{pokemon.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                        <button className="view-button" onClick={() => toggleRow(team.teamId)}title="View Team"></button>
                                        <button className="delete-button" onClick={() => deleteTeam(team.teamId)}title="Delete Team"></button>
                                        <button className="download-button" onClick={() => downloadText(team)} title="Export Team"></button>
                                        </td>
                                    </tr>
                                    {expandedRow === team.teamId && (
                                        <tr>
                                            <td colSpan={4}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Pokemon</th>
                                                            <th>Held Item</th>
                                                            <th>Ability</th>
                                                            <th>Tera Type</th>
                                                            <th>EVs</th>
                                                            <th>Nature</th>
                                                            <th>Move List</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {team.pokemon.map((pokemon) => (
                                                            <tr key={pokemon.name}>
                                                                <td><a href={pokemon.name}><img src={pokemon.image} alt={pokemon.name} /></a>{pokemon.name}</td>
                                                                <td>{pokemon.heldItem}</td>
                                                                <td>{pokemon.ability}</td>
                                                                <td>{pokemon.teraType}</td>
                                                                <td>{pokemon.evs}</td>
                                                                <td>{pokemon.nature}</td>
                                                                <td>{pokemon.moveList.map(move => <React.Fragment>{move}<br /></React.Fragment>)}</td>
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
            </main>
        </div>
    );
}

// Example team data (replace with actual Database data)
const teamData = [
    {
        teamId: '1',
        teamName: 'Alpha',
        pokemon: [
            {name: 'Charizard', image: 'https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/charizard.png', heldItem: 'Iapapa Berry', teraType: 'Fire', ability: 'Blaze', evs: '4 Atk / 252 SpA / 252 Spe', nature: 'Adamant', moveList: ['Fire Blast\n','Fly\n','Iron Tail\n','Dragon Dance\n'] },
            {name: 'Swampert', image: 'https://img.pokemondb.net/sprites/black-white/normal/swampert.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Torrent', evs: '252 HP / 4 Atk / 252 SpA', nature: 'Adamant', moveList: ['Earthquake\n','Ice Beam\n','Surf\n','Hydro Pump\n'] },
            {name: 'Tyranitar', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/tyranitar.png', heldItem: 'Charcoal', teraType: 'Rock', ability: 'Sand Stream', evs: '252 HP / 252 Atk / 4 SpA', nature: 'Adamant', moveList: ['Body Slam\n','Hyper Beam\n','Rock Slide\n','Earthquake\n'] },
            {name: 'Empoleon', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/empoleon.png', heldItem: 'Chople Berry', teraType: 'Water', ability: 'Torrent', evs: '4 Atk / 252 SpA / 252 Spe', nature: 'Adamant', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
            {name: 'Incineroar', image: 'https://img.pokemondb.net/sprites/sword-shield/normal/incineroar.png', heldItem: 'Life Orb', teraType: 'Fire', ability: 'Blaze', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Adamant', moveList: ['Fire Blast\n','Close Combat\n','Cross Chop\n','Dark Pulse\n'] },
            {name: 'Mew', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/mew.png', heldItem: 'Choice Scarf', teraType: 'Psychic', ability: 'Synchronize', evs: '4 Atk / 252 SpA / 252 Spe', nature: 'Adamant', moveList: ['Fire Blast\n','Fly\n','Blizzard\n','Shadow Ball\n'] },
        ]
    },
    {
        teamId: '2',
        teamName: 'Omega',
        pokemon: [
            {name: 'Gyarados', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/gyarados.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Intimidate', evs: '252 HP / 252 Atk / 4 Def', nature: 'Adamant', moveList: ['Waterfall\n','Dragon Dance\n','Earthquake\n','Ice Fang\n'] },
            {name: 'Lucario', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/lucario.png', heldItem: 'Life Orb', teraType: 'Fighting', ability: 'Inner Focus', evs: '4 HP / 252 Atk / 252 Spe', nature: 'Jolly', moveList: ['Close Combat\n','Extreme Speed\n','Bullet Punch\n','Swords Dance\n'] },
            {name: 'Gardevoir', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/gardevoir.png', heldItem: 'Choice Specs', teraType: 'Psychic', ability: 'Trace', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Psychic\n','Moonblast\n','Focus Blast\n','Shadow Ball\n'] },
            {name: 'Pikachu', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/pikachu.png', heldItem: 'Light Ball', teraType: 'Electric', ability: 'Static', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Quick Attack\n','Volt Switch\n'] },
            {name: 'Blastoise', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/blastoise.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Torrent', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Brave', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
            {name: 'Raichu', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/raichu.png', heldItem: 'Life Orb', teraType: 'Electric', ability: 'Static', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Focus Blast\n','Volt Switch\n'] },
        ]
    },

    {
        teamId: '3',
        teamName: 'Gamma',
        pokemon: [
            {name: 'Lugia', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/lugia.png', heldItem: 'Leftovers', teraType: 'Psychic', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Adamant', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Ice Fang\n'] },
            {name: 'Celebi', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/celebi.png', heldItem: 'Life Orb', teraType: 'Psychic', ability: 'Levitate', evs: '4 HP / 252 Atk / 252 Spe', nature: 'Jolly', moveList: ['Psychic\n','Moonblast\n','Focus Blast\n','Shadow Ball\n'] },
            {name: 'Ho-oh', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/ho-oh.png', heldItem: 'Choice Specs', teraType: 'Fire', ability: 'Levitate', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Flamethrower\n','Moonblast\n','Sacred Fire\n','Fly\n'] },
            {name: 'Entei', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/entei.png', heldItem: 'Light Ball', teraType: 'Fire', ability: 'Cute Charm', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Fire Blast\n','Solar Beam\n','Focus Blast\n','Sacred Fire\n'] },
            {name: 'Suicune', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/suicune.png', heldItem: 'Leftovers', teraType: 'Water', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 SpD', nature: 'Brave', moveList: ['Surf\n','Hydro Pump\n','Ice Beam\n','Earthquake\n'] },
            {name: 'Raikou', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/raikou.png', heldItem: 'Life Orb', teraType: 'Electric', ability: 'Pressure', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Thunderbolt\n','Grass Knot\n','Focus Blast\n','Volt Switch\n'] },
        ]
    },

    {
        teamId: '3',
        teamName: 'Zeta',
        pokemon: [
            {name: 'Dragonite', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/dragonite.png', heldItem: 'Leftovers', teraType: 'Dragon', ability: 'Multiscale', evs: '252 HP / 252 Atk / 4 Spe',nature: 'Adamant', moveList: ['Dragon Dance\n', 'Outrage\n', 'Earthquake\n', 'Fire Punch\n']},
            {name: 'Mewtwo', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/mewtwo.png', heldItem: 'Life Orb', teraType: 'Psychic', ability: 'Pressure', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Timid', moveList: ['Psystrike\n', 'Aura Sphere\n', 'Ice Beam\n', 'Thunderbolt\n']},
            {name: 'Groudon', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/groudon.png', heldItem: 'Red Orb', teraType: 'Ground', ability: 'Drought', evs: '252 HP / 252 Atk / 4 Def', nature: 'Adamant', moveList: ['Precipice Blades\n', 'Fire Punch\n', 'Dragon Claw\n', 'Stone Edge\n']},
            {name: 'Zapdos', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/zapdos.png', heldItem: 'Leftovers', teraType: 'Electric', ability: 'Pressure', evs: '252 HP / 252 Atk / 4 Spe', nature: 'Adamant', moveList: ['Thunderbolt\n', 'Fly\n', 'Brave Bird\n', 'Recover\n']},
            {name: 'Metagross', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/metagross.png', heldItem: 'Leftovers', teraType: 'Psychic', ability: 'Pressure', evs: '252 HP / 4 Def / 252 SpD', nature: 'Calm', moveList: ['Psychic\n', 'Zen Headbutt\n', 'Thunderbolt\n', 'Recover\n']},
            {name: 'Kyogre', image: 'https://img.pokemondb.net/sprites/diamond-pearl/normal/kyogre.png', heldItem: 'Choice Scarf', teraType: 'Water', ability: 'Drizzle', evs: '4 HP / 252 SpA / 252 Spe', nature: 'Modest', moveList: ['Origin Pulse\n', 'Ice Beam\n', 'Thunder\n', 'Water Spout\n']}
        ]
    }

    
    // Add more team objects as needed until Database is done
];

export default TrainerPage;
