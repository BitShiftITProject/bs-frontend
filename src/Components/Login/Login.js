import React from "react";
import './Login.css';
import { TextField, FormControl, Button, Checkbox } from '@material-ui/core';

const Login = () => {
    return (
        <div className="Login">
            <FormControl>
                {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
                <label htmlFor="login__email" className="login__email"> Email: </label>
                <TextField id="login__email" type="email" placeholder="email@domain.com" required ></TextField>


                <label htmlFor="login__username" className="login__username"> Username: </label>
                <TextField id="login__username" type="text" placeholder="Username" required ></TextField>

                <label>
                    Password:
            <TextField type="password" placeholder="Password" required />
                </label>

                <Button className="Login-SubmitButton" type="submit" variant="contained" color="primary"> LOG IN</Button>

                <label>
                    Rememeber Me
            <Checkbox className="Login-RememberMe"
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }} />

                </label>


                {/* if clicking forgot password brings us to a new page
        <a href="#top" className="Login-ForgotPassword"> Forgot your password? </a>*/}

                {/* if clicking forgot password just brings a popup then the button itself wont be a link */}
                {/* <Button variant="contained" color="primary" className="Login-ForgotPassword"> Forgot your password? </Button>  */}

                {/* if clicking forgot password button is a link */}
                <Button className="Login-ForgotPassword" variant="contained" color="default" href="#top"> Forgot your password? </Button>

            </FormControl>
        </div>)
}

export default Login;
