import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from "./Components/login.js";
import Register from "./Components/register.js";
import Jokes from "./Components/jokes.js";
import Home from "./Components/home.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">

        <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/register">Register</Link>
        <Link to="/jokes">Users</Link> 
        </nav>


        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/jokes" component={Jokes}/> 
      </div>
    );
  }
}


export default App;
