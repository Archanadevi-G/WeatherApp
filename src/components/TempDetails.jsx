import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalweatherdetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind Speed",
      value: `${speed.toFixed()} ${units === "metric" ? "km/hr" : "m/s"}`,
    },
  ];

  const horizontalweatherdetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center py-4 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between py-2 space-y-4 md:space-y-0 md:space-x-4">
        <img src={icon} alt="weather icon" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-1 items-start">
          {verticalweatherdetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex font-light text-sm items-center">
              <Icon size={18} className="me-1" />
              {` ${title}:`} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-2 py-3 justify-items-center">
        {horizontalweatherdetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center space-x-1">
            <Icon size={30} />
            <p className="font-light ml-1">
              {` ${title}:`} <span className="font-medium ml-1 ">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempDetails;
