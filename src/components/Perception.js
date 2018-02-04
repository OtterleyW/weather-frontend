import React from "react";

const Perception = ({ perceptionTitle, perception }) => {
  if (typeof perception === "object" && perception !== null) {
    let unit = perception["unit"] === "Fahrenheit" ? "°F" : "°C";

    let date = "";

    if (perception["created_at"]) {
      date = new Date(perception["created_at"].replace(" ", "T"));

      date = date.toString();
    }

    return (
      <p>
        {perceptionTitle}: {perception["temperature"]}
        {unit}
        <br />
        <small>{date}</small>
      </p>
    );
  }

  return <p>{perceptionTitle}:{" "}{perception}</p>;
};
export default Perception;
