import React, { useState } from 'react';
import {elastic as Menu} from "react-burger-menu"
import "./Header.css"
import { useHistory } from 'react-router-dom'



function Header( {user, userFavorites, setUser, searchTitle, setSearchTitle,  latitude, longitude, setResultData, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options}){


    const [showFavorites, setShowFavorites] = useState(false)
    //we made a new state varible for determining if favorites are showing or not.

    let history = useHistory()


// this function sets the value for showing the favorites and opposite.
    function handleClickFavorites(){
        console.log(showFavorites)
        setShowFavorites(!showFavorites)
    }

    function favoritesToDisplay(data){
        if (data === []) {
        } else if (data === undefined) {

        }
        else {

        return data.map(favorite => { 
            function handleSubmit(e){
                e.preventDefault();
                //every time we map throught the data we create a new function for each location, when run sets the long and lat for their respective values.
                //and we submit a search for those values and takes us to search results page to show us the results.
                setLatitude(favorite.latitude)
                setLongitude(favorite.longitude)
                setSearch(favorite.city)
            fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
                .then(response => response.json())
                .then(response => 
                    {setResultData(response.extremes)
                        setSearchTitle(favorite.city)
                    console.log(response)})
                .catch(err => console.error(err));
                //history.push is going to take us to the new page, nesse caso search pagina
                history.push("./search")
            }
            // li is list items 
        return (<li onClick={handleSubmit} >{favorite.city}</li>)
        
    })
        }
}

function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        history.push("./login")
        setUser(null);
      }
    });
  }


  function handleClickHome(){
      history.push("./")
  }

    return(
    <div className="headerwrapper" >
        <div className="menuholder"> 
        { user? <Menu> 
        <div> {user.username} </div>
        <div onClick={handleClickHome} >Home</div>
        <div onClick={handleClickFavorites} >Favorites</div>
        {/* ul is an unordered list */}
        
        {showFavorites? <ul>
            {favoritesToDisplay(user.favoritelocations)}
            
        </ul> : null} 
        {/* will render nothing */}
        <div onClick={handleLogoutClick}>Logout</div>
    </Menu> : null }
        </div>
        <div className="title">Lua Tide</div>
        </div>
)
}


export default Header