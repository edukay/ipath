import React, { Component } from 'react';
import Header from '../Main/Header/Header';
import Sidenav from '../Main/Sidenav/Sidenav';
import { Grid, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Postlist from './Postlist/Postlist';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render () {
        const { user } = this.props;
        return (
            <div className="PostsMain">
  				<Header user={user} title={"Posts"} />

  				<Grid fluid>
  					<Row>
						<Col md={10}>
                            <Route
                                exact
                                path="/posts/client"
                                render={() =>
                                    <Postlist />
                                }
                            />
                            {/* <Route
                                exact
                                path="/agency/create"
                                render={props => (
                                    <CreateAgency onUpdateTitle={this.handleUpdateTitle} />
                                )}
                            /> */}
                            {/* <Route
                                exact
                                path="/agency/:id/"
                                render={props => (
                                    <SingleAgency
                                        agencyId={props.match.params.id}
                                        updateTitle={this.handleUpdateTitle}
                                    />
                                )}
                            />   */}
						</Col>
						<Col md={2}>
							<Sidenav active={"posts"} />
						</Col>
  					</Row>
  				</Grid>
  			</div>
        );
    }
}

export default Posts;