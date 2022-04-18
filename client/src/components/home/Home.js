import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import XMLParser from 'react-xml-parser';
import { useHistory } from 'react-router-dom';
import oceano from "./oceano.jpeg"
import './Home.css'
import apollomoon from "./apollomoon.png";
import arrowdown from "./arrowdown.png";
import { animateScroll as ScrollAction } from 'react-scroll';
import fishhunter from './fishhunter.jpeg'
import tidecreatures from './tidecreatures.jpeg'
import tide from './tide.jpeg'
import newmoonremove from './newmoonremove.png'
import fullmoonremove from './fullmoonremove.png'
import waningcrescentremove from './waningcrescentremove.png'
import waninggibousremove from './waninggibousremove.png'
import waxingcrescentremove from './waxingcrescentremove.png'
import waxinggibousremove from './waxinggibousremove.png'

function Home({ latitude, longitude, search, setResultData, searchTitle, setSearchTitle, searchUrl, setLatitude, setLongitude, shortenDecimals, setSearchResults, setNumbersOfDays, resultData, setSearch, makeCoordinates, numbersOfDays, options }) {
    // history deixa voce navegar com clicks, deixa voce contolar o futuro
    let history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        makeCoordinates()
        fetch(`https://tides.p.rapidapi.com/tides?longitude=${-17.39}&latitude=${48.56}&radius=800&interval=60`, options)
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
                            <img className="minimoon" src={tide} alt="Tide" />
                            <div className='rectangle-title'>Extremes</div>
                            <div></div>
                        </div>
                        <div className="rectangle">
                            <img className="minimoon" src={tidecreatures} alt="creatures" />
                            <div className='rectangle-title'>5 ways animals use tides</div>
                            <ul className="tidecreatures">
                                <li className="creatures"> <b>Crabs:</b> Burrowing into the sand</li>
                                <li className="creatures"> <b>Seaweed and Sea-squirts:</b> Being covered with thick slime</li>
                                <li className="creatures"> <b>Snails:</b> Moving with the falling tide</li>
                                <li className="creatures"> <b>Limpet:</b> Clamping down onto a rock</li>
                                <li className="creatures"> <b>Mussels and Barnacles:</b> shutting their shells tight</li>
                            </ul>
                        </div>

                    </div>
                    <div className="moonphases">
                        <div className='rectangle-moon'>Moon Phases</div>
                        <div className='moonphases-information'>
                            <ul className="moonphaseslist">
                                {/* quando eu tenho somente o texto, posso colocar so com o elemento li,
                                mas como eu quero acresecentar tambem uma imagem tenho que colocar div */}
                                <li className="phases">
                                    <div><b>New Moon:</b> When the Earth, Moon and Sun align, the gravitational attraction exerted by the two stars on the oceans adds up, generating sea currents that cause a maximum rise in sea level.</div>

                                </li>
                                <li className="phases"> <div><b>Waxing Moon:</b> In this phase the Moon and the Sun form a right angle. Thus, lunar gravitation opposes solar. Even so, the level differences between high and low tides are much smaller.</div>
                                </li>
                                <li className="phases"> <div><b>Full Moon:</b> About two weeks after the Nova phase, the Moon assumes a position where it lines up with the Sun and Earth. This combination brings a new wave of high tides.</div>
                                </li>
                                <li className="phases"> <div><b>Waning Moon:</b> In this lunar phase, there is a decrease in the influence of the Sun and Moon on the tides. On the night when half the Moon is visible, the attraction reaches its lowest value.</div>
                                </li>

                            </ul>
                            <ul className='moonimages-list'>
                                <li className='phases-images'>
                                    <div className='moonimgwrapper'>
                                        <img className="moonpic" src={newmoonremove} alt="New Moon" />
                                    </div>
                                </li>
                                <li className='phases-images'>
                                    <div className='moonimgwrapper'>
                                        <img className="moonpic" src={waxingcrescentremove} alt="Waxing Moon" />
                                        <img className="moonpic" src={waxinggibousremove} alt="Waxing Moon" />
                                    </div>
                                </li>
                                <li className='phases-images'>
                                    <div className='moonimgwrapper'>
                                        <img className="moonpic" src={fullmoonremove} alt="Full Moon" />
                                    </div>
                                </li>
                                <li className='phases-images'>
                                    <div className='moonimgwrapper'>
                                        <img className="moonpic" src={waningcrescentremove} alt="Waning Moon" />
                                        <img className="moonpic" src={waninggibousremove} alt="Waning Moon" />
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home