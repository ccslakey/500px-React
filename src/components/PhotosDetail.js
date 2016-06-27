import React from 'react';
import request from 'superagent';
import { CONSUMER_KEY } from '../../secrets';
import { Grid, Row, Col, Image } from 'react-bootstrap';

class PhotosDetail extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			message: "hi there photo",
			photo: {}
		}
	}

	componentWillMount() {
		this.getPhotoInfo();
	}

	getPhotoInfo() {
		const baseURL = `https://api.500px.com/v1/photos/${this.props.params.id}/?`;
		request.get(`${baseURL}consumer_key=${CONSUMER_KEY}`)
			.end((error, response) => {
				if (!error && response) {
					console.log('response from 500px, setting state to res.body.photo');
					console.dir(response.body);
					this.setState({photo:response.body.photo})
				} else {
					console.log(`Error fetching 500px`, error);
				}
			}
		);
	}

	regularizeDescription(str = this.state.photo.description) {
		//  for photo.description - to unescape html tags from API
		return new String(str).replace(/<\/?[^>]+(>|$)/g, "")
	}

	render() {
		return (
			<div id="photoDetails">
			<Row>
				<Col xs={2} md={4}></Col>
				<Col xs={8} md={4}>
					{this.state.photo.name}
				</Col>
				<Col xs={2} md={4}></Col>
			</Row>
			<Row>
				<Col xs={2} md={4}></Col>
				<Col xs={8} md={4}>
					<Image src={this.state.photo.image_url} thumbnail />
				</Col>
				<Col xs={2} md={4}></Col>
			</Row>
			<Row>
				<Col xs={2} md={4}></Col>
				<Col xs={8} md={4}>
					{this.regularizeDescription()}
				</Col>
				<Col xs={2} md={4}></Col>
			</Row>
			</div>
		);
	}

}

export default PhotosDetail;
