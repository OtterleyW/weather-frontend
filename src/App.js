import React, { Component } from "react";
import "./styles/App.css";
import axios from "axios";
import perceptionService from "./services/perceptions";
import PerceptionForm from "./components/PerceptionForm";
import Cities from "./components/Cities";
import UnitPicker from "./components/UnitPicker";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      perceptions: [],
      newTemperature: "",
      newPerceptionCityId: 1,
      showFahrenheit: false,
      message: null
    };
  }

  componentDidMount() {
    axios.get("/api/cities").then(response => {
      this.setState({ cities: response.data.data });
    });
    perceptionService.getAllPerceptions().then(response => {
      this.setState({
        perceptions: response.data.map(data => {
          return {
            id: data.id,
            city_id: data.city_id,
            temperature: Number(data.temperature),
            created_at: data.created_at
          };
        })
      });
    });
  }

  handleNewTemperature = event => {
    this.setState({ newTemperature: event.target.value });
  };
  handleNewCityId = event => {
    this.setState({
      newPerceptionCityId: event.target.value
    });
  };

  handleUnitChange = event => {
    if (event.target.value === "true") {
      this.setState({
        showFahrenheit: true
      });
    } else {
      this.setState({
        showFahrenheit: false
      });
    }
  };

  addPerception = event => {
    event.preventDefault();
    let temp = Number(this.state.newTemperature);
    if (-89.2 < temp && temp < 56.7) {
      if (this.state.showFahrenheit) {
        temp = (temp - 32) * 5 / 9;
      }
      const perceptionObject = {
        city_id: this.state.newPerceptionCityId,
        temperature: temp
      };
      perceptionService
        .addPerceptionForCity(perceptionObject)
        .then(perceptionService.getAllPerceptions)
        .then(response => {
          this.setState({
            perceptions: response.data.map(data => {
              return {
                id: data.id,
                city_id: data.city_id,
                temperature: Number(data.temperature),
                created_at: data.created_at
              };
            })
          });
        });

      this.setState({
        newTemperature: "",
        message: { type: "ok", text: "New observation saved!" }
      });
    } else {
      if (temp < -89.2) {
        this.setState({
          message: {
            type: "error",
            text:
              "This is lower temperature than lowest ever recorded natural temperature on Earth. Maybe you should check your thermometer?"
          }
        });
      } else {
        this.setState({
          message: {
            type: "error",
            text:
              "This is higher temperature than highest ever recorded natural temperature on Earth. Maybe you should check your thermometer?"
          }
        });
      }
    }

    setTimeout(() => {
      this.setState({ message: null });
    }, 5000);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Temperature observations</h1>
          <PerceptionForm
            onSubmit={this.addPerception}
            cityValue={this.state.newPerceptionCityId}
            cityOnChange={this.handleNewCityId}
            temperatureValue={this.state.newTemperature}
            temperatureOnChange={this.handleNewTemperature}
            cities={this.state.cities}
            showFahrenheit={this.state.showFahrenheit}
            message={this.state.message}
          />
          <UnitPicker
            showFahrenheit={this.state.showFahrenheit}
            onChange={this.handleUnitChange}
          />
        </header>
        <div className="App-form" />
        <div className="App-content">
          <Cities
            cities={this.state.cities}
            perceptions={this.state.perceptions}
            showFahrenheit={this.state.showFahrenheit}
          />
        </div>
      </div>
    );
  }
}

export default App;
