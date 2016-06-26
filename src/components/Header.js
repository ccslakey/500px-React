import React from 'react';
import { PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem, Button  } from 'react-bootstrap';
import { Link } from 'react-router';

class Header extends React.Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
			<Navbar inverse>
		      <Navbar.Header>
		        <Navbar.Brand>
		          <a href="#">React & 500px</a>
		        </Navbar.Brand>
		        <Navbar.Toggle />
		      </Navbar.Header>
		      <Navbar.Collapse>
		        <Nav className="pullDown" pullRight>
		          <Link className="my-nav-link" to={`/photos`}><Button>Photos</Button></Link> |
				  <Link className="my-nav-link" to={`/galleries`}><Button>Galleries</Button></Link> |
				  <Link className="my-nav-link" to={`/people`}><Button>People</Button></Link>
		        </Nav>
		      </Navbar.Collapse>
		    </Navbar>
				<PageHeader>500px</PageHeader>
			</div>
		);
	}

}

export default Header;
