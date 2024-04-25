import './App.css'

function App() {



const signinClick = () => {
let signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
let signinBtn = document.getElementById("signinBtn")! as HTMLButtonElement;
let title = document.getElementById('title')! as HTMLElement;
let nameField = document.getElementById("nameField")! as HTMLElement;
  // signinBtn?.style.setProperty("background", "green");
  nameField?.style.setProperty("max-height", "0");
  title.innerHTML = 'Sign In';
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
}


const signupClick = () => {
  let signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
  let signinBtn = document.getElementById("signinBtn")! as HTMLButtonElement;
  let title = document.getElementById('title')! as HTMLElement;
  let nameField = document.getElementById("nameField")! as HTMLElement;
    // signinBtn?.style.setProperty("background", "green");
    nameField?.style.setProperty("max-height", "65px");
    title.innerHTML = 'Sign Up';
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
  }
  
  return (
    <div>
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
              <button type="button" id="signupBtn" onClick={()=>signupClick()}>Sign Up</button>
              <button type="button" id="signinBtn" className="disable" onClick={()=>signinClick()}>Sign In</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

// let signinBtn : HTMLElement = document.getElementById("signinBtn")!;
// let nameField : HTMLElement = document.getElementById("nameField")!;
// let title = document.getElementById("title")!;
// function click (){

// }

// signupBtn.onclick = ()=>{
//   nameField.style.maxHeight = "60px";
//   title.innerHTML = "Sign Up";
//   signupBtn.classList.remove("disable");
//   signinBtn.classList.add("disable");
// }


export default App
