import React from 'react'
import reactDOM from 'react-dom'
import './notification.less'
class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.state = {
      messages: {}
    };
  }

  addMessage(opts) {
    const messages = this.state.messages;
    messages[opts.id] = opts;
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
    const messages = this.state.messages;
    clearTimeout(messages[id].timeout);
    messages[id].duration = -1;
    this.setState({
      messages
    })
    setTimeout(() => {
      this.removeMessage(id)
    }, 600)
  }

  removeMessage(id) {
    const messages = this.state.messages;
    delete messages[id];
    this.setState({
      messages
    })
  }

  render() {
    const messages = this.state.messages;
    return (<div className="s-notification">
      {
        <div className="s-notification-section">
          {
            Object.keys(messages).map((key) => {
              const {type,duration, icon, close} = messages[key]
              return (
              <div key={key}
                   className={duration >= 0 ? "bounceInRight s-notification-item s-notification-item-" + type : "bounceOutRight s-notification-item s-notification-item-" + type}
                   style={icon ? close ? {paddingLeft: "3.2em"} : {
                     paddingLeft: "3.2em",
                     paddingRight: "1em"
                   } : close ? {} : {paddingRight: "1em"}}>
                {messages[key].content}
                {close &&
                <span className="s-notification-close" onClick={() => {
                  this.dismiss(key)
                }}>×</span>
                }
                {icon &&
                <div className="s-notification-icon-section">
                  {type === 'success' &&
                  <i className="iconfont icon-circle-success"></i>
                  }
                  {type !== 'success' &&
                  <i className="iconfont icon-info"></i>
                  }
                </div>
                }

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