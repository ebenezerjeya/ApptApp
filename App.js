import React, { Component } from 'react';
import './App.css';
import Routing from './component/Routing';

class App extends Component {
  render() {
    return (
        <div className="Container">
          <Routing />
        </div>

    )
  }
}

export default App;
