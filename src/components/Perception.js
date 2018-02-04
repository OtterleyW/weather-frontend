import React from "react";

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

    // Format date to string
    let date = "";
    if (perception["created_at"]) {
      date = new Date(perception["created_at"].replace(" ", "T"));
      date = date.toString();
    }

    return (
      <p>
        {perceptionTitle}: {temperature}
        {unit}
        <br />
        <small>{date}</small>
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
