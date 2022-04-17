import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import XMLParser from 'react-xml-parser';
import { useHistory } from 'react-router-dom';
import oceano from "./oceano.jpeg"
import './Home.css'
import apollomoon from "./apollomoon.png";
import arrowdown from "./arrowdown.png";
import {animateScroll as ScrollAction} from 'react-scroll';

function Home( { latitude, longitude, search, setResultData, searchTitle, setSearchTitle, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options} ) {
    // history deixa voce navegar com clicks, deixa voce contolar o futuro
    let history = useHistory()

    function handleSubmit(e){
        e.preventDefault();
        makeCoordinates()
    fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
        .then(response => response.json())
        .then(response => 
            {setResultData(response.extremes)
                setSearchTitle(search)
            console.log(response)})
        .catch(err => console.error(err));
        //history.push is going to take us to the new page, nesse caso search pagina
        history.push("./search")
    }


    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    function scrollTop(){
        ScrollAction.scrollToTop();
        // window.scrollTo(0,1000)
    } 
    function scrollBottom(){
        ScrollAction.scrollToBottom();
    }


    return(
        <div className="mainhome" > 
        {/* <img className="oceanimage" src={oceano} alt="oceano" /> */}
        <div className="backgroundimage" ></div>
        <img className="apollomoon" src={apollomoon} alt="moon" />
        <img className="arrowdown" src={arrowdown} alt="scroll-down" onClick={scrollBottom} />
        <form className="searchform" onSubmit={handleSubmit}> 
            <input className="searchbar" placeholder="Search here" type="text" 
            onChange={handleSearchChange}
            />
        </form>

        </div>
    )
}

export default Home