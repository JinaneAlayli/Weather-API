import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherNow from "./Components/WeatherNow";
import WeatherForecast from "./Components/WeatherForecast";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Function to fetch weather data based on coordinates
  const fetchWeatherData = async (lat, lon) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      setCurrentWeather(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Geolocation API to get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        // Default to London if location permission is denied
        fetchWeatherData(51.5074, -0.1278);
      }
    );
  }, []);

  // Handle manual search
  const handleSearch = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeather(data);
        const { lon, lat } = data.coord;
        fetchWeatherData(lat, lon);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="app">
      <SearchBar handleSearch={handleSearch} />
      {currentWeather && <WeatherNow data={currentWeather} />}
      {forecast && <WeatherForecast data={forecast} />}
    </div>
  );
}

export default App;
