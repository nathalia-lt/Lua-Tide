import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/login/Login"
import Signup from "./components/signup/signup"
import Search from "./components/search/search"
import Home from "./components/home/Home"
import Header from "./components/Header/Header"


function App() {

  //faco um const statement variable pq quero fazer aparecer latitude e longitude no meu dropdown. Depois tenho que fazer um if statement
    //allows to update values
    const [latitude, setLatitude] = useState('44.778')
    const [longitude, setLongitude] = useState('66.3096')
    const [location, setLocation] = useState('Bay of Fundy')
    const [resultData, setResultData] = useState([])
    const [numbersOfDays, setNumbersOfDays] = useState('1440')

    const [search, setSearch] = useState('')
    //para fazer o calendario aparecer, depois colocar no input no retorno, nao esquecer de colocar o tipo de retorno
    //const [startDate, setStartDate] = useState('')
    //const [endDate, setEndDate] = useState('')


  const [user, setUser] = useState("")
  const [userFavorites, setUserFavorites] = useState([])
  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => {setUser(user)
        setUserFavorites(user.favoritelocations)})
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

  function searchResults(e) {
    e.preventDefault()
    makeCoordinates()
    fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
        .then(response => response.json())
        .then(response => 
            {setResultData(response.extremes)
            console.log(response)})
        .catch(err => console.error(err));
}

const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Host': 'tides.p.rapidapi.com',
      'X-RapidAPI-Key': '8c00650986msh9a2dca1babf6b42p1331fajsn55540aa2278f'
  }
};

// gera resultados aleatorios para as mares de algumas cidades que procuramos
function makeCoordinates(){ 
  //latitude 
  //ceiling rounds up it to role number. round makes it more accurate
  let val = Math.round(Math.random()*10) //a number between 0 and 10
  let lat = shortenDecimals(Math.random(60)*60,2)
  setLatitude(val>5?-lat:lat)
  let val2 = Math.round(Math.random()*10)
  let lon = shortenDecimals(Math.random(100)*100,2)
  setLongitude(val2>5?-lon:lon)

}


function shortenDecimals(num, digits) { 
  let numS = num.toString(),
      decPos = numS.indexOf('.'),
      substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
      trimmedResult = numS.substr(0, substrLength),
      finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
  return parseFloat(finalResult);
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
        <Header user={user} logout={handleLogoutClick} userFavorites={userFavorites} />
        <Switch>
          <Route path="/login">
            <Login user={user} onLogin={setUser} logout={handleLogoutClick} setUserFavorites={setUserFavorites} />
          </Route>
          <Route path="/signup">
            <Signup user={user} signUp={setUser} />
          </Route>
          <Route path="/search">
            <Search setLatitude={setLatitude} setLongitude={setLongitude} shortenDecimals={shortenDecimals} searchResults={searchResults} setNumbersOfDays={setNumbersOfDays} resultData={resultData} setSearch={setSearch} />
          </Route>
          <Route path="/">
            <Home user={user} makeCoordinates={makeCoordinates} numbersOfDays={numbersOfDays} options={options} setLatitude={setLatitude} setResultData={setResultData} setLongitude={setLongitude} shortenDecimals={shortenDecimals} searchResults={searchResults} setNumbersOfDays={setNumbersOfDays} resultData={resultData} setSearch={setSearch} latitude={latitude} longitude={longitude}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
