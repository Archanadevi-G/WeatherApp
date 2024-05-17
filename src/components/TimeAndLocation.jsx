const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-4 ">
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-light">
          {formattedLocalTime}
        </p>
      </div>

      <div className="flex items-center justify-center my-1">
        <p className="text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
