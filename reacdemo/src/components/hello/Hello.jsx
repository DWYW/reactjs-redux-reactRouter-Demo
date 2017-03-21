import React from 'react'

import notification from '../../common/notification/'
// console.log(notification.info())

class Hello extends React.Component{

	constructor(){
		super();
		this.state={date:new Date()}
		// setInterval(this.loop(),1000)
	}
	componentDidMount(){   // 分量输出后挂机运行已经被渲染到了DOM
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
	}
	componentWillUnmount(){  //分量销毁之前
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({
			date: new Date()

		});
     // console.log(this.state.date)
   }
   render(){
   	return	(
   		<div>
   			<h1>现在时间： {this.state.date.toLocaleTimeString()}</h1>
   			<button onClick={()=> notification.info('This is an info message.',{duration:2})}>click me</button>
   		</div>
   		)
   }

 }

 module.exports=Hello;