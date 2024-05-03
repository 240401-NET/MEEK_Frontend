import "./Home.css"
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink as Link } from 'react-router-dom'
import { UserLogout } from '../services/userServices'

export const Home : React.FC = () =>{
    const {isLoggedIn, logoutUser} = useAuth()
    return (
        <>
            
            {isLoggedIn() ? (
                <>
                    <div className='logincontainer'>
                        <div className='form-box'>
                            <div className='btn-group'>
                                <Link to ="/trainer">
                                    <button>View all teams</button>
                                </Link>
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
                <div className='btn-field'>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button>Signup</button>
                    </Link>
                </div>
                </>

            )}
        </>
    )
}