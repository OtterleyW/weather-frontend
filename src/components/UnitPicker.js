import React from "react";

const UnitPicker = ({ showFahrenheit, onChange }) => {
  return (
    <form>
      <label>
        <input
          type="radio"
          value={false}
          checked={!showFahrenheit}
          onChange={onChange}
        />
        Celcius
      </label>
      <label>
        <input
          type="radio"
          value={true}
          checked={showFahrenheit}
          onChange={onChange}
        />
        Fahrenheit
      </label>
    </form>
  );
};

export default UnitPicker;
