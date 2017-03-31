import React from 'react';

export default class Headpiece extends React.Component {
  static propTypes = {
    nowNavigation: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.timeTick=null;
    this.tick=this.tick.bind(this);
    this.state={
    	time:new Date()
		}
  }

  componentDidMount(){
  	this.timeTick=setInterval(()=>{this.tick()},1000);
	}

  tick(){
  	this.setState({
      time:new Date()
		})
	}



  render() {
    return (
      <div className="w100 h100">
      	<div className="system-headpiece-middle">
      		<div className="system-headpiece-middle-inner">

      		</div>
      	</div>
      	<div className="system-headpiece-left">
      		<p>
      			<i className="iconfont icon-react">
	      			<span className="text">React</span>
	      		</i>
      		</p>
      		<p>
      			A DEMO FOR REACTJS
      		</p>
      	</div>
      	<div className="system-headpiece-right">
      		<div className="qrcode-section text-right">
						<i className="iconfont icon-time">
							<span>{this.state.time.toLocaleString()}</span>
						</i>
						<div className="nowNavigation">{this.props.nowNavigation}</div>
      		</div>
      	</div>
      </div>
    );
  }
}
