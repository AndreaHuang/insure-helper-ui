import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import IRRComponent from "./components/IRRComponent";
import {NavigationComponent} from ".//components/Navigation/NavigationComponent.js";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
        shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5
        }
    }
  }
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
class App extends Component {
  render() {
    return (
      <div className="App">
         <NavigationComponent/>
         <Particles className='particles'
          params={particlesOptions}
          style={{
                backgroundImage: `url("http://atgbcentral.com/data/out/23/4081251-cool-background-images.jpg")` 
              }}
        />
        <div id="particles"><IRRComponent/></div>
      </div>
    );
  }
}

export default App;
