import React from "react";
import "./WeatherNow.css";

const WeatherNow = (props) => {
  const { main, weather, name, wind, sys, timezone } = props.data;

  // Function to format time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
 

  return (
    <div className="weather-now">
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
        <div className="details">
          <h2>{name}</h2> 
          <h3>🕒 {new Date(props.cityTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</h3>
 
          <h1>{main.temp}°C</h1>
          <p>Feels like: {main.feels_like}°C</p>
          <p>{weather[0].description}</p>
        </div>
      </div>
      <div className="more-details">
        <h2>More Details</h2>
        <p>🌅 Sunrise: {formatTime(sys.sunrise)}</p>
        <p>🌄 Sunset: {formatTime(sys.sunset)}</p>
        <p>💨 Wind Speed: {wind.speed} m/s</p>
        <p>💧 Humidity: {main.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherNow;
