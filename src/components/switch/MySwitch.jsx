import React from 'react'
import SwitchUi from '../../common/switch/SwitchUi.jsx'

export default class MySwitch extends React.Component {
  constructor(props) {
    super(props);
    this.callback1=this.callback1.bind(this);
    this.callback2=this.callback2.bind(this);
    this.callback3=this.callback3.bind(this);
    this.state = {
      test1: null,
      test2: false,
      test3: true
    }
  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  callback1(res){
    let test =res.value.toString();
    this.setState({
      test1: test
    })
  }
  callback2(res){
    let test =res.value.toString();
    this.setState({
      test2: test
    })
  }
  callback3(res){
    let test =res.value.toString();
    this.setState({
      test3: test
    })
  }

  render() {
    return (
    <div className="my-switch">
      <div className="pannel">
        <div className="pannel-title">{`<SwitchUi></SwitchUi>`}</div>
        <div className="pannel-content">
          <p className="bold">ATTRIBUTE</p>
          <ul>
            <li>type={`{ normal | smaller }`} String,switch的类型，默认（normal）</li>
            <li>open={`{ true | false }`} Boolean,switch是否是开启模式</li>
            <li>disabled={`{ true | false }`} Boolean,switch是否是禁用模式 （默认为false）</li>
            <li>callback={`{callback}`} Function,回调函数</li>
          </ul>

        </div>
      </div>

      <div className="pannel">
        <div className="pannel-title">EXAMPLE</div>
        <div className="pannel-content">
          <div><SwitchUi callback={this.callback1}></SwitchUi><span>{this.state.test1}</span></div>
          <div><SwitchUi size="smaller" callback={this.callback2}></SwitchUi>{this.state.test2}</div>
          <div><SwitchUi size="smaller" disabled={true} open={this.state.test2}></SwitchUi></div>
          <div><SwitchUi open={true} callback={this.callback3}></SwitchUi>{this.state.test3}</div>
          <div><SwitchUi open={this.state.test3} disabled={true}></SwitchUi></div>

        </div>
      </div>
    </div>
    )
  }
}