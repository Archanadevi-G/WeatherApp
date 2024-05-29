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
    if (!weather || !weather.icon) return "from-cyan-600 to-blue-700";

    const icon = weather.icon.toLowerCase();

    //background colors based on icon for both day and night time(d-daytime, n-nighttime)
    if (icon.includes("01")) {
      if (icon.includes("d")) return "from-yellow-400 to-orange-600";
      if (icon.includes("n")) return "from-gray-900 to-gray-800";
    }
    if (icon.includes("02")) {
      if (icon.includes("d")) return "from-blue-400 to-slate-500";
      if (icon.includes("n")) return "from-gray-600 to-gray-500";
    }
    if (icon.includes("03") || icon.includes("04")) {
      if (icon.includes("d")) return "from-sky-300 to-blue-200";
      if (icon.includes("n")) return "from-gray-600 to-gray-500";
    }
    if (icon.includes("09") || icon.includes("10")) {
      if (icon.includes("d")) return "from-sky-200 to-slate-500";
      if (icon.includes("n")) return "from-gray-700 to-gray-600";
    }
    if (icon.includes("11")) {
      if (icon.includes("d")) return "from-blue-300 to-pink-500";
      if (icon.includes("n")) return "from-gray-600 to-slate-900";
    }
    if (icon.includes("13")) {
      if (icon.includes("d")) return "from-blue-200 to-slate-500";
      if (icon.includes("n")) return "from-gray-700 to-gray-600";
    }
    if (icon.includes("50")) {
      if (icon.includes("d")) return "from-sky-300 to-blue-200";
      if (icon.includes("n")) return "from-gray-700 to-gray-600";
    }
  };

  return (
    <div
      className={` overflow-hidden mx-auto max-w-screen-lg px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} lg:my-2 `}
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
