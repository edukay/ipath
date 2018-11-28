import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Panel, Col } from 'react-bootstrap';

class Dashboard extends Component {
	constructor(props) {
	    super(props);
	    this.state = {};
  	}

  	render () {
  		const { user } = this.props;
  		return (  
  			<div className="DashboardMain">
  				<Header user={user} title={"Dashboard"} />

  				<Grid fluid>
  					<Row>
						<Col md={10}>
							<Panel>
								<Panel.Heading>
									<Panel.Title componentClass="h3">Dashboard</Panel.Title>
								</Panel.Heading>
								<Panel.Body>Dashboard</Panel.Body>
							</Panel>
						</Col>
						<Col md={2}>
							<Sidenav active={"dashboard"} />
						</Col>
  					</Row>
  				</Grid>
  			</div>
		  );
  	}
}

export default Dashboard;