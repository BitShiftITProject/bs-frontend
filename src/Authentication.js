import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Sidebar from "./Components/SideBar";
import ForgotPassword from "./Components/ForgotPassword";
import {BACKEND, LOGGEDIN} from './Endpoints'

async function loggedIn () {

    // Get access token from session storage
    const accessToken = window.sessionStorage.accessToken;

    // If there is no access token in session storage then we are not logged in
    if(accessToken == null){
        return false;
    }
    else{
        // There is an access token in session storage
        // POST access token to the backend to check if we are logged in
        return fetch(BACKEND + LOGGEDIN, 
            {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({access_token:accessToken})
            }
        )
        .then((response) => {
            // If we get back status 200 we are logged in
            if(response.ok){
                return true;
            }
            // Otherwise we are not logged in
            else {
                return false;
            }
        })
    }
    
}

class Authentication extends Component {
    constructor () {
        super();
        this.state = {loggedIn: null};
    }

    async componentDidMount() {
        let logincheck = await loggedIn();
        this.setState({loggedIn: logincheck});
    }
  
    render () {
        if(this.state.loggedIn == null){
            // Route for loading page while getting if the user is logged in
            return (
                <p>Loading</p>
            );
        }
        else if(this.state.loggedIn == true){
            // Route for pages accessible when logged in
            return (
                <BrowserRouter>
                    <Sidebar/>
                    <Switch>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            );
        }
        else if(this.state.loggedIn == false){
            // Route for pages accessible when not logged in
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/forgotpassword" component={ForgotPassword}/>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}

export default Authentication;
