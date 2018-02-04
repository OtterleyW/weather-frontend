import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import perceptionService from "./services/perceptions";
import PerceptionForm from "./components/PerceptionForm";
import Cities from "./components/Cities";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityId: 0,
      perceptions: [],
      newTemperature: "",
      newComment: "",
      newPerceptionCityId: 1
    };
  }

  componentWillMount() {
    axios.get("/api/cities").then(response => {
      this.setState({ cities: response.data.data });
    });

    perceptionService.getAllPerceptions().then(response => {
      this.setState({
        perceptions: response.data
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

  addPerception = event => {
    event.preventDefault();

    const perceptionObject = {
      city_id: this.state.newPerceptionCityId,
      temperature: this.state.newTemperature,
      comment: this.state.newComment
    };

    perceptionService
      .addPerceptionForCity(perceptionObject)
      .then(perceptionService.getAllPerceptions)
      .then(response => {
        this.setState({
          perceptions: response.data
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
          />
        </div>
        <div className="App-intro">
          <Cities
            cities={this.state.cities}
            perceptions={this.state.perceptions}
          />
        </div>
      </div>
    );
  }
}

export default App;
