import './HomePage.css'
import {NavLink as Link} from 'react-router-dom'
import {useState} from 'react'
// import { useState, useEffect} from 'react';

export function HomePage() {

  const [usernameRegistration, setUsernameRegistration] = useState('')
  const [emailRegistration, setEmailRegistration] = useState('')
  const [passwordRegistration, setPasswordRegistration] = useState('')

  const signinClick = () => {
    let signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
    let signinBtn = document.getElementById("signinBtn")! as HTMLButtonElement;
    let title = document.getElementById('title')! as HTMLElement;
    let nameField = document.getElementById("nameField")! as HTMLElement;
    if (signinBtn.classList.contains('selected'))
      {
        // do some code--check that user validation conditions are entered correct
        // calls for some form of validation check
        // signs in user if all credentials entered are correct
        return fetch(`http://localhost:5177/login?useCookies=true&useSessionCookies=true`, {
          method: "POST",
          // credentials: "include",
          body: JSON.stringify({
            "username": usernameRegistration,
            "password": passwordRegistration
          }),
            headers: {
              "Content-type": "application/json"
            }
          })
          .then (response => {
            if(response.ok) {
              window.alert("Signup Successful");
            }
          })
          .catch (error =>{
            throw error;
          })
      }
    else{
      nameField?.style.setProperty("max-height", "0");
      title.innerHTML = 'Sign In';
      signupBtn.classList.add("disable");
      signupBtn.classList.remove("selected")
      signinBtn.classList.remove("disable");
      signinBtn.classList.add("selected");
      }
  }  
        
  const signupClick = () => {
    let signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
    let signinBtn = document.getElementById("signinBtn")! as HTMLButtonElement;
    let title = document.getElementById('title')! as HTMLElement;
    let nameField = document.getElementById("nameField")! as HTMLElement;
    if (signupBtn.classList.contains('selected'))
      {
        
        return fetch("http://localhost:5177/register", {
          method: "POST",
          body: JSON.stringify({
            "username": usernameRegistration,
            "email": emailRegistration,
            "password": passwordRegistration
          }),
            headers: {
              "Authorization": "bearer my-token",
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then (response => {
            if(response.ok) {
              window.alert("Signup Successful");
            }
          })
          .catch (error =>{
            throw error;
          })
      }
      else
      {
        nameField?.style.setProperty("max-height", "65px");
        title.innerHTML = 'Sign Up';
        signupBtn.classList.remove("disable");
        signupBtn.classList.add("selected");
        signinBtn.classList.add("disable");
        signinBtn.classList.remove("selected");
      }

  }

  const logout = () => {
    return fetch(`http://localhost:5177/logout`, {
          method: "POST",
          // credentials: "include",
          body: JSON.stringify({
            "username": usernameRegistration,
            "password": passwordRegistration
          }),
            headers: {
              "Content-type": "application/json"
            }
          })
          .then (response => {
            if(response.ok) {
              window.alert("Logout Successful");
            }
          })
          .catch (error =>{
            throw error;
          })
      }
          
  const UserRegistration = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUsernameRegistration(e.target.value);
  }

  return (
    <div>
      <Link to="/displaypokemon">
      <button className='navButtons'>
        Display pokemon
      </button>
      </Link>
      <Link to="/trainer">
      <button className='navButtons'>
        Trainer Team View
      </button>
      </Link>
      <Link to="/teambuilder">
      <button className='navButtons'>
        Team Builder
      </button>
      </Link>
      <div className="container">
        <div className="form-box">
          <h1 id="title">Sign Up</h1>
            <form>
              <div className="input-group">

              <div className="input-field" id="nameField">
                  <i className="fa-solid fa-envelope"></i>
                  <input 
                    id="emailField" 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmailRegistration(e.target.value)}
                  />
                </div>

                <div className="input-field">
                  <i className="fa-solid fa-user-plus"></i>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={UserRegistration}
                  />
                </div>
          
                <div className="input-field">
                  <i className="fa-solid fa-lock"></i>
                  <input 
                    id="passwordField" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPasswordRegistration(e.target.value)}
                  />
                </div>

                <p>Lost Password <a href="#">Click Here!</a></p>
              </div>

              <div className="btn-field"> 
                <button type="button" id="signupBtn" onClick={()=>signupClick()} className=''>Sign Up</button>
                <button type="button" id="signinBtn" className="disable" onClick={()=>signinClick()}>Sign In</button>
                <button type="button" onClick={() => logout()}>logout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}
