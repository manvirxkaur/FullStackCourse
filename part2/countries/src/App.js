import { React, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Weather from './components/Weather';

const App=()=> {
  const [data, setData]=useState([])
  const [search,setSearch]=useState([])
  const [found, setFound]=useState([])
  const [displayCountry, setDisplayCountry]=useState(false)
  const [selectedCountry, setSelectedCountry]=useState([])


  const handleSearch=(event)=>
  {
    event.preventDefault();
    setSearch(event.target.value)

    if(event.target.value.trim()==='')
    {
      setFound([]);
      return;
    }
    setFound(data.filter(i=>i.name.toLowerCase().includes(event.target.value)))
  }

  useEffect(()=>
  {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response=>
      {
        setData(response.data)
        setSelectedCountry(response.data[0])
      })
  },[])
  
  const showCountry=(props)=>
  {
    if(displayCountry===true&&selectedCountry!==props)
    {
      setSelectedCountry(props);
      return;
    }
    else if(displayCountry===true&&selectedCountry===props)
    {
      setDisplayCountry(false);
      return;
    }
    setDisplayCountry(true);
    setSelectedCountry(props);
    
    return;
  }
  const Country=({c})=>
  {
    return(
      <div>

          <h1>{c.name}</h1>
          <div>CAPITAL : {c.capital}</div>
          <div>POPULATION : {c.population}</div>
          <h3>Languages</h3>
          <div>{c.languages.map(d=><div key={d.name}>{d.name} </div>)}</div><br/>
          <img  src={c.flag} alt={c.name}></img>
          <Weather selectedCapital={c.capital}/>
      </div>
    )
  }
  const ListCountry=()=>
  {
    return(
    <div>
      {
        found.map(d=>
        <li key={d.name}>{d.name} <button onClick={()=>showCountry(d)}>show</button> 
          { displayCountry&&selectedCountry===d ? <Country c={selectedCountry}/>: null }
        </li>)
      }
    </div>
    )
  }
  const Display=()=>
  {
    const len=found.length;
    if(len>10)
    {
      return <div>Too many matches, specify another filter</div>
    }
    if(len>1 && len<=10)
    {
      return  <ListCountry/>
    }
    if(len===1)
    {
    return (
      <>
        <Country c={found[0]}/>
      </>
      )
    }
    return <div>No matches found....</div>

  }

  return (
    <div>
      <form >
        <label>find countries </label>
        <input value={search} onChange={handleSearch}></input>
      </form><br/>
      <Display/>
    </div>
  );
}

export default App;
