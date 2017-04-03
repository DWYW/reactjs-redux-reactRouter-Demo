import React from 'react'
import './Form.less'

import CheckBoxUI from '../../common/checkbox/CheckBoxUI.jsx'
import RadioGroup from '../../common/radio/RadioGroup.jsx'



export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.testCallback1=this.testCallback1.bind(this);
    this.radios=[{
      iconType: "default",
      color: "rgba(100,213,43,1)",
      iconSize: "1em",
      value: "1",
      text:"这是radio-1"
    },{
      iconType: "default",
      color: "rgba(10,23,43,1)",
      iconSize: "1em",
      disabled: false,
      value: "2",
      text:"这是radio-2"
    },{
      iconType: "heart",
      color: "rgba(0,23,43,1)",
      iconSize: "1em",
      disabled: false,
      value: "3",
      text:"这是radio-3"
    }];
    this.state = {
      testChecked1:true,
      testValue1:"1"
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  testCallback1(){
    this.setState({
      testChecked1:false,
    })
  }

  render() {
    return (
    <div className="form-page">
      <CheckBoxUI color="#00bcd4" infoText="这是checkbox文字说明1" disabled={false} callback={this.testCallback1}></CheckBoxUI>
      <CheckBoxUI iconType="circle-hollow" color="#00bcd4" checked={this.state.testChecked1} infoText="这是checkbox文字说明1"></CheckBoxUI>
      <CheckBoxUI iconType="circle-solid" color="#00bcd4" checked={true} infoText="这是checkbox文字说明1"></CheckBoxUI>
      <CheckBoxUI iconType="heart" color="rgba(0,0,0,.9)" checked={true} infoText="这是checkbox文字说明1"></CheckBoxUI>

      <div className="mgt10px">
        <RadioGroup defaultChecked={1} align="left" vertical="block" radios={this.radios} name="ssfsd" callback={function(res){console.log(res)}}> </RadioGroup>
      </div>
    </div>
    )
  }
}