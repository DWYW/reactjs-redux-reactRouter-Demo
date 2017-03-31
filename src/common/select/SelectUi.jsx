import React from 'react'
import './SelectUi.less'

export default class SelectUi extends React.Component {
  static propTypes = {
    options: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    callback: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleOptionsShow = this.handleOptionsShow.bind(this);
    this.optionsStyle=null;
    this.animationTime=200; //200ms
    this.state = {
      selectedStatus: false,
      selectedValue: null,
      optionsStyle:null
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  mountOptionsStyle(status){
    const prefixes=["Webkit","Moz","ms","O",""];
    if(status==='show'){
      return JSON.parse("{"+prefixes.map((prefix)=>`\"${prefix}Transform\":\"scaleY(1)\"`).join(",")+"}".toString());
    }else{
      return JSON.parse("{"+prefixes.map((prefix)=>`\"${prefix}Transform\":\"scaleY(0)\"`).join(",")+"}".toString())
    }
  }
  handleOptionsShow() {
    const optionsStyle=this.mountOptionsStyle("show");
    this.setState({
      selectedStatus: true,
      optionsStyle:optionsStyle
    })
  }
  handleOptionsHide(){
    const optionsStyle=this.mountOptionsStyle("hide");
    this.setState({
      selectedStatus: false,
      optionsStyle:optionsStyle
    })
  }
  render() {
    return (
    <div className="select-ui">
      <label className="select-select" onClick={(e)=>this.handleOptionsShow(e)}>
        <div className="select-value">dfdfsdfs</div>
        <i className="select-icon iconfont icon-traingle-down"></i>
      </label>

      <div className="select-options">
        <div className="mark" style={{
          display: this.state.selectedStatus ? "block" : "none"
        }} onClick={(e)=>this.handleOptionsHide(e)}></div>
        <ul style={this.state.optionsStyle}>
          <li>222</li>
          <li>222</li>
          <li>222</li>
          <li>222</li>
        </ul>
      </div>
    </div>
    )
  }
}