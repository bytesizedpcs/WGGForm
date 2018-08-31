import React, { Component } from 'react';
import Form from './components/form';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './media/WrightTailored_Logo.png';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar 
          position="static" 
          style={{marginBottom: '2%',}}
        >
          <Toolbar style={{ backgroundColor: '#1c1c1c', }}>
            Wright Tailored Form
          </Toolbar>
        </AppBar>
        <img id="logo" src={logo} width="300" alt="Wright Tailored" />
        <div id="instruction-div">
          Click on the type below to enter your selections.
        </div>
        <Form></Form>
      </div>
    );
  }
}

export default App;
