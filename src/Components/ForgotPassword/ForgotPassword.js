import React from "react";
import './ForgotPassword.css';
import { TextField , FormControl , Button} from '@material-ui/core';

const ForgotPassword = () => {
		return (
			<div className="ForgotPassword">
                <FormControl>
                    {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
                    
                    <p> Please enter the email you signed up with or your username, and we'll send you a link for a new password :) </p>
                    
                    <label className="ForgotPassword-Email"> 
                        Email:  
                        <TextField type="email" placeholder="email@domain.com" required/>
                    </label>

                    <p> or </p>

                    <label> 
                        Username:  
                        <TextField type="text" placeholder="Username" required/>
                    </label>

                    <Button className="ForgotPassword-Button" type="submit"> Send Password Reset Link  </Button>                   

                </FormControl>
            </div>
            )
    }

export default ForgotPassword;
