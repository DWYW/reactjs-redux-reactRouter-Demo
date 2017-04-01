import React from 'react'
import './SelectUi.less'

export default class SelectUi extends React.Component {
  constructor(props) {
    super(props);
    this.optionsStyle = null;
    this.animationTime = 200; //200ms
    this.selectInit = this.selectInit.bind(this);
    this.mountOptionsStyle = this.mountOptionsStyle.bind(this);
    this.handleOptionsShow = this.handleOptionsShow.bind(this);
    this.handleOptionsHide = this.handleOptionsHide.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.state = {
      options: [],
      callback: null,
      placeholder: null,
      selectType: 'default',
      errorType: null,
      selectUiStyle: {},
      selectedStatus: false,
      selectedValue: null,
      selectedIndex: null,
      optionsStyle: null
    }
  }

  componentDidMount() {
    this.selectInit(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    })

    if (nextProps.type !== this.props.type) {
      let selectType = this.state.selectType;
      if (nextProps.type) {
        if (nextProps.type === 'default' || nextProps.type === 'primary' || nextProps.type === 'success' || nextProps.type === 'error' || nextProps.type === 'danger') {
          selectType = nextProps.type;
        }
      }
      this.setState({
        selectType: selectType
      })
    }

    if (nextProps.errorType !== this.props.errorType) {
      let errorType = this.state.errorType;
      if (nextProps.errorType && (nextProps.errorType === 'error' || nextProps.errorType === 'danger')) {
        errorType = nextProps.errorType;
      }
      this.setState({
        errorType: errorType
      })
    }

    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex:nextProps.selectedIndex,
        selectedValue:nextProps.options[nextProps.selectedIndex]
      })
    }


    // return true;
  }

  selectInit(props) {
    let options = props.options;
    let callback = props.callback;
    let selectStyle = {};
    let selectType = "default";
    let errorType = null;
    props.fontSize ? selectStyle.fontSize = props.fontSize : "";
    props.width ? selectStyle.width = props.width : "";
    selectStyle.height = props.height ? props.height : "32px";
    selectStyle.lineHeight = selectStyle.height;
    let placeholder = props.placeholder ? props.placeholder : null;
    if (props.type) {
      if (props.type === 'default' || props.type === 'primary' || props.type === 'success' || props.type === 'error' || props.type === 'danger') {
        selectType = props.type;
      }
    }
    if (props.errorType && (props.errorType === 'error' || props.errorType === 'danger')) {
      errorType = props.errorType;
    }
    let selectedIndex = null;
    let selectedValue = null;
    if (props.selectedIndex !== undefined) {
      selectedIndex = props.selectedIndex;
      selectedValue = props.options[selectedIndex];
    }
    this.setState({
      options: options,
      callback: callback,
      placeholder: placeholder,
      errorType: errorType,
      selectType: selectType,
      selectUiStyle: selectStyle,
      selectedIndex: selectedIndex,
      selectedValue: selectedValue
    })
    // console.log(this.state)
  }

  mountOptionsStyle(status) {
    const prefixes = ["Webkit", "Moz", "ms", "O", ""];
    if (status === 'show') {
      return JSON.parse("{" + prefixes.map((prefix) => `\"${prefix}Transform\":\"scaleY(1)\"`).join(",") + "}".toString());
    } else {
      return JSON.parse("{" + prefixes.map((prefix) => `\"${prefix}Transform\":\"scaleY(0)\"`).join(",") + "}".toString())
    }
  }

  handleOptionsShow() {
    const optionsStyle = this.mountOptionsStyle("show");
    this.setState({
      selectedStatus: true,
      optionsStyle: optionsStyle
    })
  }

  handleOptionsHide() {
    const optionsStyle = this.mountOptionsStyle("hide");
    this.setState({
      selectedStatus: false,
      optionsStyle: optionsStyle
    })
  }

  handleSelected(key, val) {
    if (val !== this.state.selectedValue) {
      if (this.state.callback) {
        this.state.callback({index: key, value: val})
      }
      this.setState({
        selectedIndex: key,
        selectedValue: val
      })
    }
    this.handleOptionsHide();
  }

  render() {
    const options = this.state.options;
    const errorType = this.state.errorType;
    const placeholder = this.state.placeholder;
    return (
    <div
    className={errorType ? `select-ui select-ui-error-${errorType} select-ui-${this.state.selectType}` : `select-ui select-ui-${this.state.selectType}`}
    style={this.state.selectUiStyle}>
      <label className={this.state.selectedStatus ? "select-select select-focus" : "select-select"}
             onClick={(e) => this.handleOptionsShow(e)}>
        <div className="select-value">{this.state.selectedValue || placeholder || "请选择"}</div>
        <i className="select-icon iconfont icon-traingle-down"></i>
      </label>
      <div className="select-options">
        <div className="mark" style={{
          display: this.state.selectedStatus ? "block" : "none"
        }} onClick={(e) => this.handleOptionsHide(e)}></div>
        <ul style={this.state.optionsStyle}>
          {
            Object.keys(options).map((key) => {
              return (
              <li className={key == this.state.selectedIndex ? "select-option-selected" : ""} key={key}
                  onClick={() => this.handleSelected(key, options[key])}>{options[key]}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
    )
  }
}
SelectUi.propTypes = {
  type: React.PropTypes.string,
  errorType: React.PropTypes.string,
  options: React.PropTypes.array,
  selectedIndex: React.PropTypes.number,
  callback: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fontSize: React.PropTypes.string
}