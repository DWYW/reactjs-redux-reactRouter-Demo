import React from 'react'
import reactDOM from 'react-dom'

class Contents extends React.Component{
	constructor(props){
		super(props);
		this.state={
			messages:{}
		}
		this.addMessage=this.addMessage.bind(this)
		this.removeMessage =this.removeMessage.bind(this)
		this.dismiss=this.dismiss.bind(this)
	}
	addMessage(opts){
		const messages=this.state.messages
		// console.log(opts)
		messages[opts.id]=opts
		console.log(Object.keys(messages))
		this.setState({messages})
		setTimeout(()=>{this.dismiss(opts.id)},opts.duration*1000)

	}
	dismiss(id){
		this.removeMessage(id)
	}
	removeMessage(id){
		const messages = this.state.messages
    delete messages[id]
    this.setState({ messages })
    console.log("closed"+id)
	}
	render(){
		const messages = this.state.messages
		return(
			<div>
				{
            <div>
            	 {
            	 	Object.keys(messages).map((key)=>{
            	 		return(
            	 			<div key = {key}>
            	 				{messages[key].id}

            	 				<span onClick={()=>{this.removeMessage(key)}}>X</span>
            	 			</div>
            	 			)
            	 	})
            	 }
            </div>
           
          }
			</div>
			)
	}
}

export default Contents