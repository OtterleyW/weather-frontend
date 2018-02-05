import React from "react";
import "../styles/Perception.css"

var dateFormat = require("dateformat");

const Perception = ({ perceptionTitle, perception, showFahrenheit }) => {
  // Check if perception exists
  if (typeof perception === "object" && perception !== null) {
    // check selected unit
    let unit = showFahrenheit ? "°F" : "°C";

    // convert temperature to selected unit if needed and round it up to one decimal place
    let temperature = perception["temperature"];
    if (showFahrenheit) {
      temperature = temperature * 9 / 5 + 32;
    }
    temperature = Math.round(temperature * 10) / 10;

    // Format date
    let date = "";
    if (perception["created_at"]) {
      date = new Date(perception["created_at"].replace(" ", "T"));
      date = dateFormat(date, "dd.mm.yyyy HH:MM:ss");
    }

    return (
      <p>
        <span className="Perception-title">{perceptionTitle}: </span>
        <span className="Perception-temperature">{temperature} {unit}</span>
        <br />        <span className="Perception-date">{date}</span>
      </p>
    );
  }
  // Return message as string if perception doesn't exist
  return (
    <p>
      {perceptionTitle}: {perception}
    </p>
  );
};
export default Perception;
