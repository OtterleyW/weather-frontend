import React from "react";
import Perception from "./Perception";

const City = ({ city, perceptions }) => {
  const cityPerceptions = perceptions.filter(
    perception => perception.city_id === city.id
  );

  let latestPerception = "Ei viimeisintä havaintoa";

  if (cityPerceptions[0]) {
    latestPerception = cityPerceptions[0];
  }

  return (
    <div className="city-block">
      <h3>{city.name}</h3>
      <p>({city.location})</p>

      <Perception perception={latestPerception} />
    </div>
  );
};

export default City;
