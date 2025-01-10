import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherNow from "./Components/WeatherNow";
import WeatherForecast from "./Components/WeatherForecast";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
 
  const fetchWeatherData = async (lat, lon) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
    
        setErrorMessage("Sorry, the city was not found.");
        return;  
      }
      else{ setCurrentWeather(weatherData);}

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Sorry, the city was not found.");
    }
  };
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error); 
        setErrorMessage("Sorry, location permission is denied.");
      }
    );
  }, []);
 
  const SearchByCity = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeather(data);
        const { lon, lat } = data.coord;
        fetchWeatherData(lat, lon);
        setErrorMessage("");
      })
      .catch((err) => {
        setCurrentWeather(null);
        setForecast(null);
        console.error(err);
        setErrorMessage("Sorry, the city was not found.");
      });
  };

  return (
    <div className="app">
      {errorMessage && <div className="error-message">{errorMessage}</div>} 
      <SearchBar SearchByCity={SearchByCity} />
      {currentWeather && <WeatherNow data={currentWeather} />}
      {forecast && <WeatherForecast data={forecast} />}
    </div>
  );
}

export default App;
