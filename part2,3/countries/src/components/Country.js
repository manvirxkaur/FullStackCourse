import React from 'react'
import Weather from './Weather'
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

  export default Country;