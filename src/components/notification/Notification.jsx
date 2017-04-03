import React from 'react'
import './notification.less'
import notification from '../../common/notification/'

import SelectUi from '../../common/select/SelectUi.jsx'


export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.methodCallback = this.methodCallback.bind(this);
    this.showIconCallback = this.showIconCallback.bind(this);
    this.showCloseCallback = this.showCloseCallback.bind(this);
    this.testInputChange = this.testInputChange.bind(this);
    this.testNotification = this.testNotification.bind(this);
    this.state = {
      notificationMethod: "default",
      duration: 5,
      showIcon: true,
      showClose: true,
      iconSelect: undefined,
      closeSelect: undefined,
    }
  }

  componentDidMount() {
    // console.log(111)
  }

  componentWillUnmount() {

  }

  showIconCallback(res) {
    this.setState({
      showIcon: res.value
    })
  }

  showCloseCallback(res) {
    this.setState({
      showClose: res.value
    })
  }

  testInputChange(e) {
    if (e.target.value) {
      this.setState({
        duration: parseInt(e.target.value)
      })
    }
  }

  methodCallback(res) {
    this.setState({
      notificationMethod: res.value,
      // iconSelect:0,
      // closeSelect:0,
    })
  }

  testNotification() {
    switch (this.state.notificationMethod){
      case 'default':
        notification.default('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        });
        break;
      case 'primary':
        notification.primary('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        });
        break;
      case 'success':
        notification.success('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        });
        break;
      case 'error':
        notification.error('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        });
        break;
      case 'danger':
        notification.danger('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        });
        break;
      default:
        notification.default('这是一个notification提示,内容不宜太多', {
          icon: this.state.showIcon,
          duration: this.state.duration,
          close: this.state.showClose
        })
    }
  }

  render() {
    return (
    <div className="notification-page">
      <div className="pannel">
        <div className="pannel-title">
          notification.{'{'}method{'}'}(content,options)
        </div>
        <div className="pannel-content">
          <div className="desc">
            <p>method为方法名，包含default,success,primary,error,danger五种</p>
            <p>content type String 要显示的字符串内容</p>
            <p>options type Object 一些参数</p>
            <ul>
              <li>duration type Number 过 duration 秒后自动关闭 0表示手动关闭 （默认为 5）</li>
              <li>icon type Boolean 是否显示icon （默认 false）</li>
              <li>close type Boolean 是否显示关闭按钮 （默认 false）</li>
            </ul>
            <p className="info">当close为false时，duration 设置为0时会自动强制设置为默认值5</p>
          </div>
        </div>
      </div>
      <div className="pannel">
        <div className="pannel-title">Example</div>
        <div className="pannel-content">
          <div className="mgt10px">
            <span className="mgr20px">
              <span className="mgr10px">method:</span>
              <SelectUi
              options={["default", "primary", "success", "error", "danger"]} fontSize="12px"
              callback={this.methodCallback}></SelectUi>
            </span>
            <span className="mgr20px">
              <span className="mgr10px">duration:</span>
              <input type="number" className="input primary input1" defaultValue={this.state.duration} onChange={(e) => this.testInputChange(e)}/>
            </span>
          </div>
          <div className="mgt10px">
            <span className="mgr20px">
              <span className="mgr10px">showIcon:</span>
              <SelectUi
              options={[true, false]} defaultIndex={1} selectedIndex={this.state.iconSelect} fontSize="12px"
              callback={this.showIconCallback}></SelectUi>
            </span>
            <span className="mgr20px">
              <span className="mgr10px">showCloseButton:</span>
              <SelectUi
              options={[true, false]} defaultIndex={1} selectedIndex={this.state.closeSelect} fontSize="12px"
              callback={this.showCloseCallback}></SelectUi>
            </span>
          </div>
          <div className="mgt10px">
            <button className="btn default button1"
                    onClick={this.testNotification}>
              Notification
            </button>
          </div>

        </div>
      </div>
      <br/>
      <button className="btn primary" onClick={() => notification.primary('这是一个notification提示,内容不宜太多', {
        icon: false,
        duration: 5,
        close: false
      })}>我是BTN
      </button>
      <button className="btn success" onClick={() => notification.success('这是一个notification提示,内容不宜太多', {
        icon: true,
        duration: 0
      })}>我是BTN
      </button>
      <button className="btn error" onClick={() => notification.error('这是一个notification提示,内容不宜太多', {
        icon: true,
        duration: 5,
        close: true
      })}>我是BTN
      </button>
      <button className="btn danger" onClick={() => notification.danger('这是一个notification提示,内容不宜太多', {
        icon: true,
        duration: 5,
        close: true
      })}>我是BTN
      </button>
      <br/>
      <button className="btn" disabled={true}>disable</button>
    </div>
    )
  }
}