import React, { Component } from 'react';
import Form from './components/form';
import './App.css';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="header-text">WGG XML Form</span>
        </header>
        <Form></Form>
      </div>
    );
  }
}

export default App;
