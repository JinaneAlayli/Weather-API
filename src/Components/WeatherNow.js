import React from "react";
import "./WeatherNow.css";

const WeatherNow = ({ data }) => {
  const { main, weather, name } = data;

  return (
    <div className="weather-now">
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />
      </div>
      <div className="details">
        <h2>Weather in {name}</h2>
        <p>{weather[0].description}</p>
        <h1>{main.temp}°C</h1>
      </div>
    </div>
  );
};

export default WeatherNow;
