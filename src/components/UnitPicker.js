import React from "react";
import "../styles/UnitPicker.css";

const UnitPicker = ({ showFahrenheit, onChange }) => {
  return (
    <div className="UnitPicker">
      <form>
        <label>
          <input
            type="radio"
            value={false}
            checked={!showFahrenheit}
            onChange={onChange}
          />Celcius
        </label>
        <label>
          <input
            type="radio"
            value={true}
            checked={showFahrenheit}
            onChange={onChange}
          />Fahrenheit
        </label>
      </form>
    </div>
  );
};

export default UnitPicker;
