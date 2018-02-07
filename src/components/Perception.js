import React from "react";
import "../styles/Perception.css";

var dateFormat = require("dateformat");

// Format date to from PostgreSQL timestamp to readable string
const formatDate = perception => {
  let date = "";
  if (perception["created_at"]) {
    date = new Date(perception["created_at"].replace(" ", "T"));
    date = dateFormat(date, "dd.mm.yyyy HH:MM:ss");
  }
  return date;
};

// Convert temperature to selected unit if needed and round it up to one decimal place
const formatTemperature = (showFahrenheit, perception) => {
  let temperature = perception["temperature"];
  if (showFahrenheit) {
    temperature = temperature * 9 / 5 + 32;
  }
  temperature = Math.round(temperature * 10) / 10;
  return temperature;
};

//Format unit symbol to selected unit
const formatUnit = showFahrenheit => {
  return showFahrenheit ? "°F" : "°C";
};

const Perception = ({ perceptionTitle, perception, showFahrenheit }) => {
  // Check if perception exists
  if (typeof perception === "object" && perception !== null) {
    // Format perception differently if it's not needed for highest/lowest/latest perception
    if (perceptionTitle === "basic") {
      const temperature = formatTemperature(showFahrenheit, perception);
      const unit = formatUnit(showFahrenheit);
      const date = formatDate(perception);
      return (
        <pre>
          <span className="Perception-temperature-basic">
            {temperature}
            {unit}
          </span>{" "}
          <span className="Perception-date">- {date}</span>
        </pre>
      );
    }

    // Format perception for latest/highest/lowest perception
    let temperature = formatTemperature(showFahrenheit, perception);
    let unit = formatUnit(showFahrenheit);
    let date = formatDate(perception);

    return (
      <p>
        <span className="Perception-title">{perceptionTitle}: </span>
        <span className="Perception-temperature">
          {temperature} {unit}
        </span>
        <br /> <span className="Perception-date">{date}</span>
      </p>
    );
  }

  // Return message as string if perception doesn't exist
  return (
    <p>
      {perception}
    </p>
  );
};
export default Perception;
