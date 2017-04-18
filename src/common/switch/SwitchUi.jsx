import React from 'react'
import './SwitchUi.less'

export default class MySwitch extends React.Component {
  constructor(props) {
    super(props);
    this.switchChange = this.switchChange.bind(this);
    this.state = {
      size: 'normal',
      open: false,
      disabled: false,
      callback: null
    }
  }

  componentDidMount() {
    const size = this.props.size ? this.props.size === 'normal' || this.props.size === 'smaller' ? this.props.size : 'normal' : 'normal';
    const open = this.props.open ? this.props.open === true || this.props.open === "true" ? true : false : false;
    const disabled = this.props.disabled ? this.props.disabled === true || this.props.disabled === "true" ? true : false : false;
    const callback = this.props.callback ? this.props.callback : null;
    this.setState({
      size: size,
      open: open,
      disabled: disabled,
      callback: callback
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && nextProps.open !== this.props.open) {
      const open = nextProps.open === true || nextProps.open === "true" ? true : false;
      this.setState({
        open: open
      })
    }
    if (nextProps.disabled && nextProps.disabled !== this.props.disabled) {
      const disabled = nextProps.disabled === true || nextProps.disabled === "true" ? true : false;
      this.setState({
        disabled: disabled
      })
    }

  }

  switchChange(e) {
    if (this.state.disabled) {
      return false;
    }
    if (e.target.checked) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      })
    }
    if (this.state.callback) {
      this.state.callback({value: e.target.checked})
    }
  }

  render() {
    return (
    <div className={
      this.state.open ?
      this.state.size === 'smaller' ? "SwitchUi smaller active" : "SwitchUi active" :
      this.state.size === 'smaller' ? "SwitchUi smaller" : "SwitchUi"
    } disabled={this.state.disabled}>
      <div className="SwitchUi-BG"></div>
      <label className="SwitchUi-Btn">
        <input type="checkbox" checked={this.state.open} onChange={this.switchChange}/>
      </label>
    </div>

    )
  }
}