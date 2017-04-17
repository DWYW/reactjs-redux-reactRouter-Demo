import React from 'react'
import './SelectUi.less'

export default class SelectUi extends React.Component {
  constructor(props) {
    super(props);
    this.mountOptionsStyle = this.mountOptionsStyle.bind(this);
    this.handleOptionsShow = this.handleOptionsShow.bind(this);
    this.handleOptionsHide = this.handleOptionsHide.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.state = {
      options: [],
      callback: null,
      placeholder: null,
      selectType: 'default',
      themeType: null,
      selectUiStyle: {},
      selectedStatus: false,
      selectedValue: null,
      selectedIndex: null,
      optionsStyle: null
    }
  }

  componentDidMount() {
    let options = this.props.options;
    let callback = this.props.callback;
    let selectStyle = {};
    let selectType = "default";
    let themeType = null;
    this.props.fontSize ? selectStyle.fontSize = this.props.fontSize : "";
    this.props.width ? selectStyle.width = this.props.width : "";
    selectStyle.height = this.props.height ? this.props.height : "32px";
    selectStyle.lineHeight = selectStyle.height;
    let placeholder = this.props.placeholder ? this.props.placeholder : null;
    const propsType = this.props.type;
    if (propsType) {
      if (propsType === 'default' || propsType === 'primary' || propsType === 'success' || propsType === 'error' || propsType === 'danger') {
        selectType = propsType;
      }
    }
    const propsThemeType = this.props.themeType;
    if (propsThemeType && (propsThemeType === 'primary' || propsThemeType === 'success' || propsThemeType === 'error' || propsThemeType === 'danger')) {
      themeType = propsThemeType;
    }
    let selectedIndex = null;
    let selectedValue = null;
    if (this.props.selectedIndex !== undefined && this.props.selectedIndex !== null) {
      selectedIndex = parseInt(this.props.selectedIndex);
      selectedValue = this.props.options[selectedIndex].toString();
      if (callback) {
        callback({index: selectedIndex, value: this.props.options[selectedIndex]})
      }
    }
    this.setState({
      options: options,
      callback: callback,
      placeholder: placeholder,
      themeType: themeType,
      selectType: selectType,
      selectUiStyle: selectStyle,
      selectedIndex: selectedIndex,
      selectedValue: selectedValue
    })

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

    if (nextProps.themeType !== this.props.themeType) {
      let themeType = this.state.themeType;
      if (nextProps.themeType && (nextProps.themeType === 'primary' || nextProps.themeType === 'success' || nextProps.themeType === 'error' || nextProps.themeType === 'danger')) {
        themeType = nextProps.themeType;
      } else {
        themeType = null
      }
      this.setState({
        themeType: themeType
      })
    }
    if(nextProps.selectedIndex !== this.props.selectedIndex && nextProps.selectedIndex !== undefined && nextProps.selectedIndex !== null && nextProps.selectedIndex !== this.state.selectedIndex){
      this.handleSelected(nextProps.selectedIndex,this.state.options[nextProps.selectedIndex]);
      this.setState({
        selectedIndex: nextProps.selectedIndex.toString(),
        selectedValue: this.state.options[nextProps.selectedIndex].toString()
      })
    }

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
    if (val.toString() !== this.state.selectedValue) {
      if (this.state.callback) {
        this.state.callback({index: parseInt(key), value: val})
      }
      this.setState({
        selectedIndex: key,
        selectedValue: val.toString()
      })
    }

    this.handleOptionsHide();
  }

  render() {
    const options = this.state.options;
    const themeType = this.state.themeType;
    const placeholder = this.state.placeholder;
    return (
    <div
    className={themeType ? `select-ui select-ui-theme-${themeType} select-ui-${this.state.selectType}` : `select-ui select-ui-${this.state.selectType}`}
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
                  onClick={() => this.handleSelected(key, options[key])}>{options[key].toString()}</li>
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
  themeType: React.PropTypes.string,
  options: React.PropTypes.array,
  selectedIndex: React.PropTypes.number,
  callback: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fontSize: React.PropTypes.string
}