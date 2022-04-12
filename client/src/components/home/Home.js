import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import XMLParser from 'react-xml-parser';
import { useHistory } from 'react-router-dom';

function Home( { latitude, longitude, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options, setResultData } ) {
    // history deixa voce navegar com clicks, deixa voce contolar o futuro
    let history = useHistory()

    function handleSubmit(e){
        e.preventDefault();
        makeCoordinates()
    fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
        .then(response => response.json())
        .then(response => 
            {setResultData(response.extremes)
            console.log(response)})
        .catch(err => console.error(err));
        //history.push is going to take us to the new page, nesse caso search pagina
        history.push("./search")
        history.go(0)
    }


    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            onChange={handleSearchChange}
            />
            
        </form>
    )
}



export default Home