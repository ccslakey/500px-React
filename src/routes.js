import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Photos from './components/Photos'
import Header from './components/Header';
import PhotosDetail from './components/PhotosDetail'

const routes = (
	<Route path="/" component={ App } >
		<IndexRoute component={ Photos } />
		<Route path="photos" component={ Photos } />
		<Route path="photos/:id" component={ PhotosDetail } />
	</Route>
);

export default routes;
