const routes ={
		path: '/',
		component: require('../App.jsx'),
		indexRoute: {
			component: require('../components/hello/Hello.jsx')
		},
		childRoutes:[
			// 路由按模块组织分离，避免单文件代码量过大
			// require('./msg').default,
		    // require('./todo').default,
		    {
		   		path:'hello',
		   		component: require('../components/hello/Hello.jsx')
		    },{
		    	path:'welcome',
		    	component: require('../components/hello/Welcome.jsx')
		    }
		]
	}

export default routes;