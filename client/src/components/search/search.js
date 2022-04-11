import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import XMLParser from 'react-xml-parser';

function Search({ searchUrl }) {
    //faco um const statement variable pq quero fazer aparecer latitude e longitude no meu dropdown. Depois tenho que fazer um if statement
    //allows to update values
    const [latitude, setLatitude] = useState('44.778')
    const [longitude, setLongitude] = useState('66.3096')
    const [location, setLocation] = useState('Bay of Fundy')
    const [resultData, setResultData] = useState([])
    const [numbersOfDays, setNumbersOfDays] = useState('1440')

    const [search, setSearch] = useState('')
    //para fazer o calendario aparecer, depois colocar no input no retorno, nao esquecer de colocaro tipo de retorno
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    function handleNumbersOfDaysChange(e){
        setNumbersOfDays(e.target.value)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        console.log(latitude, longitude)
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



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'tides.p.rapidapi.com',
        'X-RapidAPI-Key': '8c00650986msh9a2dca1babf6b42p1331fajsn55540aa2278f'
    }
};

// fetch('https://tides.p.rapidapi.com/tides?longitude=-2.097&latitude=44.414&interval=60&duration=1440', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


// com a function abaixo eu converto xml em json
function searchResults(e) {
    e.preventDefault()
    makeCoordinates()
    fetch(`https://tides.p.rapidapi.com/tides?longitude=${longitude}&latitude=${latitude}&radius=800&interval=60&duration=${numbersOfDays}`, options)
        .then(response => response.json())
        .then(response => 
            {setResultData(response.extremes)
            console.log(response)})
        .catch(err => console.error(err));
}

// gera resultados aleatorios para as mares de algumas cidades que procuramos
function makeCoordinates(){
    //latitude 
    //ceiling rounds up it to role number. round makes it more accurate
    let val = Math.round(Math.random()*10) //a number between 0 and 10
    let lat = shortenDecimals(Math.random(60)*100,2)
    setLatitude(val>5?-lat:lat)
    let val2 = Math.round(Math.random()*10)
    let lon = shortenDecimals(Math.random(100)*100,2)
    setLongitude(val2>5?-lon:lon)

}


function shortenDecimals(num, digits) {
    let numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    return parseFloat(finalResult);
}

function resultsToDisplay(data) {
    if (data===[]){
        return null
      } else if (data===undefined){
        
      }
      else{
    return data.map(date => {
        let dateTime = date.datetime.split(':')[0].split('T')
        let dateTime2 = dateTime[0]+' ' + dateTime[1] + ':00'
        
        return(
            <tr>
            <td>{dateTime2}</td>
            <td>{shortenDecimals(date.height, 2)}</td>
            <td>{date.state}</td>
          </tr>
        )
    })
}}

return (
    <div>
    {/* //se um form para todos os inputs */}
    <form >
         <input
                type='text'
                onChange={handleSearchChange}
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
    <table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Height (Measured in mean sea level)</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
            {resultsToDisplay(resultData)}
  </tbody>
</table>
</div>


)
}


export default Search