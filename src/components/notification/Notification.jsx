import React from 'react'
import './notification.less'
import notification from '../../common/notification/'


export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // console.log(111)
  }

  componentWillUnmount() {

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
              <li>duration type Number 过 duration 秒后自动关闭 0表示手动关闭 （默认为 5） </li>
              <li>icon type Boolean 是否显示icon （默认 false） </li>
              <li>close type Boolean 是否显示关闭按钮 （默认 false） </li>
            </ul>
            <p className="info">当close为false时，duration 设置为0时会自动强制设置为默认值5</p>
          </div>
        </div>
      </div>
      <button className="btn default"
              onClick={() => notification.default('这是一个notification提示,内容不宜太多', {icon: true, close: true})}>WWW
      </button>
      <br/>
      <button className="btn primary" onClick={() => notification.primary('这是一个notification提示,内容不宜太多', {
        icon: true,
        duration: 5,
        close: true
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