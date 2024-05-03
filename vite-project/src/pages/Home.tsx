import React from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink as Link } from 'react-router-dom'

export const Home : React.FC = () =>{
    const {isLoggedIn, logoutUser} = useAuth()
    return (
        <>
            <p>Home Page</p>
            {isLoggedIn() ? (
                <>
                <Link to ="/trainer">
                    <button>View all teams!</button>
                </Link>
                <button onClick={logoutUser}>Logout</button>
                </>

            ) : ( 
                <>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
                </>

            )}
        </>
    )
}