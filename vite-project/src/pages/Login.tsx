import React , {useState} from 'react'
import "./HomePage.css"
import { useAuth } from '../context/AuthContext'
import { LoginFormInterface } from '../models/UserInterfaces'
import { NavLink as Link } from 'react-router-dom'

export const Login : React.FC<LoginFormInterface> = () =>{
    const {loginUser} = useAuth()
    const [loginFormData, setLoginFormData] = useState<LoginFormInterface>({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setLoginFormData((prev) => ({...prev, [name] : value}));
    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(loginFormData.username, loginFormData.password)

    }

    return (
        <>
            <div className='container'>
                <div className='form-box'>
                    <h1 id="title">Login</h1>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className='input-group'>

                            <div className='input-field'>
                                <i className="fa-solid fa-user-plus"></i>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={loginFormData.username}
                                    onChange={handleChange}
                                    className=''
                                />
                            </div>

                            <div className='input-field'>
                                <i className="fa-solid fa-lock"></i>
                                <input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginFormData.password}
                                    onChange={handleChange}
                                    className=''
                                />
                            </div>

                            <div className='btn-field'>
                                <button type='submit' id="signinBtn">Sign In</button>
                            </div>
                            <br />
                            
                            <div className='lost-password'>
                                <p>Lost Password <a href="#">Click Here!</a></p>    
                            </div>
                            <br />
                                
                            <div className='lost-password'>
                                <p>Don't have an account? <Link to="/signup">Register!</Link></p>   
                            </div>

                        </div>
                    </form>
                </div>
            </div>
                
        </>
    )
}