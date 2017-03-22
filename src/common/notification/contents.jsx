import React from 'react'
import reactDOM from 'react-dom'
import '../styles/notification.less'
class Contents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {}
        }
        this.addMessage = this.addMessage.bind(this)
        this.removeMessage = this.removeMessage.bind(this)
        this.dismiss = this.dismiss.bind(this)
    }
    addMessage(opts) {
        const messages = this.state.messages
        messages[opts.id] = opts
        if (opts.duration > 0) {
            messages[opts.id].timeout = setTimeout(() => {
                this.dismiss(opts.id)
            }, opts.duration * 1000)
        }
        this.setState({
            messages
        })
    }
    dismiss(id) {
        const messages = this.state.messages
        clearTimeout(messages[id].timeout)
        messages[id].duration = 0;
        this.setState({
            messages
        })
        setTimeout(() => {
            this.removeMessage(id)
        }, 600)
    }
    removeMessage(id) {
        const messages = this.state.messages
        delete messages[id]
        this.setState({
            messages
        })
    }

    render() {
        const messages = this.state.messages
        return (<div className="s-notification">
				{
            <div className="s-notification-section">
            {
            Object.keys(messages).map((key) => {
                const {duration} = messages[key]
                return (
                    <div key = {key} className={duration > 0 ? "bounceInRight s-notification-item s-notification-item-" + messages[key].type : "bounceOutRight s-notification-item s-notification-item-" + messages[key].type}>
            	 				{messages[key].content}
            	 				<span className="s-notification-close" onClick={() => {
                        this.dismiss(key)
                    }}>×</span>
            	 			</div>
                )
            })
            }
          </div>
            }
			</div>)
    }
}
export default Contents