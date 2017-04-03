import React from 'react'
import CheckBoxUI from "../../../common/checkbox/CheckBoxUI.jsx"
export default class MyCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.testCallback = this.testCallback.bind(this);
    this.state = {
      test: true
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  testCallback(res) {
    this.setState({
      test: res
    })
  }

  render() {
    return (
    <div className="MyCheckBox-page">
      <div className="pannel">
        <div className="pannel-title">{`<CheckBoxUI></CheckBoxUI>`}</div>
        <div className="pannel-content">
          <p className="bold">ATTRIBUTE</p>
          <ul>
            <li>iconType={`{type}`} String,可选值为：default,circle-hollow,circle-solid,heart （默认为default）</li>
            <li>color={`{color}`} String,颜色字符串 （默认为#000000）</li>
            <li>iconSize={`{size}`} String,图标的字体大小 （默认为16px）</li>
            <li>checked={`{true||false}`} Boolean,是否被选中 （默认为false）</li>
            <li>disabled={`{true||false}`} Boolean,是否可用 （默认为false）</li>
            <li>infoText={`{text}`} String,相关文字说明 （默认为undefined）</li>
            <li>callback={`{callback}`} Function,回调函数 （默认为undefined）</li>
          </ul>
        </div>
      </div>
      <div className="pannel">
        <div className="pannel-title">EXAMPLE</div>
        <div className="pannel-content">
          <div className="mgt10px">
            <CheckBoxUI infoText="这是默认的checkbox" disabled={false}></CheckBoxUI>
          </div>
          <div className="mgt10px">
            <CheckBoxUI color="#00bcd4" infoText="这是可用的checkbox" disabled={false}></CheckBoxUI>
          </div>
          <div className="mgt10px">
            <CheckBoxUI color="#00bcd4" infoText="这是不可用的checkbox" disabled={true}></CheckBoxUI>
          </div>
          <div className="mgt10px">
            <CheckBoxUI iconType="heart" color="#00bcd4" checked={true} infoText="这是默认选中不可用的checkbox" disabled={true}></CheckBoxUI>
          </div>
          <div className="mgt10px">
            <CheckBoxUI iconType="circle-hollow" color="#00bcd4" checked={true} infoText="这是默认选中的checkbox"></CheckBoxUI>
          </div>
          <div className="mgt10px">
            <CheckBoxUI iconType="circle-solid" color="#00bcd4" checked={this.state.test}
                        infoText={`这是带有回调函数的checkbox,当前状态${this.state.test}`} callback={this.testCallback}></CheckBoxUI>
          </div>
        </div>
      </div>
    </div>
    )
  }
}