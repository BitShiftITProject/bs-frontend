import React from "react";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ContactInfo from "./Components/ContactInfo/ContactInfo";

import "./App.css";

const App = () =>{
    return (
      <div className="App">        
        {/* later on would have to split them into different html pages each */}
        <h1> LOG IN STUFF</h1>
        <Login />

        <h1> SIGN UP STUFF</h1>
        <Signup />

        <h1> FORGOT PASSWORD STUFF</h1>
        <ForgotPassword/>

        <h1> CONTACT INFORMATION</h1>
        <ContactInfo/>

      </div>
    );
}

export default App;
