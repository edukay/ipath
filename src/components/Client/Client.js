import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Clientlist from './Clientlist/Clientlist';
import Show from './Show';

class Client extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        this.state = {}
    }


    render() {
        const { user } = this.props;

        return (
            <div className="ClientMain">
  				<Header user={user} title={"Clients"} />

                <Grid fluid>
  					<Row>
						<Col md={10}>
                            <Panel>
                                <Panel.Body>Basic panel example</Panel.Body>
                            </Panel>

                            <Switch>
                                <Route
                                exact
                                path="/clients"
                                render={() =>
                                    <Clientlist />
                                }
                                />
                                <Route
                                    exact
                                    path="/clients/:id/"
                                    render={props => (
                                        <Show
                                            clientId={props.match.params.id}
                                        />
                                    )}
                                />
                            </Switch>
						</Col>
						<Col md={2}>
							<Sidenav active={"clients"} />
						</Col>
  					</Row>
  				</Grid>

            </div>
        );
    }

}

export default Client