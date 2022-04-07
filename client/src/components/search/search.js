import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  XMLParser from 'react-xml-parser';

function Search({ searchUrl }) {

    // useEffect(async ()=>{
    //     console.log(searchUrl)
    //     axios.get(searchUrl)
    //     .then(r=> {
    //         console.log(r.data)
    //         setSearchingCity(r.data.items)
    //     })   
    // },[searchUrl])

const [search, setSearch] = useState ('')
//para fazer o calendario aparecer, depois colocar no input no retorno, nao esquecer de colocaro tipo de retorno
const [startDate, setStartDate] = useState ('')
const [endDate, setEndDate] = useState ('')

function handleSearchChange (e){
    setSearch(e.target.value)
}

function handleSearchSubmit (e){
    e.preventDefault()
    console.log(endDate)
}

function handleStartDateChange(e){
    setStartDate(e.target.value+"T00%3A00")
    // 2022-04-07T00%3A00

} 

function handleEndDateChange(e){
    setEndDate(e.target.value+"T00%3A00")
    //2022-04-08T00%3A00
}

// com a function abaixo eu converto xml em json
function test(e){
    e.preventDefault()
    fetch(`http://api.sehavniva.no/tideapi.php?lat=58.974339&lon=5.730121&fromtime=${startDate}&totime=${endDate}&datatype=all&refcode=cd&place=&file=&lang=en&interval=60&dst=0&tzone=&tide_request=locationdata`)
    .then(res => res.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data); 
                console.log(xml["children"][0]["children"][2]["children"])
            
})}

    return (
        <form
        >
            <input
                type='text'
                onChange= {handleSearchChange}
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
            <button onClick={handleSearchSubmit}>Submit
            </button>
            <button onClick={test}>
                hello world
            </button>
        </form>
    )
}


export default Search