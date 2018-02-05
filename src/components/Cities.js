import React from "react";
import City from "./City";
import "../styles/City.css"

const Cities = ({ cities, perceptions, showFahrenheit }) => {

  // Because amount of data is rather small this is ok but this could be done more efficiently.
  const cityRows = cities.map(currentCity => {
    const cityPerceptions = perceptions.filter(
      perception => perception.city_id === currentCity.id
    );

    return (
      <City
        key={currentCity.id}
        city={currentCity}
        perceptions={cityPerceptions}
        showFahrenheit={showFahrenheit}
      />
    );
  });

  return (
    <div className="City-container">
      {cityRows}
    </div>
  );
};

export default Cities;
