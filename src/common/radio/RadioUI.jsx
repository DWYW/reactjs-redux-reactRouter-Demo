import React from 'react'
import './RaduiGroup.less'
export default class RadioUI extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetCheckBoxStatus = this.handleSetCheckBoxStatus.bind(this);
    this.state = {
      checkedTrueClass: null,
      checkedFalseClass: null,
      iconSize: null,
      checked: false,
      disables: false,
      color: null,
      value:null,
      text: undefined
    }
  }

  componentDidMount() {
    let checkedTrueClass = this.setCheckBoxType(this.props.iconType).checkedTrueClass,
    checkedFalseClass = this.setCheckBoxType(this.props.iconType).checkedFalseClass,
    color = this.setCheckBoxIconColor(this.props.color),
    checked = this.setCheckBoxChecked(this.props.checked),
    disabled = this.setCheckBoxDisabled(this.props.disabled),
    text = this.setCheckBoxtext(this.props.text),
    iconSize = this.setCheckBoxIconSize(this.props.iconSize);
    color = disabled ? "#aaaaaa" : color;
    this.setState({
      checkedTrueClass: checkedTrueClass,
      checkedFalseClass: checkedFalseClass,
      iconSize: iconSize,
      checked: checked,
      disabled: disabled,
      color: color,
      value:this.props.value,
      text: text
    })

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color && !nextProps.disabled) {
      let color = this.setCheckBoxIconColor(nextProps.color);
      this.setState({
        color: color
      })
    }
    if (this.props.checked !== nextProps.checked) {
      let checked = this.setCheckBoxChecked(nextProps.checked);
      this.setState({
        checked: checked
      })
    }
    if (this.props.disabled !== nextProps.disabled) {
      let disabled = this.setCheckBoxDisabled(nextProps.disabled);
      this.setState({
        checked: disabled
      })
    }
    if (this.props.text !== nextProps.text) {
      let text = this.setCheckBoxtext(nextProps.text);
      this.setState({
        text: text
      })
    }
    if (this.props.iconSize !== nextProps.iconSize) {
      let iconSize = this.setCheckBoxIconSize(nextProps.iconSize);
      this.setState({
        iconSize: iconSize
      })
    }
  }

  setCheckBoxType(iconType) {
    let res = {};
    switch (iconType) {
      case 'default':
        res.checkedTrueClass = "icon-radio";
        res.checkedFalseClass = "icon-circle";
        break;
      case 'circle-hollow':
        res.checkedTrueClass = "icon-circle-success";
        res.checkedFalseClass = "icon-circle";
        break;
      case 'circle-solid':
        res.checkedTrueClass = "icon-checkbox1";
        res.checkedFalseClass = "icon-circle";
        break;
      case 'heart':
        res.checkedTrueClass = "icon-heart";
        res.checkedFalseClass = "icon-heart1";
        break;
      default:
        res.checkedTrueClass = "icon-checkbox-checked";
        res.checkedFalseClass = "icon-checkbox3";
    }

    return res;
  }

  setCheckBoxIconColor(color) {
    return color !== undefined ? color : undefined;
  }

  setCheckBoxChecked(status) {
    return status !== undefined ? status : false;
  }

  setCheckBoxDisabled(disabled) {
    return disabled !== undefined ? disabled : false;
  }

  setCheckBoxIconSize(size) {
    return size !== undefined ? size : "16px";
  }

  setCheckBoxtext(text) {
    return text !== undefined ? text : undefined;
  }

  handleSetCheckBoxStatus(e) {
    if (this.props.disabled) {
      return false;
    }
    const value =  e.target.value;
    if(!this.state.checked){
      if (this.props.callback) {
        this.props.callback(value);
      }
      this.setState({
        checked: !this.state.checked,
      })
    }

  }

  render() {
    const {checked, checkedTrueClass, checkedFalseClass, color,value, text, iconSize} = this.state;
    return (
    <div className="radio-ui">
      <label>
        <i
        className={checked ? `iconfont ${checkedFalseClass} checked-false` : `iconfont ${checkedFalseClass} checked-true`}
        style={{color: color}}></i>
        <i
        className={checked ? `iconfont ${checkedTrueClass} checked-true` : `iconfont ${checkedTrueClass} checked-false`}
        style={{color: color, marginLeft: `-${iconSize}`}}></i>
        <span className="checkbox-info">{text}</span>
        <input type="radio" name={this.props.name} checked={checked} defaultValue={value} onChange={this.handleSetCheckBoxStatus}/>
      </label>

    </div>
    )
  }
}

RadioUI.PropTypes = {
  iconType: React.PropTypes.string,
  color: React.PropTypes.string,
  iconSize: React.PropTypes.string,
  callback: React.PropTypes.func,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

RadioUI.defaultProps = {
  iconType: 'default', //default  circle-hollow circle-solid
  callback: undefined,
  color: "rgb(0,0,0)",
  iconSize: "16px",
  checked: undefined,
  disabled: undefined,
  value: undefined,
  text: undefined
};