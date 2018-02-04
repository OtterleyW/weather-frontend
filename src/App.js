import React, { Component } from "react";
import "./App.css";
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
      newComment: "",
      newPerceptionCityId: 1,
      showFahrenheit: false
    };
  }

  componentWillMount() {
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
            comment: data.comment,
            created_at: data.created_at
          };
        })
      });
    });
  }

  handleNewTemperature = event => {
    this.setState({ newTemperature: event.target.value });
  };

  handleNewComment = event => {
    this.setState({ newComment: event.target.value });
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
    let temp = Number(this.state.newTemperature)

    if(this.state.showFahrenheit){
      temp = (temp-32) *5/9
    }
    const perceptionObject = {
      city_id: this.state.newPerceptionCityId,
      temperature: temp,
      comment: this.state.newComment
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
              comment: data.comment,
              created_at: data.created_at
            };
          })
        });
      });

    this.setState({
      newComment: "",
      newTemperature: ""
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Eeppinen säähavainto app</h1>
        </header>
        <div className="App-form">
          <PerceptionForm
            onSubmit={this.addPerception}
            cityValue={this.state.newPerceptionCityId}
            cityOnChange={this.handleNewCityId}
            temperatureValue={this.state.newTemperature}
            temperatureOnChange={this.handleNewTemperature}
            commentValue={this.state.newComment}
            commentOnChange={this.handleNewComment}
            cities={this.state.cities}
            showFahrenheit={this.state.showFahrenheit}
          />
        </div>
        <div className="App-intro">
          <UnitPicker
            showFahrenheit={this.state.showFahrenheit}
            onChange={this.handleUnitChange}
          />
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
