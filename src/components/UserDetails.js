import React from 'react';
import request from 'superagent';
import { CONSUMER_KEY } from '../../secrets';
import { Row, Col, Image } from 'react-bootstrap';

class UserDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {}
		}
	}

	componentWillMount() {
		this.getUserDetails();
	}

	getUserDetails() {
		const baseURL = `https://api.500px.com/v1/users/show/?`;
		request.get(`${baseURL}consumer_key=${CONSUMER_KEY}&id=${this.props.params.id}`)
			.end((error, response) => {
				if (!error && response) {
					console.log('response from 500px, setting state to res.body.user');
					console.dir(response.body);
					this.setState({user:response.body.user})
				} else {
					console.log(`Error fetching 500px`, error);
				}
			}
		);
	}

	render() {
		return (
			<div>
				<p>there will be user details</p>
			</div>
		);
	}

}

export default UserDetails;
