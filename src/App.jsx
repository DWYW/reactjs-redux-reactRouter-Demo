import React from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import './common/styles/index.less'

import * as test from './store/actions/test.jsx'

class App extends React.Component{
	constructor(props) {
	    super(props);
	    // console.log(props)
	    this.tools=[true,true,true,false];
	    this.toolsE=this.tools.map(
		    			(tool,key)=>
		    				key === this.tools.length-1 ? `${tool}` : `${tool},`
	    			)
	    this.count=this.tools.reduce(
	    	(a,tool)=>{
		    	return tool ? a+1 : a;
	    	},
	    	0
	    )
	}
// dispatch(add())
	render(){
		return (
			<div className="div">
				<div>
					tools:[{this.toolsE}]
				</div>
				true:{this.count}
				<div>{this.props.num}</div>
				<p><Link to={{pathname:'hello',query:{name:'hello'}}}>hello</Link></p>
				<p><Link to={{pathname:'welcome',query:{name:'welcome'}}}>welcome</Link></p>

				<button onClick={this.props.increase}>+</button>
				<button onClick={this.props.decrease}>-</button>
				<button onClick={this.props.increaseAsync}>++</button>
				{this.props.children}
				
			</div>
		)
		
	}


}


function mapStateToProps(state) {
  return { 
  	num: state.test
  }
}

module.exports=connect( mapStateToProps,test)(App)