import React from 'react'
import './CheckBoxUI.less'

export default class CheckBoxUI extends React.Component {
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
      infoText: undefined
    }
  }

  componentDidMount() {
    let checkedTrueClass = this.setCheckBoxType(this.props.iconType).checkedTrueClass,
    checkedFalseClass = this.setCheckBoxType(this.props.iconType).checkedFalseClass,
    color = this.setCheckBoxIconColor(this.props.color),
    checked = this.setCheckBoxChecked(this.props.checked),
    disabled = this.setCheckBoxDisabled(this.props.disabled),
    infoText = this.setCheckBoxInfoText(this.props.infoText),
    iconSize = this.setCheckBoxIconSize(this.props.iconSize);
    color = disabled ? "#aaaaaa" : color;
    this.setState({
      checkedTrueClass: checkedTrueClass,
      checkedFalseClass: checkedFalseClass,
      iconSize: iconSize,
      checked: checked,
      disabled: disabled,
      color: color,
      infoText: infoText
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
    if (this.props.infoText !== nextProps.infoText) {
      let infoText = this.setCheckBoxInfoText(nextProps.infoText);
      this.setState({
        infoText: infoText
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
        res.checkedTrueClass = "icon-checkbox-checked";
        res.checkedFalseClass = "icon-checkbox3";
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

  setCheckBoxInfoText(infoText) {
    return infoText !== undefined ? infoText : undefined;
  }

  handleSetCheckBoxStatus(e) {
    if (this.props.disabled) {
      return false;
    }
    const value = e.target.type === 'checkbox' || e.target.type === 'radio' ? e.target.checked : e.target.value;
    if (this.props.callback) {
      this.props.callback(value);
    }
    this.setState({
      checked: value,
    })

  }

  render() {
    const {checked, checkedTrueClass, checkedFalseClass, color, infoText, iconSize} = this.state;
    return (
    <div className="checkbox-ui">
      <label>
        <i
        className={checked ? `iconfont ${checkedFalseClass} checked-false` : `iconfont ${checkedFalseClass} checked-true`}
        style={{color: color}}></i>
        <i
        className={checked ? `iconfont ${checkedTrueClass} checked-true` : `iconfont ${checkedTrueClass} checked-false`}
        style={{color: color, marginLeft: `-${iconSize}`}}></i>
        <span className="checkbox-info">{infoText}</span>
        <input type="checkbox" checked={checked} onChange={this.handleSetCheckBoxStatus}/>
      </label>

    </div>
    )
  }
}

CheckBoxUI.PropTypes = {
  iconType: React.PropTypes.string,
  color: React.PropTypes.string,
  iconSize: React.PropTypes.string,
  callback: React.PropTypes.func,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  infoText: React.PropTypes.string
};

CheckBoxUI.defaultProps = {
  iconType: 'default', //default  circle-hollow circle-solid
  callback: undefined,
  color: "rgb(0,0,0)",
  iconSize: "16px",
  checked: undefined,
  disabled: undefined,
  infoText: undefined
};
