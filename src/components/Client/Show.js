import React, { Component } from 'react';
import { Panel, Row, Col, Table, Image, Tabs, Tab } from 'react-bootstrap';
import { Get } from '../../utilities/Api';
import Loader from '../Main/Loader/Loader';
import './Client.css';
import { toCalendarDate } from '../../utilities/helpers';
import Clientposts from './Clientposts';

class Show extends Component {
	constructor(props) {
		super(props);
		this.subscribedPromises = [];

		this.state = {
			clientId: this.props.clientId,
			client: [],
			isLoading: true,
			activeTab: 1,
			fetchingPosts: false
		}

		this.handleTabSelect = this._handleTabSelect.bind(this);
		this.fetchClientPosts = this._fetchClientPosts.bind(this);
	}

	_handleTabSelect(key) {
		this.setState({ "activeTab": key });
	}

	componentDidMount() {
		this.fetchClientData();
	}

	fetchClientData () {
		let url = '/admin/clients/' + this.state.clientId;
		let ClientPromise = Get( url );

        ClientPromise.promise
			.then(response => {
				this.setState({
					client: response.data,
					isLoading: false,
					error: null
				});
				console.log('data fetched');
			})
			.catch(error => {
				this.setState({
		            error: error,
                    isLoading: false,
	          	});
			});

		this.subscribedPromises.push(ClientPromise);
		return ClientPromise.promise;
	}

	_fetchClientPosts() {
		this.setState({ fetchingPosts: true })
		var self = this;
		setTimeout( function () {
			self.setState({ fetchingPosts: false })
		}, 10000);
	}

	render () {
		const { isLoading, client } = this.state;

		if ( isLoading ) return <Loader />

		return (
			<div>
				<Row>
            		<Col md={8}>
            			<Panel>
		                	<Panel.Body>
		                		<Table striped>
		                			<tbody>
			                			<tr>
			                				<th>Name:</th>
			                				<td>{client.name}</td>
			                			</tr>
			                			<tr>
			                				<th>Email:</th>
			                				<td>{client.email}</td>
			                			</tr>
			                			<tr>
			                				<th>Category:</th>
			                				<td>
			                					<span className="badge">{client.category ? client.category.name || '' : ''}</span>
			                				</td>
			                			</tr>
			                			<tr>
			                				<th>Country:</th>
			                				<td>
			                					<span className="badge">{client.country ? client.country.name || '' : ''}</span>
			                				</td>
			                			</tr>
			                			<tr>
			                				<th>Created At:</th>
			                				<td>{toCalendarDate(client.created_at)}</td>
			                			</tr>
			                			<tr>
			                				<th>Updated At:</th>
			                				<td>{toCalendarDate(client.updated_at)}</td>
			                			</tr>
			                			<tr>
			                				<th>Active Status:</th>
			                				<td>
			                					<span className="badge">{client.active === 1 ? 'Active' : 'Inactive'}</span>
			                				</td>
			                			</tr>
		                			</tbody>	
		                		</Table>
		         
		                	</Panel.Body>
		            	</Panel>
            		</Col>
            		<Col md={4}>
            			<Panel>
		                	<Panel.Body>
		                		<div className="pt-sm pb-sm ProfilePicture">
                                	<Image
                                        thumbnail
                                        responsive
                                        src={
                                            client.logo
                                        }
                                    />	
                                </div>
		         
		                	</Panel.Body>
		            	</Panel>
            		</Col>
            	</Row>
            	<hr />
            	<Panel>
            		<Panel.Body>
            			<Tabs
					        activeKey={this.state.activeTab}
					        onSelect={this.handleTabSelect}
					        id="controlled-tab-example"
				      	>
					        <Tab eventKey={1} title="Posts">
				          		<Clientposts clientId={this.state.clientId} />
					        </Tab>
					        <Tab eventKey={2} title="Reports">
				          		<Panel className="mt-sm">
				          			<Panel.Body>
				          				Will have details of client reports. Samples
				          			</Panel.Body>
				          		</Panel>
					        </Tab>
					        <Tab eventKey={3} title="Tab 3" disabled>
					          	Tab 3 content
					        </Tab>
				      	</Tabs>
            		</Panel.Body>
            	</Panel>
			</div>
			
		);
	}
}

export default Show;