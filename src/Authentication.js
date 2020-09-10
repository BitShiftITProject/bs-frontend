import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

async function loggedIn () {
    // TODO: Fetch loggedIn Endpoint
    return fetch("LOGGED IN ENDPOINT", {credentials: "include"})
        .then(res => {return res.json();})
        .then(json => {
            return json.loggedIn;
    });
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
                <p>Logged In</p>
            );
        }
        else if(this.state.loggedIn == false){
            // Route for pages accessible when not logged in
            return (
                <p>Not Logged In</p>
            );
        }
    }
}

export default Authentication;
