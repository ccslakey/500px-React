import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PhotosDetail from './PhotosDetail'

class Photos extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: '',
			searchQuery: '',
			photos: [],
		}
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
					{this.state.searchQuery}
  				</form>
			</div>
		);
	}

}

export default Photos;
