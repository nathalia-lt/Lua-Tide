import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import XMLParser from 'react-xml-parser';
import { useHistory } from 'react-router-dom';
import heart from "./heart.png";
import redheart from "./redheart.png";
import "./search.css"



function Search({ searchUrl, user, setUser, latitude, longitude, userFavorites, setUserFavorites, setLatitude, setLongitude, shortenDecimals, searchResults, setNumbersOfDays, resultData, setSearch, search, searchTitle, setSearchTitle }) {
 
    let history = useHistory()
    const [liked, setLiked] = useState(false)
    

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    function handleClickBack(){
        history.push("./")
    }

    function handleNumbersOfDaysChange(e) {
        setNumbersOfDays(e.target.value)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
       // console.log(latitude, longitude)
    }

    function handleStartDateChange(e) {
        //setStartDate(e.target.value + "T00%3A00")
        // 2022-04-07T00%3A00

    }

    function handleEndDateChange(e) {
        //setEndDate(e.target.value + "T00%3A00")
        //2022-04-08T00%3A00
    }

    // aqui eu faco um handleLocationChange para quando eu mudar a localizacao no meu dropdown, tambem troque a latitude
    function handleLocationChange(e) {
        if (e.target.value == 'Bay of Fundy') {
            setLatitude(44.778)
            setLongitude(66.3096)
        }
        else if (e.target.value == 'Ungava Bay') {
            setLatitude(59.8068)
            setLongitude(67.7243)
        }
        else if (e.target.value == 'Bristol Channel') {
            setLatitude(51.3564)
            setLongitude(4.1845)
        }
        if (e.target.value == 'Cook Inlet') {
            setLatitude(59.3722)
            setLongitude(152.6440)
        }
        else if (e.target.value == 'Rio Gallegos') {
            setLatitude(51.6230)
            setLongitude(69.2168)
        }
        else if (e.target.value == 'Mont Saint-Michel') {
            setLatitude(48.6361)
            setLongitude(1.5115)
        }
        else if (e.target.value == 'Derby') {
            setLatitude(17.3093)
            setLongitude(123.6402)
        }
    }

    //spread operator bellow, that calls all the user favorites. put all the details into the user favorites.
    function handleLikeClick(){
        let details = {
            'city': search,
            'longitude': longitude,
            'latitude': latitude,
        }
        //axios simplefy the fetch process, axios is a js model
        axios.post('/favoritelocations', details)
        .then(r => {setUser(r.data)
        setLiked(true)})
    }


    // fetch('https://tides.p.rapidapi.com/tides?longitude=-2.097&latitude=44.414&interval=60&duration=1440', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    function resultsToDisplay(data) {
        //the data that we are showing in if empty or undefined, cant e map, because it is empty. If we write a condition it will not return any of this.
        if (data === []|| data === undefined)  {
            return null
        }
        else {
            return data.map(date => {
                
                let dateTime = date.datetime.split(':')[0].split('T')
                let dateTime2 = dateTime[0] + ' ' + dateTime[1] + ':00'
                //takes us the first object in the array, the index of 1 is the time.

                return (
                    <tr>
                        <td>{dateTime2}</td>
                        <td>{shortenDecimals(date.height, 2)}</td>
                        <td>{date.state}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <div>
            {/* //se um form para todos os inputs */}
            <form >
                <input
                    type='text'
                    onChange={handleSearchChange}
                    value={search}
                />

                {/* <select onChange={handleLocationChange} id="city" name="city">
            <option value="Bay of Fundy">Bay of Fundy, Canada</option>
            <option value="Ungava Bay">Ungava, Quebec</option>
            <option value="Bristol Channel">Bristol Channel, Uk</option>
            <option value="Cook Inlet">Cook Inlet, Alaska</option>
            <option value="Rio Gallegos">Rio Gallegos, Argentina</option>
            <option value="Mont Saint-Michel">Monte Saint-Michel, France</option>
            <option value="Derby">Derby, Australia</option>
        </select> */}
                <label>Days</label>
                <select onChange={handleNumbersOfDaysChange} id="days" name="days">
                    <option value="1440">1</option>
                    <option value="2880">2</option>
                    <option value="4320">3</option>
                    <option value="5760">4</option>
                    <option value="7200">5</option>
                    <option value="8640">6</option>
                    <option value="10080">7</option>
                </select>


                <button onClick={searchResults}>
                    Submit
                </button>
            </form>
            {/* need to make a div for h2 because I want it to appear in the same line of the favorite button */}
            <div className="titlewrapper" >
            <h2> Results for {searchTitle}: </h2>
         {liked? <img className="heart" src={redheart} alt='liked' /> : <img onClick={handleLikeClick} className="heart" src={heart} alt='like' />}       
     </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Height (Measured in mean sea level)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsToDisplay(resultData) }
                </tbody>
            </table>
        </div>
    )
}


export default Search