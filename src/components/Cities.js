import React from "react";
import City from "./City"

const Cities = ({cities, perceptions})  => {

  // Because amount of data is rather small this is ok but this could be done more efficiently
  
  const cityRows = cities.map(currentCity => {
    const cityPerceptions = perceptions.filter(
      perception => perception.city_id === currentCity.id
    );
    
    return <City key={currentCity.id} city={currentCity} perceptions={cityPerceptions} />
  });

  return (
    <div>
      {cityRows}
      <div className="clear" />
    </div>
  );
};

export default Cities;
