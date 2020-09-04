import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ContactInfo from "./Components/ContactInfo";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* later on would have to split them into different html pages each */}
      <h1> LOG IN STUFF</h1>
      <Login />

      <h1> SIGN UP STUFF</h1>
      <Signup />

      <h1> FORGOT PASSWORD STUFF</h1>
      <ForgotPassword />

      <h1> CONTACT INFO STUFF</h1>
      <ContactInfo />

    </div>
  );
}

export default App;
