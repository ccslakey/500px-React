import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import request from 'superagent';
import { CONSUMER_KEY, CONSUMER_SECRET }from '../../secrets'

class Photos extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: '',
			searchQuery: '',
			photos: [],
		}
	}

	componentWillMount() {
		this.getPopularPhotos();
	}

	getPopularPhotos(feature = 'popular', page = 1) {
	const baseURL = `https://api.500px.com/v1/photos?sort=rating&`;
	request.get(`${baseURL}consumer_key=${CONSUMER_KEY}&feature=${feature}&page=${page}&`)
		.end((error, response) => {
			if (!error && response) {
				console.log('response from 500px');
				console.dir(response);
				this.setState({photos:response.body.photos})
			} else {
				console.log(`Error fetching 500px`, error);
			}
		}
	);
}

	renderPhotos(){
		return this.state.photos.map((photo, ind) => {
			if(photo.description === '') {return;}
			// unescape html tags from API
			const description = new String(photo.description).replace(/<\/?[^>]+(>|$)/g, "")
			const thisUrl = `https://500px.com${photo.url}`;

			return (<li key={ind} className="photo">
						<a href={thisUrl}>{description}</a>
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
