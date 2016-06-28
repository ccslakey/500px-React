import React from 'react';
import request from 'superagent';
import { CONSUMER_KEY } from '../../secrets';
import { Row, Col, Image } from 'react-bootstrap';
import PhotosGrid from './PhotosGrid';

class UserDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			userPhotos: [],
		}
	}

	componentWillMount() {
		this.getUserDetails();
		this.getUserPhotos();
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

	getUserPhotos(page = 1) {
		const baseURL = `https://api.500px.com/v1/photos?feature=user&rpp=52&image_size=600,1080,1600,2048&`;
		request.get(`${baseURL}consumer_key=${CONSUMER_KEY}&page=${page}&user_id=${this.props.params.id}`)
			.end((error, response) => {
				if (!error && response) {
					console.log(`response from ${baseURL}consumer_key=${CONSUMER_KEY}&page=${page}`);
					console.dir(response);
					this.setState({userPhotos:response.body.photos})
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
				<h1>{user.fullname}</h1>
				<br/>
				From {location}
				<br/>
				<Image src={user.userpic_url} thumbnail />
				<br/>
				Has {user.friends_count} friends
				<h4>About</h4>
				{user.about}
				<h4>Photos</h4>

				<PhotosGrid photos={this.state.userPhotos} />

			</div>
		);
	}

}

export default UserDetails;
