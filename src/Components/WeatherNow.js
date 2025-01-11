import React from "react";
import "./WeatherNow.css";

const WeatherNow = ({ data }) => {
  const { main, weather, name, wind } = data;

  return (
    <div className="weather-now">
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <div className="details">
          <h2>{name}</h2>
          <h1>{main.temp}°C</h1>
          <p>Feels like: {main.feels_like}°C</p>
          <p>{weather[0].description}</p>
        </div>
      </div>
      <div className="more-details">
        <h2>More Details</h2>
        <p>🌅 Sunrise: 05:45</p>
        <p>🌄 Sunset: 18:30</p> 
        <p>💨 Wind Speed: {wind.speed} m/s</p>
        <p>💧 Humidity: {main.humidity}%</p>
        
      </div>
    </div>
  );
};

export default WeatherNow;
