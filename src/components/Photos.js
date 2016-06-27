import React from 'react';
import request from 'superagent';
import { Link } from 'react-router';
import { Button, ButtonGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { CONSUMER_KEY }from '../../secrets';

class Photos extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: '',
			searchQuery: '',
			photos: [],
			featureMode: ''
		}
	}

	componentWillMount() {
		this.getPhotos();
	}

	selectMode(featureMode){
		this.setState({featureMode});
		this.getPhotos(featureMode);
	}

	getPhotos(mode = `${this.state.featureMode}` || 'popular', page = 1) {
		const baseURL = `https://api.500px.com/v1/photos?sort=rating&rpp=100&`;
		request.get(`${baseURL}consumer_key=${CONSUMER_KEY}&feature=${mode}&page=${page}`)
			.end((error, response) => {
				if (!error && response) {
					console.log(`response from ${baseURL}consumer_key=${CONSUMER_KEY}&feature=${mode}&page=${page}`);
					console.dir(response);
					this.setState({photos:response.body.photos})
				} else {
					console.log(`Error fetching 500px`, error);
				}
			}
		);
}

	// .replace(/<\/?[^>]+(>|$)/g, "") for photo.description unescape html tags from API
	renderPhotos(){
		return this.state.photos.map((photo, ind) => {
			if(photo.name === '') {return;}

			return (<li key={ind} className="photo">
						<Link to={`/photos/${photo.id}`}>{photo.name}</Link>
					</li>
			);
		});
	}


    handleInput(event) {
		event.preventDefault();
		this.setState({input: event.target.value});
    }

	handleSubmit(event){
		event.preventDefault();
		var query = this.state.input;
		this.setState({searchQuery: query, input: ''});
	}

	render() {
		let content = this.renderPhotos();

		return (
			<div>
				<form>
  			  	<FormGroup controlId="formControlsText">
  			  		<FormControl
  						type="text"
  						value={this.state.input}
  		  				onChange={this.handleInput.bind(this)}
  						placeholder="Search 500px photos" />
						<br/>
						<ButtonGroup>
							<Button ref='popular' onClick={this.selectMode.bind(this, 'popular')}>Popular</Button>
							<Button ref='highest_rated' onClick={this.selectMode.bind(this, 'highest_rated')}>Highest Rated</Button>
							<Button ref='upcoming' onClick={this.selectMode.bind(this, 'upcoming')}>Upcoming</Button>
							<Button ref='editors' onClick={this.selectMode.bind(this, 'editors')}>Editors pick</Button>
							<Button ref='fresh_today' onClick={this.selectMode.bind(this, 'fresh_today')}>Fresh Today</Button>
							<Button ref='fresh_yesterday' onClick={this.selectMode.bind(this, 'fresh_yesterday')}>Fresh Yesterday</Button>
							<Button ref='fresh_week' onClick={this.selectMode.bind(this, 'fresh_week')}>Fresh this Week</Button>
						</ButtonGroup>
						<br/>
						<br/>
  					<Button block type="submit" onClick={this.handleSubmit.bind(this)} bsStyle="primary">Search</Button>
  			 	</FormGroup>
  					<br/>
					<ul>
					{content}
					</ul>
  				</form>
			</div>
		);
	}

}

export default Photos;
