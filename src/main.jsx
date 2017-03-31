import React from 'react'
import reactDOM from 'react-dom'
import { Router,  hashHistory, browserHistory} from 'react-router'
import routes from './router/index.jsx'


import {Provider, connect} from 'react-redux'
import store from './store/index.jsx'
// import * as actionType from "./store/actionType.jsx"
// import defaultData from './store/dataConf.jsx'

// console.log(store)
// console.log(store.getState())

reactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes}></Router>
	</Provider>
	,
	document.getElementById('app')
	// document.getElementsByTagName("body")[0]
)


// alert(23423)




