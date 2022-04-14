import React, { useState } from 'react';
import { elastic as Menu } from "react-burger-menu"
import "./Header.css"
import { useHistory } from 'react-router-dom'
import closebutton from "./closebutton.png"
import axios from 'axios';



function Header({ user, userFavorites, setUser, searchTitle, setSearchTitle, latitude, longitude, setResultData, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options }) {


    const [showFavorites, setShowFavorites] = useState(false)
    //we made a new state varible for determining if favorites are showing or not. Isso deixa o valor dinamico.

    let history = useHistory()

    function handleClickUser(){
        history.push("./edit")
    }


    // this function sets the value for showing the favorites and opposite.
    function handleClickFavorites() {
        console.log(showFavorites)
        setShowFavorites(!showFavorites)
    }

    function favoritesToDisplay(data) {
        if (data === []) {
        } else if (data === undefined) {

        }
        else {

            return data.map(favorite => {
                function handleSubmit(e) {
                    e.preventDefault();
                    //every time I map throught the data we create a new function for each location, when run sets the long and lat for their respective values.
                    //and we submit a search for those values and takes us to search results page to show us the results.
                    setLatitude(favorite.latitude)
                    setLongitude(favorite.longitude)
                    setSearch(favorite.city)
                    fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
                        .then(response => response.json())
                        .then(response => {
                            setResultData(response.extremes)
                            setSearchTitle(favorite.city)
                            console.log(response)
                        })
                        .catch(err => console.error(err));
                    //history.push is going to take us to the new page, nesse caso search pagina
                    history.push("./search")
                }
              
                function handleDelete(){
                    axios.delete("/favoritelocations/" + favorite.id)
                    .then(r => {
                        setUser(r.data)
                        //what Iam updating I am seting the response to the user
                    })
                    
                }



                // li is list items 
                // para colocar o x eu preciso fazer um wrapper em volta do elemento e assim.
                //sempre que eu quero que dois elementos estejam um do lado do outro eu tenho que wrappe them.
                
                return (<li className="favoriteItemWrapper" > <div onClick={handleSubmit}  >{favorite.city}</div>
                <img className="button" src={closebutton} alt="delete" onClick={handleDelete} />
                </li>)

            })
        }
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                history.push("./authorization")
                setUser(null);
            }
        });
    }


    function handleClickHome() {
        history.push("./")
    }

    return (
        <div className="headerwrapper" >
            <div className="menuholder">
                {user ? <Menu>
                    <div className="menutitle" > Menu </div>
                    <div className="menu" onClick={handleClickUser}> {user.username} </div>
                    <div className="menu" onClick={handleClickHome} >Home</div>
                    <div className="menu" onClick={handleClickFavorites} >Favorites</div>
                    {/* ul is an unordered list */}

                    {showFavorites ? <ul>
                        {favoritesToDisplay(user.favoritelocations)}

                    </ul> : null}
                    {/* will render nothing */}
                    <div className="menu" onClick={handleLogoutClick}>Logout</div>
                </Menu> : null}
            </div>
            <div className="title">Lua Tide</div>
        </div>
    )
}


export default Header