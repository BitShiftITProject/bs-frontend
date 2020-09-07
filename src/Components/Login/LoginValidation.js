import React, { Component } from "react";
//import './LoginValidation.css';

class LoginValidation extends Component {
    static defaultProps = {
        email: "x@gmail.com",
        username:"x",
        password: 0
    }
	render() {
        let correctInformation = false;
        let props = this.props;

			<div className="LoginValidation">
                {/* do some sort of check for email and password being in the database and correct and then return true or false  */}
      
			</div>
        return (
            {correctInformation}
        );
	}
}

export default LoginValidation;
