import './Home.css'
import "./HomePage.css"
import "./TrainerPage.css"
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink as Link } from 'react-router-dom'
import { UserLogout } from '../services/userServices'
import { getAllTrainerTeams } from '../models/PokemonAPICall'

export const Home : React.FC = () =>{
    const {isLoggedIn, logoutUser} = useAuth()

    const handleGetAllTrainers = async () => {
        await getAllTrainerTeams()
    }

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
                                <button onClick={handleGetAllTrainers}>Test get all teams</button>
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