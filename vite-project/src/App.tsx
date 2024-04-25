import './App.css'

function App() {

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
              <button type="button" id="signupBtn">Sign Up</button>
              <button type="button" id="signinBtn" className="disable">Sign In</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default App
