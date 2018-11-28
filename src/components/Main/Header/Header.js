import React, { Component } from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

class Header extends Component {
	render () {
		let user = this.props.user || "";
    	let title = this.props.title || "";
		return (
			<div className="Main">
				<Helmet>
		          	<meta charSet="utf-8" />
          			<title>{"Ipath :: " + title}</title>
		        </Helmet>
		        <Navbar default fluid fixedTop className="Header">
			        <Navbar.Header>
					    <Navbar.Brand>
						    <Link to="/">Ipath</Link>
					    </Navbar.Brand>
				  	</Navbar.Header>
				  	<Nav>
					    <NavItem eventKey={1} href="#">
					      Link
					    </NavItem>
					    <NavItem eventKey={2} href="#">
					      Link
					    </NavItem>
					    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
					      	<MenuItem eventKey={3.1}>Action</MenuItem>
					      	<MenuItem eventKey={3.2}>Another action</MenuItem>
					      	<MenuItem eventKey={3.3}>Something else here</MenuItem>
					      	<MenuItem divider />
					      	<MenuItem eventKey={3.4}>Separated link</MenuItem>
					    </NavDropdown>
				  	</Nav>
				  	<Nav pullRight>
				  		<NavDropdown eventKey={1} title={user.first_name + ' ' + user.last_name} id="basic-nav-dropdown">
					        <MenuItem eventKey={1.1}>Profile</MenuItem>
					        <MenuItem eventKey={1.2}>Change Password</MenuItem>
					        <MenuItem eventKey={1.3}>Settings</MenuItem>
					        <MenuItem divider />
					        <MenuItem eventKey={1.3} href="/logout" to="/logout">Logout</MenuItem>
				      	</NavDropdown>
				  	</Nav>
			  	</Navbar>
			</div>
		);
	}
}

export default Header;