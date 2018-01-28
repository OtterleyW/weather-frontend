import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const Cities = ({cities}) => {
  const rows = cities.map(city => <span key={city.id}>{city.name} ({city.location})<br /></span>)
  
  return (
    <p>
      {rows}
    </p>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/api/cities')
      .then(
        response => {
        this.setState({ cities: response.data.data })
      })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Eeppinen säähavainto app</h1>
        </header>
        <div className="App-intro">
          <Cities cities={this.state.cities} />
        </div>
      </div>
    );
  }
}

export default App;
