import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Surveyorlist from './Surveyorlist/Surveyorlist';
import Show from './Show';

class Surveyor extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render () {
        const { user } = this.props;

        return (
            <div className="PostsMain">
  				<Header user={user} title={"Surveyors"} />

                <Grid fluid>
  					<Row>
						<Col md={10}>
                            <Switch>
                                <Route
                                    exact
                                    path="/surveyors"
                                    render={() =>
                                        <Surveyorlist />
                                    }
                                />
                                <Route
                                    exact
                                    path="/surveyors/:id"
                                    render={props => (
                                        <Show
                                            surveyorId={props.match.params.id}
                                        />
                                    )}
                                />
                            </Switch>
						</Col>
						<Col md={2}>
							<Sidenav active={"surveyors"} />
						</Col>
  					</Row>
  				</Grid>

            </div>
        );
    }
}

export default Surveyor;
