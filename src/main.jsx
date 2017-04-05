import React from 'react'
import reactDOM from 'react-dom'
import { Router,  hashHistory, browserHistory} from 'react-router'
import routes from './router/index.jsx'


import {Provider, connect} from 'react-redux'
import store from './store/index.jsx'


reactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes}></Router>
	</Provider>
	,
	document.getElementById('app')
)





