import React from "react";
import Country from './Country'
const ListCountry=(props)=>
{
    let selectedCountry=props.selectedCountry;
    let found=props.found;
    let displayCountry=props.displayCountry;
  return(
  <div>
    {
      found.map(d=>
      <li key={d.name}>{d.name} <button onClick={()=>props.showCountry(d)}>show</button> 
        { displayCountry&&selectedCountry===d ? <Country c={selectedCountry}/>: null }
      </li>)
    }
  </div>
  )
}

export default ListCountry;