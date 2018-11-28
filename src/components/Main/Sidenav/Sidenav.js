import React, { Component } from 'react';
import './Sidenav.css';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Sidenav extends Component {
	constructor(props) {
		super(props);

		this.isActive = this._isActive.bind(this);

		this.state = {
			from: this.props.from
		}
	}

	_isActive (path, link) {
		return path === link;
	}

	render () {
		return (
			<ListGroup>
                <ListGroupItem href="/" active={this.isActive(this.props.active, 'dashboard')}>Dashboard</ListGroupItem>
                <ListGroupItem href="/posts/client" active={this.isActive(this.props.active, 'posts')}>Posts</ListGroupItem>
                <ListGroupItem href="/surveyors" active={this.isActive(this.props.active, 'surveyors')}>Surveyors</ListGroupItem>
                <ListGroupItem href="/clients" active={this.isActive(this.props.active, 'clients')}>Clients</ListGroupItem>
                <ListGroupItem href="/countries" active={this.isActive(this.props.active, 'countries')}>Country</ListGroupItem>
                <ListGroupItem href="/devices" active={this.isActive(this.props.active, 'devices')}>Devices</ListGroupItem>
            </ListGroup>
		);
	}
}

export default Sidenav;