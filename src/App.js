import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import IRRComponent from "./components/IRRComponent";
import Navigation from ".//components/Navigation/NavigationComponent.js";

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



class App extends Component {

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render() {
    return (
      <div className="App">
         <Navigation onRouteChange ={this.onRouteChange}/>
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
