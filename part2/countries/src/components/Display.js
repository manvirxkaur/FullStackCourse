import React from "react";
import ListCountry from './ListCountry'
import Country from './Country'
const Display=(props)=>
{
  let found=props.found;
  let selectedCountry=props.selectedCountry;
  let displayCountry=props.selectedCountry;

  const len=found.length;
  if(len>10)
  {
    return <div>Too many matches, specify another filter</div>
  }
  if(len>1 && len<=10)
  {
    return  <ListCountry found={found} selectedCountry={selectedCountry} displayCountry={displayCountry} showCountry={props.showCountry}/>
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

export default Display