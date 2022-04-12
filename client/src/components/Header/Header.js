import React from 'react';
import {elastic as Menu} from "react-burger-menu"
import "./Header.css"



function Header( {user, logout, userFavorites} ){

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

    return(
    <div className="headerwrapper" >
        <div className="menuholder"> 
        <Menu>
        <div> {user.username} </div>
        <div>Home</div>
        <div>Favorites</div>
        {/* ul is an unordered list */}
        <ul>
            {favoritesToDisplay(user.favoritelocations)}
            
        </ul>
        <div onClick={logout}>Logout</div>
    </Menu>
        </div>
        <div className="title">Lua Tide</div>
        </div>
)
}


export default Header