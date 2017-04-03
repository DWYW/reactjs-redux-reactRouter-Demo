import React from 'react'
import RadioUI from './RadioUI.jsx'
export default class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleRadioCallback = this.handleRadioCallback.bind(this);
    this.state = {
      checkedIndex: null,
      value: null,
      align:"left",
      vertical:'inline'
    }
  }

  componentDidMount() {
    const vertical= this.props.vertical!=="inline"&&this.props.vertical!=="block"?"inline":this.props.vertical;
    const align = this.props.align!=="left"&&this.props.align!=="center"&&this.props.align!=="right"?"left":this.props.align;
    this.setState({
      checkedIndex: this.props.defaultChecked,
      value: this.props.radios[this.props.defaultChecked],
      align:align,
      vertical:vertical
    })
    if(this.props.defaultChecked){
      if(this.props.callback){
        this.props.callback(this.props.radios[this.props.defaultChecked].value)
      }
    }
  }

  componentWillUnmount() {

  }

  handleRadioCallback(res) {
    const {radios} = this.props;
    radios.forEach((radio, key) => {
      if (res == radio.value) {
        if(this.props.callback){
          this.props.callback(res)
        }
        this.setState({
          checkedIndex: key,
          value: res
        })
      }
    })
  }

  render() {
    const {checkedIndex,align,vertical} = this.state;
    const {radios, name,} = this.props;
    const itemStyle=vertical==="inline"?{"display":"inline-block","verticalAlign":"middle"}:{dispaly:"block"};
    return (
    <div className="RadioGroup" style={{textAlign:align}}>
      {
        Object.keys(radios).map((key) => {
          const radio = radios[key];
          return (
            <div key={key} className="RadioGroup-item" style={itemStyle}>
              <RadioUI name={name} iconType={radio.iconType} text={radio.text} value={radio.value} iconSize={radio.iconSize} disabled={radio.disabled} color={radio.color} checked={key == checkedIndex}
                       callback={this.handleRadioCallback}></RadioUI>
            </div>

          )
        })
      }
    </div>
    )
  }
}