import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Photos from './components/Photos'
import Header from './components/Header';
import PhotosDetail from './components/PhotosDetail'
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Gallery from './components/Gallery';

const routes = (
	<Route path="/" component={ App } >
		<IndexRoute component={ Photos } />
		<Route path="photos" component={ Photos } />
		<Route path="photos/:id" component={ PhotosDetail } />
		<Route path="users" component={ Users } />
		<Route path="users/:id" component={ UserDetails } />
		<Route path="users/:userId/galleries/:id" component={ Gallery } />
	</Route>
);

export default routes;
