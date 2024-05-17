import React, { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempDetails from "./components/TempDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "Chennai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState();

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching Weather data for ${capitalizeFirstLetter(cityName)}`);

    try {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Fetched Weather data for ${data.name}, ${data.country}`);
        setWeather(data);
      });
    } catch (error) {
      if (error.message === "city not found") {
        toast.error(`City not found : ${capitalizeFirstLetter(cityName)}`);
      } else {
        toast.error(`Failed to fetch weather data : ${error.message}`);
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units == "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-400 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} lg:my-2 `}
    >
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
