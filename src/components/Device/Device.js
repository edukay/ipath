import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Devicelist from './Devicelist';

class Device extends Component {
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
                                path="/devices"
                                render={() =>
                                    <Devicelist />
                                }
                                />

                               
                            </Switch>
						</Col>
						<Col md={2}>
							<Sidenav active={"devices"} />
						</Col>
  					</Row>
  				</Grid>

            </div>
		);
	}
}

export default Device;