import React from "react";

const PerceptionForm = props => {
  const selectrows = props.cities.map(city => (
    <option key={city.id} value={city.id}>
      {city.name}
    </option>
  ));
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        City:
        <select name="city" onChange={props.cityOnChange}>
          {selectrows}
        </select>
        Temperature:{" "}
        <input
          value={props.temperatureValue}
          onChange={props.temperatureOnChange}
          type="number"
          step="any"
        />
        {props.showFahrenheit ? "°F" : "°C"}
        Comment:
        <input value={props.commentValue} onChange={props.commentOnChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

export default PerceptionForm;
