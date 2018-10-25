import React, { Component } from 'react';
import Form from './components/form';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './media/WrightTailored_Logo.png';
import './App.css';

class App extends Component {

  componentDidMount() {
    var isFirefox = navigator.userAgent.toLocaleLowerCase().indexOf('firefox') > -1;

    if (isFirefox) {
      alert('Using Mozilla Firefox may lead to unexpected errors when using the form. Please use either Google Chrome or Microsoft Edge for the best results.');
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar 
          position="static" 
          className="AppBar"
          style={{marginBottom: '2%',}}
        >
          <Toolbar style={{ backgroundColor: '#1c1c1c', }}>
            Wright Tailored Form
          </Toolbar>
        </AppBar>
        <img id="logo" src={logo} width="300" alt="Wright Tailored" />
        <div id="instruction-div">
          Click on the type below to enter your selections.
          <br />
          All fields with (*) must be completed
          <br />
          Email completed form and any additional files 
          to: wrighttailored@wrightglobalgraphics.com
        </div>
        <Form></Form>
      </div>
    );
  }
}

export default App;
