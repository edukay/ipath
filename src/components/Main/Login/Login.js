import React, { Component } from 'react';
import "./Login.css";
import { Panel, Grid, Row, Col, Alert } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import { isLoggedIn, LoginFunction } from '../../../utilities/Api';
import { Redirect } from "react-router-dom";

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleEmailChange = this._handleEmailChange.bind(this);
        this.handlePasswordChange = this._handlePasswordChange.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);

        const loggedIn = isLoggedIn();
        var email = loggedIn ? loggedIn.email : "";

        this.state = {
            email: email,
            password: '',
            errors: [],
            responseStatus: 200,
            loggedIn: loggedIn
        };
    }

    _handleEmailChange (e) {
        this.setState({ 
            email: e.target.value
        });
    }

    _handlePasswordChange (e) {
        this.setState({ password: e.target.value });
    }

    _handleSubmit(e) {
        e.preventDefault();

        this.setState({
            isLoading: true,
            errors: []
        });

        LoginFunction({
            email: this.state.email,
            password: this.state.password
        }).then(data => {
            this.setState({
                loggedIn: true,
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                errors: error,
                responseStatus: error.status,
                isLoading: false
            });
        });

        console.log('submitted');
    }

    hasErrorFor (field) {
      return this.state.responseStatus === 422 ? 
        !!this.state.errors.data.errors[field] :
        false
    }

    getErrorForField (field) {
        if (this.state.responseStatus === 422) {
            return this.state.errors.data.errors[field][0];
        }
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='help-block'>
            <strong>{ this.getErrorForField(field) }</strong>
          </span>
        )
      }
    }

    formHasError () {
        return this.state.responseStatus !== 200;
    }


    render() {
        if (this.state.loggedIn) {
            let { from } = this.props.location.state || {
                from: { pathname: "/" }
            };
            return <Redirect to={from} />;
        }


        if (this.state.isLoading) return <Loader />;

        return (
            <div className="LoginMain">
                
                <Grid>
                    <Row>
                        <Col sm={4} smOffset={4}>
                            <Alert bsStyle="warning" className={this.formHasError() ? 'visible' : 'hidden'}>
                                <strong>Error!</strong> There was an error logging you in.
                            </Alert>

                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title>
                                        Login
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <form onSubmit={this.handleSubmit}>
                                        <FormGroup validationState={this.hasErrorFor('email') ? 'error' : null}>
                                            <ControlLabel>Email</ControlLabel>
                                            <FormControl
                                                type="email"
                                                required
                                                value={this.state.email}
                                                placeholder="Enter valid email address"
                                                onChange={this.handleEmailChange}
                                             />
                                             <FormControl.Feedback />
                                             {this.renderErrorFor('email')}
                                        </FormGroup>
                                        <FormGroup validationState={this.hasErrorFor('password') ? 'error' : null}>
                                            <ControlLabel>Password</ControlLabel>
                                            <FormControl
                                                type="password"
                                                required
                                                value={this.state.password}
                                                placeholder="Enter Password"
                                                onChange={this.handlePasswordChange}
                                             />
                                             <FormControl.Feedback />
                                             {this.renderErrorFor('password')}
                                        </FormGroup>
                                        <FormGroup>
                                            <Checkbox onChange={this.handleRememberChange}>Remember me</Checkbox>    
                                        </FormGroup>

                                        <Button bsStyle="primary" type="submit">Login</Button>
                                    </form>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login
