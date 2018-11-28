import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Countrylist from './Countrylist';

class Country extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	render () {
		const { user } = this.props;

		return (
			<div className="CountryMain">
  				<Header user={user} title={"Countries"} />

                <Grid fluid>
  					<Row>
						<Col md={10}>
                            <Panel>
                                <Panel.Body>Basic panel example</Panel.Body>
                            </Panel>

                            <Switch>
                                <Route
                                exact
                                path="/countries"
                                render={() =>
                                    <Countrylist />
                                }
                                />

                               
                            </Switch>
						</Col>
						<Col md={2}>
							<Sidenav active={"countries"} />
						</Col>
  					</Row>
  				</Grid>

            </div>
		);
	}
}

export default Country;