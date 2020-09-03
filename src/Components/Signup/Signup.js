import React, { Component } from "react";
import './Signup.css';

class Signup extends Component {
	render() {
		return (
			<div className="Signup">
				<form>

					{/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
					<label className = "Signup-Email"> 
						Email:  
						<input type = "email" placeholder = "email@domain.com" required/>
					</label>

					<label> 
						Username:  
						<input type = "text" placeholder = "Username" required/>
					</label>

					<label> 
						Firstname:  
						<input type = "text" placeholder = "John" required/>
					</label>

					<label> 
						LastName:  
						<input type = "text" placeholder = "Smith" required/>
					</label>

					{/* not 100% sure the password requirements are so for now this is just the default */}
					<label>
						Password: 
						<input type = "password" placeholder = "Password" required pattern=".{8,12}" title="8 to 12 characters"/>
					</label>

					<label>
						Confirm Password: 
						<input type = "password" placeholder = "Password" required pattern=".{8,12}" title="8 to 12 characters"/>
					</label>

                    <button className= "Signup-SubmitButton" type="submit"> SIGN UP </button>
				</form>
			</div>
		);
	}
}

export default Signup;
