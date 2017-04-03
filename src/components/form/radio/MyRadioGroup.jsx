import React from 'react'
import RadioGroup from "../../../common/radio/RadioGroup.jsx"
export default class MyRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.testCallback1 = this.testCallback1.bind(this);
    this.testCallback2 = this.testCallback2.bind(this);
    this.radios = [{
      value: "这是默认radio",
      text: "这是默认radio"
    }, {
      value: "这是默认选中的radio",
      text: "这是默认选中的radio"
    }, {
      disabled: true,
      value: "这是默认不可用的radio",
      text: "这是默认不可用的radio"
    }];
    this.radios2 = [{
      iconType:"heart",
      color:"#00bcd4",
      value: "这是heart",
      text: "这是heart"
    }, {
      iconType:"circle-hollow",
      color:"#00bcd4",
      value: "这是circle-hollow",
      text: "这是circle-hollow"
    }, {
      iconType:"circle-solid",
      color:"#d9534f",
      value: "这是circle-solid",
      text: "这是默circle-solid"
    }];
    this.state = {
      test1: null,
      test2: null
    }
  }

  testCallback1(res) {
    this.setState({
      test1: res
    })
  }
  testCallback2(res) {
    this.setState({
      test2: res
    })
  }

  render() {
    return (
    <div className="MyCheckBox-page">
      <div className="pannel">
        <div className="pannel-title">{`<RadioGroup></RadioGroup>`}</div>
        <div className="pannel-content">
          <p className="bold">ATTRIBUTE</p>
          <ul>
            <li>radios={`{radios}`} Array,radio数组</li>
            <li>name={`{name}`} String,radio的name属性值</li>
            <li>align={`{left|center|right}`} String,radio的水平对齐方式 （默认为left）</li>
            <li>vertical={`{inline|block}`} String,radio的显示方式 （默认为inline）</li>
            <li>defaultChecked={`{index}`} Number,RadioGroup第index个默认选中 （默认为undefined）</li>
            <li>callback={`{callback}`} Function,回调函数 （默认为undefined）</li>
          </ul>
          <p className="bold"><i className="iconfont icon-info"
                                 style={{verticalAlign: "middle", paddingRight: "6px"}}></i>radios attributes</p>
          <ul>
            <li>iconType={`{type}`} String,可选值为：default,circle-hollow,circle-solid,heart （默认为default）</li>
            <li>color={`{color}`} String,颜色字符串 （默认为#000000）</li>
            <li>iconSize={`{size}`} String,图标的字体大小 （默认为16px）</li>
            <li>disabled={`{true||false}`} Boolean,是否可用 （默认为false）</li>
            <li>value={`{value}`} radio的值 （默认为undefined）</li>
            <li>text={`{text}`} String,相关文字说明 （默认为undefined）</li>
          </ul>

        </div>
      </div>
      <div className="pannel">
        <div className="pannel-title">EXAMPLE</div>
        <div className="pannel-content">
          <div>
            <p>默认GadioGroup:{this.state.test1}</p>
            <RadioGroup defaultChecked={1} radios={this.radios} name="ssfsd"
                        callback={this.testCallback1}> </RadioGroup>
          </div>
          <div className="mgt10px">
            <p>其它GadioGroup:{this.state.test2}</p>
            <RadioGroup defaultChecked={2} radios={this.radios2} name="ssfsd"
                        callback={this.testCallback2}> </RadioGroup>
          </div>
        </div>
      </div>
    </div>
    )
  }
}