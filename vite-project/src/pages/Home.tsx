import './Home.css'
import "./HomePage.css"
import "./TrainerPage.css"
import React , {useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink as Link } from 'react-router-dom'
import { UserLogout } from '../services/userServices'
import { getAllTrainerTeams, createATeam, UpdateATeam, DeleteATeam } from '../services/TrainerServices'
import { CreateTeamInterface } from '../models/TrainerApiInterface'

export const Home : React.FC = () =>{
    const {isLoggedIn, logoutUser} = useAuth()

    const handleGetAllTeams = async () => {
        const response = await getAllTrainerTeams();
        console.log(response)   
    }

    const handlePostATeam = async () => {
        const response = await createATeam();
        console.log(response);
    }

    const handleUpdateATeam = async () => {
        const response = await UpdateATeam();
        console.log(response);
    }

    // const handleDeleteATeam = async () => {
    //     const response = await DeleteATeam();
    //     console.log(response);
    // }
    
    return (
        <>
            <div className="body">
            {isLoggedIn() ? (
                <>
                    <div className='logincontainer'>
                        <div className='form-box'>
                            <div className='btn-group'>
                                <Link to ="/trainer">
                                    <button>View all teams</button>
                                </Link>
                                <button onClick={() => handleGetAllTeams()}>GetTeams</button>
                                <br />
                                <Link to="/pokemonteambuilder">
                                    <button>Create New Team</button>
                                </Link>
                                <br />
                                <Link to='/login' id="loginBtn">
                                    <button onClick={ () => {UserLogout(), logoutUser()}}>Logout</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </>

            ) : ( 
                <>
                    <div className='logincontainer'>
                        <div className='form-box'>
                            <div className='btn-group'>
                                <div className='btn-group'>
                                    <Link to="/login">
                                        <button>Login</button>
                                    </Link>
                                    <br />
                                    <Link to="/signup">
                                        <button>Signup</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )}
            </div>
        </>
    )
}