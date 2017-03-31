import React from 'react'
import notification from '../../common/notification/'
// console.log(notification.info())

class Hello extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    }
    // setInterval(this.loop(),1000)
  }

  componentDidMount() { // 分量输出后挂机运行已经被渲染到了DOM
    this.timerID = setInterval(
    () => this.tick(),
    1000
    );
    // console.log(this.props.location)
  }

  componentWillUnmount() { //分量销毁之前
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()

    });
    // console.log(this.state.date)
  }

  render() {
    return (
    <div>
      <h1>现在时间： {this.state.date.toLocaleTimeString()}</h1>
      <button onClick={() => notification.primary('属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会', {
        duration: 5
      })}>primary click me
      </button>
      <br/>
      <button onClick={() => notification.info('属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会', {
        duration: 5
      })}>click me
      </button>
      <br/>
      <button onClick={() => notification.error('属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会', {
        duration: 5
      })}>error click me
      </button>
      <br/>
      <button onClick={() => notification.danger('属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会', {
        duration: 5
      })}>danger click me
      </button>
      <br/>
      <button onClick={() => notification.success('属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会', {
        duration: 5
      })}>success click me
      </button>
    </div>
    )
  }

}

module.exports = Hello;