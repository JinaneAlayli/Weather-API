import React from "react";
import "./WeatherForecast.css";

const WeatherForecast = ({ data }) => {
  // Helper function to format city time
  const formatCityTime = (timestamp, timezoneOffset) => {
    const localTime = new Date((timestamp + timezoneOffset) * 1000);
    return localTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // Group forecast data by day
  const groupByDay = (list) => {
    const grouped = {};
    list.forEach((item) => {
      const date = new Date((item.dt + data.city.timezone) * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!grouped[date]) {
        grouped[date] = item; // First forecast for the day
      }
    });
    return Object.values(grouped);
  };

  const hourly = data.list.slice(0, 7); // Display next 7 hours
  const daily = groupByDay(data.list); // Group by day dynamically

  return (
    <div className="weather-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-list">
        {hourly.map((hour, index) => (
          <div key={index} className="forecast-item">
            <p>{formatCityTime(hour.dt, data.city.timezone)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
            />
            <p>{Math.round(hour.main.temp)}°C</p>
          </div>
        ))}
      </div>
      <hr />
      <h3>Daily Forecast</h3>
      <div className="forecast-list">
        {daily.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>
              {new Date((day.dt + data.city.timezone) * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
