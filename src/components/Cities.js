import React from "react";
import City from "./City"

const Cities = ({cities, perceptions})  => {
  const cityRows = cities.map(currentCity => (
    <City key={currentCity.id} city={currentCity} perceptions = {perceptions} />
  ));

  return (
    <div>
      {cityRows}
      <div className="clear" />
    </div>
  );
};

export default Cities;
