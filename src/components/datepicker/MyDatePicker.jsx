import React from 'react'
import DatePicker from '../../common/datepicker/DatePicker.jsx'

export default class MyDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.callback1 = this.callback1.bind(this);
    this.state = {
      test1: null
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  callback1(value) {
    this.setState({
      test1:value
    })
  }

  render() {
    return (
    <div className="my-date-picker">
      <div className="pannel">
        <div className="pannel-title">{`<DatePicker></DatePicker>`}</div>
        <div className="pannel-content">
          <p className="bold">ATTRIBUTE</p>
          <ul>
            <li>style={`{style}`} Object,Input的样式字符串，默认（300px）</li>
            <li>value={`{value}`} String,默认选中值，注意与format格式保持一致（默认YYYY-MM-DD）</li>
            <li>format={`{format}`} String,modal的内容的对齐方式 （默认为left）</li>
            <li>callback={`{callback}`} Function,回调函数</li>
          </ul>
        </div>
      </div>

      <div className="pannel">
        <div className="pannel-title">EXAMPLE</div>
        <div className="pannel-content">
          <div>开始日期:{this.state.test1}</div>
          <div><DatePicker placeholder="请选择开始日期" callback={this.callback1}></DatePicker><DatePicker style={{color: "#ccc"}} value="4/23/2017"
                                                                          format="M/D/YYYY"></DatePicker></div>
          <div><DatePicker format="YYYY/MM/DD"></DatePicker></div>
          <div><DatePicker format="M/D/YY"></DatePicker></div>

        </div>
      </div>

    </div>
    )
  }
}