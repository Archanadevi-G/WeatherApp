import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("metric");

  const handleSearch = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    setUnits(unit);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-3 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search by city..."
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize placeholder:lowercase focus:outline-none rounded"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>

      <div className="flex flex-row w-full md:w-1/4 items-center justify-center space-x-4">
        <button
          className={`text-2xl font-medium transition ease-out hover:scale-125 ${
            selectedUnit === "metric" ? "text-green-500" : ""
          }`}
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </button>
        <p className="text-2xl font-medium">|</p>
        <button
          className={`text-2xl font-medium transition ease-out hover:scale-125 ${
            selectedUnit === "imperial" ? "text-green-500" : ""
          }`}
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
