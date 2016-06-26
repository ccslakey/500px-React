import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Photos from './components/Photos'
import Header from './components/Header';

const routes = (
	<Route path="/" component={ App } >
		<Route path="photos" component={ Photos } />
	</Route>
);

export default routes;
