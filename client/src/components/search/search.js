import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import XMLParser from 'react-xml-parser';

function Search({ searchUrl }) {
//faco um const statement pq quero fazer aparecer latitude e longitude no meu dropdown. Depois tenho que fazer um if statement
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState('')

    const [search, setSearch] = useState('')
    //para fazer o calendario aparecer, depois colocar no input no retorno, nao esquecer de colocaro tipo de retorno
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        console.log(latitude,longitude)
    }

    function handleStartDateChange(e) {
        setStartDate(e.target.value + "T00%3A00")
        // 2022-04-07T00%3A00

    }

    function handleEndDateChange(e) {
        setEndDate(e.target.value + "T00%3A00")
        //2022-04-08T00%3A00
    }

    // aqui eu faco um handleLocationChange para quando eu mudar a localizacao no meu dropdown, tambem troque a latitude
    function handleLocationChange(e) {
        if (e.target.value == 'Anchorage'){ 
            setLatitude(60)
            setLongitude(-150)
        }
        else if (e.target.value == 'Le Havre'){ 
            setLatitude(50)
            setLongitude(0)
        }
        else if (e.target.value == 'Port Hedland'){ 
            setLatitude(-20)
            setLongitude(120)
        }
        if (e.target.value == 'Saint John'){ 
            setLatitude(45)
            setLongitude(-65)
        }
    }



    // com a function abaixo eu converto xml em json
    function test(e) {
        e.preventDefault()
        fetch(`http://api.sehavniva.no/tideapi.php?lat=58.974339&lon=5.730121&fromtime=${startDate}&totime=${endDate}&datatype=all&refcode=cd&place=&file=&lang=en&interval=60&dst=0&tzone=&tide_request=locationdata`)
            .then(res => res.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data);
                console.log(xml["children"][0]["children"][2]["children"])
                //esse console.log e para checar se aparece a variedade do objetos que eu quero usar. e so na terceira children que aparece.

            })
    }

    return (
//se um form para todos os inputs
        <form >
            <input
                type='text'
                onChange={handleSearchChange}
            />
            <input
                type='date'
                // value=
                onChange={handleStartDateChange}
            />
            <input
                type='date'
                // value=
                onChange={handleEndDateChange}
            />
            <select onChange={handleLocationChange} id="city" name="city">
                <option value="Anchorage">Anchorage, Alaska</option>
                <option value="Le Havre">Le Havre, France</option>
                <option value="Port Hedland">Port Hedland, Australia</option>
                <option value="Saint John">Saint John, Canada</option>
            </select>

            <button onClick={handleSearchSubmit}>Submit
            </button>
            <button onClick={test}>
                hello world
            </button>
        </form>
    )
}


export default Search