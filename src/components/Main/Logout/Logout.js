import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isLoggedIn, LogoutFunction } from '../../../utilities/Api';
import { Button } from 'react-bootstrap';

class Logout extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleLogout = this._handleLogout.bind(this);

		const loggedIn = isLoggedIn();
	    if ( loggedIn ) {
	      	var data = loggedIn;
	    }
	    this.state = {
	      	firstName: data.first_name,
	      	logOut: false,
	      	logoutError: ""
	    };
    	this.triggerLogout();
	}
	
	_handleLogout(event) {
	    this.triggerLogout();
	}

	triggerLogout(event) {
    	LogoutFunction()
      			.then(data => {
        			this.setState({
          				logOut: true
        			});
      			})
      			.catch(error => {
        			this.setState({
          				logoutError: error.status + ": " + error.statusText,
          				logOut: false
        			});
      			});
	}	

	render() {
    	if (this.state.logOut) return <Redirect to="/" />;
    		else return <Button onClick={this.handleLogout}>Logout</Button>;
  	}

}

export default Logout;