import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import perceptionService from "./services/perceptions";

const Cities = props => {
  const rows = props.cities.map(city => (
    <button key={city.id} onClick={() => props.onClick(city.id)}>
      {city.name} ({city.location})<br />
    </button>
  ));

  return <p>{rows}</p>;
};

const Perceptions = ({ cityId, perceptions }) => {
  if (cityId === 0) {
    return <div>Valitse kaupunki, jonka havaintoja haluat tarkastella</div>;
  } else if (perceptions.length === 0) {
    return <div>Ei havaintoja</div>;
  } else {
    const rows = perceptions.map(perception => (
      <p key={perception.id}>
        Temperature {perception.temperature} ({perception.comment})
      </p>
    ));
    return <div>{rows}</div>;
  }
};

const Form = props => {
  const selectrows = props.cities.map(city => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ));
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <select name="city">{selectrows}</select>
        Temperature:{" "}
        <input
          value={props.nameValue}
          onChange={props.nameOnChange}
          type="number"
        />
        Comments:
        <input value={props.numberValue} onChange={props.numberOnChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityId: 0,
      perceptions: [],
      newTemperature: "",
      newComment: ""
    };
  }

  componentWillMount() {
    axios.get("http://localhost:3001/api/cities").then(response => {
      this.setState({ cities: response.data.data });
    });
  }

  selectCity = id => {
    perceptionService.getPerceptionsOfCity(id).then(response => {
      this.setState({
        cityId: id,
        perceptions: response.data
      });
    });
  };

  handleNewTemperature = event => {
    this.setState({ newTemperature: event.target.value });
  };

  handleNewComment = event => {
    this.setState({ newComment: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Eeppinen säähavainto app</h1>
        </header>
        <div className="App-form">
        <Form
          onSubmit={this.addPerception}
          valueTemperature={this.state.newTemperature}
          temperatureOnChange={this.handleNewTemperature}
          valueComment={this.state.newComment}
          commentOnChange={this.handleNewComment}
          cities={this.state.cities}
        />
        </div>
        <div className="App-intro">
          <Cities cities={this.state.cities} onClick={this.selectCity} />
          <Perceptions
            cityId={this.state.cityId}
            perceptions={this.state.perceptions}
          />
        </div>
      </div>
    );
  }
}

export default App;
