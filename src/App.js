import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherNow from "./Components/WeatherNow";
import WeatherForecast from "./Components/WeatherForecast";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cityTime, setCityTime] = useState("");

  const [background, setBackground] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const updateBackgroundAndTime = () => {
    if (!currentWeather) return;

    const weatherCondition = currentWeather.weather[0].main.toLowerCase();
    if (weatherCondition === "clear") {
      setBackground("sunny");
    } else if (weatherCondition === "clouds") {
      setBackground("cloudy");
    } else if (weatherCondition === "rain") {
      setBackground("rainy");
    } else {
      setBackground("sunny");
    }

    const localTime = new Date();
    const utcTime = localTime.getTime() + localTime.getTimezoneOffset() * 60000;
    const cityDate = new Date(utcTime + currentWeather.timezone * 1000);

    setCityTime(cityDate);
  };

  useEffect(() => {
    updateBackgroundAndTime();
  }, [currentWeather]); 

  const fetchWeatherNow = async (lat, lon) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        setErrorMessage("Sorry, the city was not found.");
        return;
      }

      setCurrentWeather(weatherData);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Sorry, the city was not found.");
    }
  };

  const fetchWeatherForecast = async (lat, lon) => {
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setErrorMessage(
        "Sorry, an error occurred while fetching the forecast data."
      );
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherNow(latitude, longitude);
        fetchWeatherForecast(latitude, longitude);
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
        if (data.cod !== 200) {
          throw new Error("City not found");
        }
        setCurrentWeather(data);

        const { lon, lat } = data.coord;
        fetchWeatherForecast(lat, lon);
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
    <div className={`app ${background}`}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <SearchBar SearchByCity={SearchByCity} />
      {currentWeather && <WeatherNow data={currentWeather} cityTime={cityTime} />}
      {forecast && <WeatherForecast data={forecast} cityTime={cityTime} />}
    </div>
  );
}

export default App;
  