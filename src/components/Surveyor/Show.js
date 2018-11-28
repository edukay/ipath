import React, { Component } from 'react';
import { Panel, Row, Col, Table, Image, Tabs, Tab } from 'react-bootstrap';
import { Get } from '../../utilities/Api';
import Loader from '../Main/Loader/Loader';
import './Surveyor.css';
import { toCalendarDate } from '../../utilities/helpers';
import SurveyorPosts from './SurveyorPosts';

class Show extends Component {
	constructor(props) {
		super(props);
		this.subscribedPromises = [];

		this.state = {
			surveyorId: this.props.surveyorId,
			surveyor: [],
			isLoading: true,
		}
	}

	componentDidMount() {
		this.fetchSurveyorData();
	}

	fetchSurveyorData () {
		let url = '/admin/surveyors/' + this.state.surveyorId;
		let SurveyorPromise = Get( url );

        SurveyorPromise.promise
			.then(response => {
				this.setState({
					surveyor: response.data,
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

		this.subscribedPromises.push(SurveyorPromise);
		return SurveyorPromise.promise;
	}

	render () {
		const { isLoading, surveyor } = this.state;

		if ( isLoading ) return <Loader />

		return (
			<div>
				<Row>
            		<Col md={8}>
            			<Panel>
		                	<Panel.Body>
		                		<div className="">
		                			<Table striped>
		                				<thead>
		                					<tr>
			                					<th>Property</th>
			                					<th>Value</th>
			                				</tr>
		                				</thead>
			                			<tbody>
				                			<tr>
				                				<th>Name:</th>
				                				<td>{surveyor.name}</td>
				                			</tr>
				                			<tr>
				                				<th>Phone Number:</th>
				                				<td>{surveyor.phone_number}</td>
				                			</tr>
				                			<tr>
				                				<th>National ID:</th>
				                				<td>
				                					<span className="badge">{surveyor.national_id}</span>
				                				</td>
				                			</tr>
				                			<tr>
				                				<th>Created At:</th>
				                				<td>{toCalendarDate(surveyor.created_at)}</td>
				                			</tr>
				                			<tr>
				                				<th>Updated At:</th>
				                				<td>{toCalendarDate(surveyor.updated_at)}</td>
				                			</tr>
				                			<tr>
				                				<th>Active Status:</th>
				                				<td>
				                					<span className="badge">{surveyor.active === 1 ? 'Active' : 'Inactive'}</span>
				                				</td>
				                			</tr>
				                			<tr>
				                				<th>Assigned Roads:</th>
				                				<td className="Value">
				                					{
				                						surveyor.roads.map((road) => {
				                							return ( <span key={road.id} className="label label-default mr-xs mb-xs">{road.name}</span> )
				                						})
				                					}
				                					
				                				</td>
				                			</tr>
			                			</tbody>	
			                		</Table>
		                		</div>
		         
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
                                            surveyor.picture
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
					        <Tab eventKey={1} title="Surveyor Posts">
		          				<SurveyorPosts id={this.state.surveyorId} />
					        </Tab>
					        <Tab eventKey={2} title="Tab 2">
				          		<Panel className="mt-sm">
				          			<Panel.Body>
				          				Tab 2
				          			</Panel.Body>
				          		</Panel>
					        </Tab>
					        <Tab eventKey={3} title="Tab 3">
					          	<Panel className="mt-sm">
				          			<Panel.Body>
				          				Tab 3
				          			</Panel.Body>
				          		</Panel>
					        </Tab>
				      	</Tabs>
            		</Panel.Body>
            	</Panel>
			</div>
			
		);
	}
}

export default Show;