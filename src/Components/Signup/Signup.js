import React from "react";
import './Signup.css';
import { TextField , FormControl , Button} from '@material-ui/core';

const Signup = () => {
		return (
			<div className="Signup">
				<FormControl>

					{/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
					<label className = "Signup-Email"> 
						Email:  
						<TextField  type = "email" placeholder = "email@domain.com" required/>
					</label>

					<label> 
						Username:  
						<TextField  type = "text" placeholder = "Username" required/>
					</label>

					<label> 
						Firstname:  
						<TextField  type = "text" placeholder = "John" required/>
					</label>

					<label> 
						LastName:  
						<TextField  type = "text" placeholder = "Smith" required/>
					</label>

					{/* not 100% sure the password requirements are so for now this is just the default */}
					<label>
						Password: 
						<TextField  type = "password" placeholder = "**********" required pattern=".{8,12}" title="8 to 12 characters"/>
					</label>

					<label>
						Confirm Password: 
						<TextField  type = "password" placeholder = "**********" required pattern=".{8,12}" title="8 to 12 characters"/>
					</label>

                    <Button className= "Signup-SubmitButton" type="submit"> SIGN UP </Button>
				</FormControl>
			</div>)
}

export default Signup;
