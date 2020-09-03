import React, { Component } from "react";
import './Login.css';

class Login extends Component {
	render() {
		return (
			<div className="Login">
                <form >
                    {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
                    
                    <label className="LogIn-Email"> 
                        Email:  
                        <input type="email" placeholder="email@domain.com" required/>
                    </label>

                    <label> 
                        Username:  
                        <input type="text" placeholder="Username" required/>
                    </label>

                    <label>
                        Password: 
                        <input type="password" placeholder="Password" required/>
                    </label>

                    <button className="Login-SubmitButton" type="submit"> LOG IN</button>


                    <label>
                        Rememeber Me
                        <input className= "Login-RememberMe" type="checkbox"/>
                    </label>


                    {/* if clicking forgot password brings us to a new page */}
                    <a href="#top" className="Login-ForgotPassword"> Forgot your password? </a>

                    {/* if clicking forgot password just brings a popup then the button itself wont be a link */}
                    <button className="Login-ForgotPassword" type="submit"> Forgot your password? </button>


                    
                    {/* if clicking forgot password button is a link */}
                    <a href="#top" className="Login-ForgotPassword"> <button className="Login-ForgotPassword" type="submit"> Forgot your password? </button></a>





                </form>
			</div>
		);
	}
}

export default Login;
