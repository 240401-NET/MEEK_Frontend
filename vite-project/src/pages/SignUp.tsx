import React, { useState } from 'react'
import "./HomePage.css"
import { useAuth } from '../context/AuthContext'
import { SignupFormInterface } from '../models/UserInterfaces'
import { NavLink as Link } from 'react-router-dom'
import musicFile from "../assets/music.mp3";

export const SignUp : React.FC<SignupFormInterface> = () => {
    const {register} = useAuth();
    const [signupFormData, setSignupFormData] = useState<SignupFormInterface> ({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name , value } = e.target;
        setSignupFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(signupFormData.email, signupFormData.username, signupFormData.password)
    }

    return (
        <>
        <div className='container'>
                <div className='form-box'>
                    <h1 id="title">Sign Up</h1>
                    <form onSubmit={(e) => handleSignup(e)}>
                        <div className='input-group'>

                            <div className='input-field'>
                                <i className="fa-solid fa-user-plus"></i>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={signupFormData.username}
                                    onChange={handleChange}
                                    className=''
                                />
                            </div>

                            <div className='input-field'>
                                <i className="fa-solid fa-lock"></i>
                                <input 
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={signupFormData.email}
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
                                    value={signupFormData.password}
                                    onChange={handleChange}
                                    className=''
                                />
                            </div>

                            <div className='btn-field'>
                                <button type='submit' id="signupBtn">Sign Up</button>
                            </div>
                            <br />
                            
                            <div className='lost-password'>
                                <p>Already have an account? <Link to="/login">Click Here!</Link></p>    
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
        <audio autoPlay loop>
          <source src={musicFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
        </>
    )
}