import React, { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY

const Weather=({selectedCapital})=>
{
    const [weather, setWeather]=useState("")
    const [icon,setIcon]=useState("")
    useEffect(()=>
    {
        const params={
            access_key:api_key,
            query: {selectedCapital}
        }
      axios.get('HTTP://api.weatherstack.com/current',{params})
      .then(response=>
        {
          console.log(response.data.current);
          setWeather(response.data.current);
          setIcon(response.data.current.weather_icons[0]);
        })
  
    },[selectedCapital]);

    return(
        <div>
            <h2>Weather in {selectedCapital}</h2>
            <strong>Temperature: </strong> {weather.temperature} Celsius
            <br />
            <img  src={icon} alt="current weather" />
            <br />
            <strong>Wind: </strong>  {weather.wind_speed} kph {weather.wind_dir} direction 
        </div>
    )
}

export default Weather