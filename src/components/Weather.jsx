import "./Weather.css"
import React, { useState } from "react";
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"
import Clear from "../assets/clear.png"
import Clouds from "../assets/cloud.png";
import Drizzle from "../assets/drizzle.png"
import Rain from "../assets/rain.png"
import Snow from "../assets/snow.png"

function Weather() {
  // console.log(import.meta.env.VITE_APP_ID);
  
  let[tempData, setTempData] = useState('');

  let icons = {
    "01d" : Clear,
    "04d" : Clouds,
    "10d" : Rain,
    "13d" : Snow,
    "09d" : Drizzle
  }

  let handleInput = (e) => {
    const city = e.target.previousSibling.value;
    console.log(city);
    apiRequest(city)
  }
  
  let apiRequest =  async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);        
      }
      const data = await response.json();
      console.log(data);
      let icon = icons[data.weather[0].icon]||Clear;
      setTempData({
        icon : icon,
        temp: data.main.temp.toPrecision(2),
        city: data.name,
        humidity: data.main.humidity,
        windSpeed : data.wind.speed,
      });
      
    } catch (err) {
      console.log(err);
    }
  }

 

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src="src/assets/search.png" alt="img" onClick={handleInput}/>
      </div>
      <div className="weather-details">
        <div className="icon">
          <img src={tempData.icon} alt="" />
          </div>
        <div className="temp-city">
          <p className="temp">{tempData.temp}°c</p>
          <p className="city">{tempData.city}</p>
        </div>
        <div className="humid-wind">
          <div className="humidity">
            <img src={humidity} alt="" />
            <p className="detail">{tempData.humidity}% <br /><span className="detail-text"> Humidity</span></p>
          </div>
          <div className="wind">
            <img src={wind} alt="" />
            <p className="detail">{tempData.windSpeed} Km/h <br /><span className="detail-text"> wind speed</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;