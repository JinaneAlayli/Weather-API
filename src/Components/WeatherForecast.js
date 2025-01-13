import React from "react";
import "./WeatherForecast.css";

const WeatherForecast = (props) => {
  const { data, cityTime } = props;
 
  const groupByDay = (list) => {
    const grouped = {};
    list.forEach((item) => {
      const date = new Date((item.dt + data.city.timezone) * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!grouped[date]) {
        grouped[date] = item;  
      }
    });
    return Object.values(grouped);
  };

  const hourly = data.list.slice(0, 7);  
  const daily = groupByDay(data.list);  

  return (
    <div className="weather-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-list">
        {hourly.map((hour, index) => (
          <div key={index} className="forecast-item">
            <p>
              {new Date(cityTime.getTime() + (hour.dt - data.list[0].dt) * 1000).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}
            </p>
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
              {new Date(cityTime.getTime() + (day.dt - data.list[0].dt) * 1000).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                }
              )}
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
