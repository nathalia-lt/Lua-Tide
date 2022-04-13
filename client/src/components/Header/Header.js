import React, { useState } from 'react';
import {elastic as Menu} from "react-burger-menu"
import "./Header.css"
import { useHistory } from 'react-router-dom'



function Header( {user, userFavorites, setUser} ){
    const [showFavorites, setShowFavorites] = useState(false)
    let history = useHistory()

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
            // li is list items 
        return (<li>{favorite.city}</li>)
        
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


    return(
    <div className="headerwrapper" >
        <div className="menuholder"> 
        { user? <Menu> 
        <div> {user.username} </div>
        <div>Home</div>
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