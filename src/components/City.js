import React from "react";
import Perception from "./Perception";

const City = ({ city, perceptions, showFahrenheit, buttonOnClick, buttonText }) => {
  // If wanted perception is not found, show information to user
  let latestPerception = "No perceptions from this location yet";
  let highestPerception = "No perceptions in 24 hours";
  let lowestPerception = "No perceptions in 24 hours";

  if (perceptions[0]) {
    // Find latest perception. You can assume that first perception is newest one because backend has already sorted data by created_at timestamp.
    latestPerception = perceptions[0];

    // Find highest and lowest perceptions in last 24 hours
    const TWENTYFOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in ms
    perceptions.forEach((perception, i) => {
      if (
        new Date() - new Date(perception["created_at"].replace(" ", "T")) <
        TWENTYFOUR_HOURS
      ) {
        // Set highest and lowest to null before comparing perceptions
        if (i === 0) {
          highestPerception = null;
          lowestPerception = null;
        }

        // If highestPerception is not set or perceptions temperature is higher than current highest temperature update the highestPerception

        if (
          !highestPerception ||
          highestPerception["temperature"] < perception["temperature"]
        ) {
          highestPerception = perception;
        }

        // If lowestPerception is not set or perceptions temperature is lower than current lowest temperature update lowestPerception
        if (
          !lowestPerception ||
          lowestPerception["temperature"] > perception["temperature"]
        ) {
          lowestPerception = perception;
        }
      }
    });
  }



  return (
    <div className="City-block">
    <div className="City-block-top">
    <h2>{city.name}</h2>
    </div>
     

      <Perception
        perceptionTitle={"Latest"}
        perception={latestPerception}
        showFahrenheit={showFahrenheit}
      />
      <Perception
        perceptionTitle={"Highest in last 24 hours"}
        perception={highestPerception}
        showFahrenheit={showFahrenheit}
      />
      <Perception
        perceptionTitle={"Lowest in last 24 hours"}
        perception={lowestPerception}
        showFahrenheit={showFahrenheit}
      />

      <button onClick={buttonOnClick}>{buttonText}</button>

    </div>
  );
};

export default City;
