import React from "react";
import "./WeatherForecast.css";

const WeatherForecast = ({ data }) => {
  const hourly = data.list.slice(0, 8); 
  const daily = data.list.filter((item, index) => index % 8 === 0);  

  return (
    <div className="weather-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-list">
        {hourly.map((hour, index) => (
          <div key={index} className="forecast-item">
            <p>
              {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
            />
            <p>{hour.main.temp}°C</p>
          </div>
        ))}
      </div>
      <hr />
      <h3>Daily Forecast</h3>
      <div className="forecast-list">
        {daily.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>{day.main.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;