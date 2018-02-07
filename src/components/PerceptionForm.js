import React from "react";
import "../styles/PerceptionForm.css";
import Message from "../components/Message";
const PerceptionForm = props => {
  // Get cities for city select
  const selectrows = props.cities.map(city => (
    <option key={city.id} value={city.id}>
      {city.name} ({city.location})
    </option>
  ));

  return (
    <div className="Perception-form">
      <Message message={props.message} />
      <h2>Add new observation</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          <label htmlFor="city">Location: </label>
          <select name="city" id="city" onChange={props.cityOnChange}>
            {selectrows}
          </select>
          <br />
          <label htmlFor="temperature">Temperature: </label>
          <input
            value={props.temperatureValue}
            onChange={props.temperatureOnChange}
            type="tel"
            step="any"
            name="temperature"
            id="temperature"
          />
          {props.showFahrenheit ? " °F " : " °C "}
        </div>
        <div>
          <button type="submit">Save observation</button>
        </div>
      </form>
    </div>
  );
};

export default PerceptionForm;
