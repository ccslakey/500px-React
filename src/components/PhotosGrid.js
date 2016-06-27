import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router';

class PhotosGrid extends React.Component {

	constructor(props) {
		super(props);
	}

	renderPhotos(){
		return this.props.photos.map((photo, ind) => {
			if(!photo.name || !photo.image_url || !photo.id || photo.nsfw) {return ;}

			return (<Col className="photo-feed-item" xs={12} md={4} lg={3} key={ind}>
						<Link to={`/photos/${photo.id}`}><Image src={photo.image_url} thumbnail /></Link>
						<br/>
						<div className="photo-thumb">
							{photo.name} - {photo.user.fullname} - {`${photo.user.city}, ${photo.user.country}`}
						</div>
					</Col>
			);
		});
	}

	render() {
		let content = this.renderPhotos();
		return (
			<div>
				{content}
			</div>
		)
	}

}

export default PhotosGrid;
