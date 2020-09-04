import React from "react";
import './Signup.css';
import { TextField , FormControl , Button} from '@material-ui/core';

const Signup = () => {
		return (
			<div className="Signup">
				<FormControl>

					{/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
					<label htmlFor="signup__email"> Email: </label>
					<TextField id="signup__email" type="email" placeholder="email@domain.com" required ></TextField>

					<label htmlFor="signup__username"> Username: </label>
					<TextField id="signup__username" type="text" placeholder="Username" required ></TextField>

					<label htmlFor="signup__password">  Password: </label>
					<TextField id="signup__password" type="password" placeholder="**********" required pattern=".{8,12}" title="8 to 12 characters"></TextField>

					<label htmlFor="signup__confirm_password">  Confirm Password: </label>
					<TextField id="signup__confirm_password" type="password" placeholder="**********" required pattern=".{8,12}" title="8 to 12 characters"></TextField>

					<label htmlFor="signup__first_name"> First Name: </label>
					<TextField id="signup__first_name" type = "text" placeholder = "John" required/>

					<label htmlFor="signup__last_name"> Last Name: </label>
					<TextField id="signup__last_name" type = "text" placeholder = "Smith" required/>

                    <Button className= "signup_button" type="submit"> SIGN UP </Button>
				</FormControl>
			</div>)
}

export default Signup;
