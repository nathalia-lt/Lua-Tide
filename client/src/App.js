import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/login/Login"
import Signup from "./components/signup/signup"

function App() {

const [user, setUser] = useState ("")  
useEffect(() => {
  fetch('/me').then((r) => {
    if (r.ok) {
      r.json().then((user) => setUser(user))
    }
  });
}, []);

function handleLogoutClick() {
  fetch("/logout", { method: "DELETE" }).then((r) => {
    if (r.ok) {
      setUser(null);
    }
  });
}


  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route path="/login">
            <Login user={user} onLogin={setUser} logout={handleLogoutClick} />
          </Route>
          <Route path="/signup">
            <Signup user={user} signUp={setUser} />
          </Route>
      </Switch>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
