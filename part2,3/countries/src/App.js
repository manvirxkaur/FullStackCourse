import { React, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Display from './components/Display';


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

  return (
    <div>
      <form >
        <label>find countries </label>
        <input value={search} onChange={handleSearch}></input>
      </form><br/>
      <Display found={found} displayCountry={displayCountry} selectedCountry={selectedCountry} showCountry={showCountry}/>
    </div>
  );
}

export default App;
