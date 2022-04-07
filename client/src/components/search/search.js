import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function handleSearchChange (e){

    setSearch(e.target.value)
}

function handleSearchSubmit (e){
    e.preventDefault()
    console.log(search)
}

function test(e){
    e.preventDefault()
    axios.get(`http://api.sehavniva.no/tideapi.php?lat=58.974339&lon=5.730121&fromtime=2022-04-07T00%3A00&totime=2022-04-08T00%3A00&datatype=all&refcode=cd&place=&file=&lang=nn&interval=10&dst=0&tzone=&tide_request=locationdata`)
    .then(r => console.log(r))
}

    return (
        <form
        >
            <input
                type='text'
                onChange= {handleSearchChange}
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