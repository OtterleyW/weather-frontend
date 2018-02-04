import React from "react";

const Perception = ({ perception }) => {
  let unit = perception["unit"] === "Fahrenheit" ? "°F" : "°C";

  let date = ""

  if (perception["created_at"]) {
    date = new Date(perception["created_at"].replace(" ", "T"));

    date = date.toString()
  }


  return (
    <p>
      {perception["temperature"]}
      {unit}<br />
      <small>
        {date}
        </small>
    </p>
  );
};

export default Perception;
