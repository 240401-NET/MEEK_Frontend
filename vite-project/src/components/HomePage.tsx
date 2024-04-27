import './HomePage.css'
import {NavLink as Link} from 'react-router-dom'
// import { useState, useEffect} from 'react';

export function HomePage() {


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
        // do validation to sign up user
        // sign up user
        // store user information in database
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
          
  return (
    <div>
      <Link to="/displaypokemon">
      <button>
        Display pokemon
      </button>
      </Link>
      <div className="container">
        <div className="form-box">
          <h1 id="title">Sign Up</h1>
            <form>
              <div className="input-group">
                <div className="input-field" id="nameField">
                  <i className="fa-solid fa-user-plus"></i>
                  <input type="text" placeholder="Name"/>
                </div>
          
                <div className="input-field">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="email" placeholder="Email"/>
                </div>
          
                <div className="input-field">
                  <i className="fa-solid fa-lock"></i>
                  <input type="password" placeholder="Password"/>
                </div>

                <p>Lost Password <a href="#">Click Here!</a></p>
              </div>

              <div className="btn-field"> 
                <button type="button" id="signupBtn" onClick={()=>signupClick()} className=''>Sign Up</button>
                <button type="button" id="signinBtn" className="disable" onClick={()=>signinClick()}>Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}
