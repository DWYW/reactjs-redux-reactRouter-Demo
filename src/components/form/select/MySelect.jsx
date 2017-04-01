import React from 'react'
import SelectUi from '../../../common/select/SelectUi.jsx'
import './MySelect.less'
export default class MySelect extends React.Component {
  constructor(props) {
    super(props);
    this.testSelectCallback=this.testSelectCallback.bind(this);
    this.testSelectTypeCallback=this.testSelectTypeCallback.bind(this);
    this.testSelectErrorTypeCallback=this.testSelectErrorTypeCallback.bind(this);
    this.state = {
      testOptions:["select1","select2","select3","select4"],
      testSelected:null,
      testSelectType:'default',
      testSelectErrorType:null
    }
  }

  componentDidMount() {
    if(this.state.testSelectedIndex!==undefined){
      this.setState({
        testSelected:this.state.testOptions[this.state.testSelectedIndex]
      })
    }
  }

  componentWillUnmount() {

  }

  testSelectCallback(res){
    this.setState({
      testSelected:res.value
    })
  }
  testSelectTypeCallback(res){
    this.setState({
      testSelectType:res.value
    })
  }
  testSelectErrorTypeCallback(res){
    this.setState({
      testSelectErrorType:res.value
    })
  }

  render() {
    return (
    <div>
      <div className="pannel">
        <div className="pannel-title">
          {`<SelectUi></SelectUi>`}
        </div>
        <div className="pannel-content">
          <p className="bold">attribute:</p>
          <ul>
            <li>options={`[option,...]`}, array （必需）</li>
            <li>type={`{type}`}, string 包含default,primary,success,error,danger (默认default)</li>
            <li>errorType={`{errorType}`}, string 包含error,danger </li>
            <li>selectedIndex={`{index}`}, number 被选中的位置，从0开始 </li>
            <li>placeholder={`{info}`}, string 默认提示信息 </li>
            <li>width={`{width}`}, string select及option宽度，最小120px </li>
            <li>height={`{height}`}, string select及option高度 </li>
            <li>fontSize={`{fontSize}`}, string select及option字体大小 </li>
            <li>callback={`{callback}`}, function 回调函数,返回结果为{`{index:selected,value:selectedValue}`} </li>
          </ul>
        </div>
      </div>

      <div className="pannel">
        <div className="pannel-title">example</div>
        <div className="pannel-content">
          <div className="mgt10px">
           <span className="mgr20px">
             type:<SelectUi options={["default","primary","success","error","danger"]}  selectedIndex={0} fontSize="12px" callback={this.testSelectTypeCallback}></SelectUi>
           </span>
            <span className="mgr20px">
             errorType:<SelectUi options={["error","danger"]}  placeholder={"请选择"} fontSize="12px" callback={this.testSelectErrorTypeCallback}></SelectUi>
           </span>
          </div>
          <div className="mgt10px">当前选择的值为：{this.state.testSelected ||"请先选择"}</div>
          <div className="mgt10px">
            <SelectUi options={this.state.testOptions} type={this.state.testSelectType} errorType={this.state.testSelectErrorType} placeholder="请先选择" fontSize="12px" selectedIndex={this.state.testSelectedIndex} callback={this.testSelectCallback}></SelectUi>
          </div>

        </div>
      </div>

      {/*<div>*/}
        {/*<input className="input" type="text"/> <br/>*/}
        {/*<input className="input default theme-default" type="text"/> <br/>*/}
        {/*<input className="input primary" type="text"/> <br/>*/}
        {/*<input className="input success theme-success" type="text"/> <br/>*/}
        {/*<input className="input error theme-error" type="text"/> <br/>*/}
        {/*<input className="input danger theme-danger" type="text"/>*/}
      {/*</div>*/}
      
    </div>
    )
  }
}