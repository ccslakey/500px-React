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

	createLocaleString(user) {
		let locale;
		if (user.city) {
			locale = `${user.city},  ${user.state} - ${user.country}`
		} else if (user.state && user.country) {
			locale = `${user.state} - ${user.country}`
		} else {
			return undefined;
		}
		return <p>{locale}</p>;
	}

	render() {
		let user = this.state.user
		let location = this.createLocaleString(user);
		return (
			<div>
				{user.fullname}
				<br/>
				From {location}
				<br/>
				<Image src={user.userpic_url} thumbnail />
				<br/>
				Has {user.friends_count} friends
			</div>
		);
	}

}

export default UserDetails;
