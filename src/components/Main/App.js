import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Posts from '../Posts/Posts';
import Dashboard from '../Dashboard/Dashboard';
import "./App.css";
import { Grid } from 'react-bootstrap';
import { isLoggedIn } from '../../utilities/Api';
import Surveyor from '../Surveyor/Surveyor';
import Client from '../Client/Client';
import Country from '../Country/Country';
import Device from '../Device/Device';

class App extends Component {
	render() {
		return (
			<div className="AppMain">
				<Grid fluid>
					<Router>
				        <Switch>
                    <PrivateRoute exact path="/" component={ Dashboard } />
                    <PrivateRoute path="/posts/client" component={ Posts } />
                    <PrivateRoute path="/surveyors" component={ Surveyor } />
                    <PrivateRoute path="/clients" component={ Client } />
                    <PrivateRoute path="/countries" component={ Country } />
                    <PrivateRoute path="/devices" component={ Device } />
			        	    <PrivateRoute path="/logout" component={ Logout } />
				          	<Route path="/login" component={ Login } />
				          	<Route component={NoMatch} />
				        </Switch>
			      </Router>
				</Grid>
			</div>
		);
	}
}

/**
 * Middleware for private routes.
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      let user = isLoggedIn();
      return user ? (
        <Component {...props} user={user} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

/**
 * 404: No match route
 */
const NoMatch = ({ location }) => (
  <div>
    <h3 className="text-center mt-xl mb-xl">
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default App;

