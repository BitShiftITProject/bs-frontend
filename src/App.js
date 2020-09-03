import React, { Component } from "react";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">

        <h1> SIGN UP STUFF</h1>
        <Signup />

        <h1> LOG IN STUFF</h1>
        {/* later on would have to split them into different html pages each */}
        <Login />

        <h1> FORGOT PASSWORD STUFF</h1>

        <ForgotPassword/>

      </div>
    );
  }
}

export default App;
