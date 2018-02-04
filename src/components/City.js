import React from "react";
import Perception from "./Perception";

const City = ({ city, perceptions }) => {
  let latestPerception = "No perceptions from this location yet";

  let highestPerception = "No perceptions in 24 hours";

  let lowestPerception = "No perceptions in 24 hours";

  if (perceptions[0]) {
    // Find latest perception
    latestPerception = perceptions[0];

    // Find highest and lowest perceptions in last 24 hours
    const TWENTYFOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in ms
    perceptions.forEach((perception, i) => {
      if (
        new Date() - new Date(perception["created_at"].replace(" ", "T")) <
        TWENTYFOUR_HOURS
      ) {
        // Set first perception to be highest and lowest
        if (i === 0) {
          highestPerception = perception;
          lowestPerception = perception;
        }

        // If perceptions temperature is higher than current highest temperature update the highestPerception
        if (highestPerception["temperature"] < perception["temperature"]) {
          highestPerception = perception;
        }

        // If perceptions temperature is lower than current lowest temperature update lowestPerception
        if (lowestPerception["temperature"] > perception["temperature"]) {
          lowestPerception = perception;
        }
      }
    });
  }

  return (
    <div className="city-block">
      <h3>{city.name}</h3>
      <p>({city.location})</p>

      <Perception
        perceptionTitle={"Latest perception"}
        perception={latestPerception}
      />
      <Perception
        perceptionTitle={"Highest perception"}
        perception={highestPerception}
      />
      <Perception
        perceptionTitle={"Lowest perception"}
        perception={lowestPerception}
      />
    </div>
  );
};

export default City;
