import React, { Component } from "react";
import './ForgotPassword.css';

class ForgotPassword extends Component {
	render() {
		return (
			<div className="ForgotPassword">
                <form >
                    {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
                    
                    <p> Please enter the email you signed up with or your username, and we'll send you a link for a new password :) </p>
                    
                    <label className="ForgotPassword-Email"> 
                        Email:  
                        <input type="email" placeholder="email@domain.com" required/>
                    </label>

                    <p> or </p>

                    <label> 
                        Username:  
                        <input type="text" placeholder="Username" required/>
                    </label>

                    <button className="ForgotPassword-Button" type="submit"> Send Password Reset Link  </button>                   

                </form>
			</div>
		);
	}
}

export default ForgotPassword;
