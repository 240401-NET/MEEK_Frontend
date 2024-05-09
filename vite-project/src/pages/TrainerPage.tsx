import React, { useState, useEffect } from 'react';
import './TrainerPage.css';
import Search from '../assets/search.png';
import { TrainerPageLogic } from '../models/TrainerPageLogic';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UseEffectOnce } from '../services/UseEffectOnce';
import { DeleteATeam, getAllTrainerTeams, getTrainerTeamById } from '../services/TrainerServices';
import { BackEndPokemonTeamInterface, BackEndPokemonTeamInterfaces, MoveSet, PokemonTeamMember, StatImplementation } from '../models/Pokemon';
import { UserLogout } from '../services/userServices';
import musicFile from "../assets/musicThree.mp3";

export function TrainerPage() {
    const {user, token} = useAuth();
    const navigate = useNavigate();
    const [teamDatas, setTeamDatas] = useState<BackEndPokemonTeamInterfaces[]>([])
    const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true);
    const [editTeamResponse, setEditTeamReSponse] = useState<string>('')
    const [ifEditTeam, setIfEditTeam] = useState<boolean>(false)
    const [ifCreateTeam, setIfCreateTeam] = useState<boolean>(false)
    const [teamName, setTeamName] = useState<string>("")
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

    useEffect(() => {
        if (ifCreateTeam) {
                // const obj = JSON.parse(createTeamResponse)
                // window.alert(`${teamName} sucessfully created!`)
                setIfCreateTeam(false)
                navigate('/teamcreator');
            }
        else if (ifEditTeam) {
            setIfEditTeam(false)
            navigate('/teamcreator');
        }
    }, [ifCreateTeam, ifEditTeam])
    

    const loadTrainerTeams = async () => {
        if(onFirstLoad){
            const response = await getAllTrainerTeams();
            if (JSON.stringify(response) !== JSON.stringify(teamDatas)){
                setTeamDatas(response);
            }
        }
        setOnFirstLoad(false);
    }

    const url : string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    const downloadText = (teamDatas: BackEndPokemonTeamInterfaces) => {
        // Extract team data
        const { id, name, pokemonTeamMembers } = teamDatas as { id: number; name: string; pokemonTeamMembers: PokemonTeamMember[] };
        // Create text content
        let textContent = `Team Name: ${name}\n\n`;
        textContent += `Team ID: ${id}\n\n`;
    
        textContent += "Pokemon:\n\n";
        pokemonTeamMembers.forEach((poke: { pkmApiId: number, name: string, nickname: string, level: number, gender: boolean; isShiny: boolean, teraType: string, heldItem: string, chosenAbility: string; rosterOrder: number, nature: string, pokemonMoveSet: MoveSet, pokemonStats: StatImplementation[]}) => {
            textContent += `${poke.name.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}`;
            textContent += poke.gender ? ' (M)' : ' (F)';
            textContent += ` @ ${poke.heldItem.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}\n`;
            textContent += `Ability: ${poke.chosenAbility.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}\n`;
            textContent += `Shiny: ${poke.isShiny ? 'Yes' : 'No'}\n`;
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
                return (stat.individual < 31) ? `${statAbbreviation} ${stat.individual} ` : '';
            }).join('/ ')}\n`;
            textContent += `${poke.nature} Nature\n`;
            for (const key in poke.pokemonMoveSet) {
                if (Object.prototype.hasOwnProperty.call(poke.pokemonMoveSet, key) && key !== 'pkmTmId') {
                  textContent += `- ${poke.pokemonMoveSet[key as keyof typeof poke.pokemonMoveSet].replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}\n`;
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

    const editTeam = async(id: number) => {
       const response = await getTrainerTeamById(id)
       setEditTeamReSponse(JSON.stringify(response))
       localStorage.setItem(`${response.name}-${response.id}-pokemonTeam`, editTeamResponse)
       setIfCreateTeam(true);
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

      const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        handleCreateTeam(); // Call function to handle team creation
        setTeamName(''); // Clear the input field after submission
    };

    const {logoutUser} = useAuth();

    //   const [modalOpen, setModalOpen] = useState<boolean>(false);

      const handleCreateTeam = () => {
        setIfCreateTeam(true);
        // Handle saving the team to the database
        // Perform your POST request here
        // const response = await createATeam(teamName);
        // console.log(JSON.stringify(response))
        // setCreateTeamReSponse(JSON.stringify(response))
        // localStorage.setItem(`${response.name}-${response.id}`, createTeamResponse);
        // window.alert(`${teamName} sucessfully created!`)
      };

    // console.log(modalOpen);
    // const statAbbreviations = {
    //     'hp': 'HP',
    //     'attack': 'Atk',
    //     'defense': 'Def',
    //     'special-attack': 'SpA',
    //     'special-defense': 'SpD',
    //     'speed': 'Spe',
    //   };

      
    return (
   <>
        <div className="containerTwo">
        <div className="logout-container">
           <Link to='/login' id="loginBtn">
               <button className="logout-button" onClick={() => {UserLogout(); logoutUser();}}>Logout</button>
           </Link>
       </div>
        <main className="table" id="pokemon_table">
                <section className="table__header">
                    <h1>Pokemon Teams</h1>
                    <div className="input-group">
                        <input type="search" placeholder='SEARCH TEAM BY ID/NAME' />
                        <img src={Search} alt="" />
                    </div>
                    <div className="input-group">

            <input
                type="text"
                placeholder="CREATE TEAM BY ENTERING TEAM NAME"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />
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
                                                        <p>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                        <button className="view-button" onClick={() => toggleRow(team.id)}title="View Team"></button>
                                        <a title="Edit Team"><button className="edit-button" onClick={() => editTeam(team.id)}></button></a>
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
                                                                <td><a href={pokemon.name}><img src={pokemon.isShiny ? url+'shiny/'+`${pokemon.pkmApiId}`+".png" : url+`${pokemon.pkmApiId}`+".png"} alt={pokemon.name.charAt(0).toUpperCase()} /></a>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</td>
                                                                <td>{pokemon.gender ? "(F)" : "(M)"}</td>
                                                                <td>{pokemon.heldItem.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}</td>
                                                                <td>{pokemon.chosenAbility.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())}</td>
                                                                <td>{pokemon.isShiny.toString()}</td>
                                                                <td>{pokemon.teraType}</td>
                                                                <td>{`${pokemon.pokemonStats.filter(stat => stat.effort > 0).map((stat) => {
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
                                                                        return (stat.effort > 0) ? `${statAbbreviation} ${stat.individual} ` : '';
                                                                    }).join('/ ')}\n`}
                                                                    </td>
                                                                <td>{`${pokemon.pokemonStats.filter(stat => stat.individual < 31).map((stat) => {
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
                                                                        return (stat.individual < 31) ? `${statAbbreviation} ${stat.individual} ` : '';
                                                                    }).join('/ ')}\n`}</td>
                                                                <td>{pokemon.nature}</td>
                                                                <td>
                                                                    {Object.keys(pokemon.pokemonMoveSet).map((key) => (
                                                                        key !== 'pkmTmId' && (
                                                                        <React.Fragment key={key}>
                                                                            {isNaN(Number(key))}
                                                                            {pokemon.pokemonMoveSet[key as keyof typeof pokemon.pokemonMoveSet].replace(/-/g, ' ').replace(/(?:^|\s)\S/g, char => char.toUpperCase())} <br />
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
                {startIndex + 5 < teamDatas.length && 
    <button 
        className="pagination-button" 
        onClick={() => setStartIndex(startIndex + 5)}
    >
        Next
    </button>
}
{startIndex >= 5 ? 
    <button 
        className="pagination-button" 
        onClick={() => setStartIndex(startIndex - 5)}
    >
        Prev
    </button> 
: ''}
                {/* <button className="button" onClick={() => setModalOpen(true)}>
                    Create New Team
                </button>   
                <TeamNameModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveTeam}
                /> */}
            </main>
        </div>
        <div>
        <audio autoPlay loop>
          <source src={musicFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
        </> 
    );
}

export default TrainerPage;

