import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import XMLParser from 'react-xml-parser';
import { useHistory } from 'react-router-dom';
import oceano from "./oceano.jpeg"
import './Home.css'
import apollomoon from "./apollomoon.png";
import arrowdown from "./arrowdown.png";
import { animateScroll as ScrollAction } from 'react-scroll';
import moonphases from "./moonphases.jpeg";
import fishhunter from './fishhunter.jpeg'
import tidecreatures from './tidecreatures.jpeg'

function Home({ latitude, longitude, search, setResultData, searchTitle, setSearchTitle, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options }) {
    // history deixa voce navegar com clicks, deixa voce contolar o futuro
    let history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        makeCoordinates()
        fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
            .then(response => response.json())
            .then(response => {
                setResultData(response.extremes)
                setSearchTitle(search)
                console.log(response)
            })
            .catch(err => console.error(err));
        //history.push is going to take us to the new page, nesse caso search pagina
        history.push("./search")
    }


    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    function scrollTop() {
        ScrollAction.scrollToTop();
        // window.scrollTo(0,1000)
    }
    function scrollBottom() {
        ScrollAction.scrollToBottom();
    }


    return (
        <React.Fragment>
            <div className="mainhome" >
                {/* <img className="oceanimage" src={oceano} alt="oceano" /> */}
                <div className="backgroundimage" ></div>
                <img className="apollomoon" src={apollomoon} alt="moon" />
                <img className="arrowdown" src={arrowdown} alt="scroll-down" onClick={scrollBottom} />
                <form className="searchform" onSubmit={handleSubmit}>
                    <input className="searchbar" placeholder="Search tides here" type="text"
                        onChange={handleSearchChange}
                    />
                </form>
            </div>
            <div className="space">-</div>
            <div className="more-info">
                {/* <h1>Hello world!</h1> */}
                <div className='backdrop'>
                    <div className='rectanglewrapper'>
                        <div className="rectangle">
                            <img className="minimoon" src={fishhunter} alt="fisherman" />
                            <div className='rectangle-title'>Fishing and tides</div>
                            <div> </div>
                        </div>
                        <div className="rectangle">
                            <img className="minimoon" src={moonphases} alt="phases" />
                            <div className='rectangle-title'>Moon phases</div>
                            <div></div>
                        </div>
                        <div className="rectangle">
                        <img className="minimoon" src={tidecreatures} alt="creatures" />
                            <div className='rectangle-title'>5 ways animals use tides</div>
                            <ul className= "tidecreatures">
                                <li className="creatures" > <b>Crabs:</b> Burrowing into the sand</li>
                                <li className="creatures"> <b>Seaweed and Sea-squirts:</b> Being covered with thick slime</li>   
                                <li className="creatures"> <b>Snails:</b> Moving with the falling tide</li>  
                                <li className="creatures"> <b>Limpet:</b> Clamping down onto a rock</li>         
                                <li className="creatures"> <b>Mussels and Barnacles:</b> shutting their shells tight</li> 
                                </ul>
                        </div>
                       

                       

                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Home