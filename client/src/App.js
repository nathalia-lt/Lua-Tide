import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/login/Login"
import Signup from "./components/signup/signup"
import Search from "./components/search/search"

function App() {

  const [user, setUser] = useState("")
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

  // const [search, setSearch] = useState('');

  // function handleChange(event) {
  //   setSearch(event.target.value);
  //   console.log(search)
  // }

  // // let [searchUrl,setSearchUrl] = useState('');
  // let [searchUrl, setSearchUrl] = useState('')
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   setSearchUrl(`http://api.sehavniva.no/tideapi.php?lat=${location.latitude}&lon=${location.longitude}&fromtime=${startTime}totime=${endTime}%3A00&datatype=all&refcode=cd&place=&file=&lang=nn&interval=10&dst=0&tzone=&tide_request=locationdata`
  //   )
  // }

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
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
