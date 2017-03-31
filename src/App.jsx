import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Headpiece from './Headpiece.jsx'
import Navigation from './Navigation.jsx'
import navigations from "./config/navigations.js"
import './common/styles/index.less';

// import * as test from './store/actions/test.jsx'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.navTimeout = null;
    this.onWindowResize = this.onWindowResize.bind(this);
    this.navigationCallack = this.navigationCallack.bind(this);
    this.state = {
      nowNavigation:"Notification"
    }
  }

  onWindowResize() {
    clearTimeout(this.navTimeout);
    this.navTimeout = setTimeout(() => {
      // const navigationHeight = window.innerHeight + "px";
      // this.setState({
      //     navigationHeight: navigationHeight
      // });
    }, 100)

  }

  componentDidMount() {
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize)
  }

  componentWillMount() {
    window.removeEventListener("resize", this.onWindowResize)
  }
  navigationCallack(callbackData){
    this.setState({
      nowNavigation:callbackData
    })
  }

  render() {
    return (
    <div className="system-section">
      <section className="system-headpiece">
        <Headpiece nowNavigation={this.state.nowNavigation}></Headpiece>
      </section>
      <div className="system-main-page">
        {this.props.children}
        <div className="system-bottom">
          <p>This is an example of learning reactjs </p>
          <p>More examples <a href="https://github.com/DWYW" target="_blank"><i className="iconfont icon-github"></i></a></p>
        </div>
      </div>

      <aside className="system-navigation-section">
        <Navigation navigations={navigations} navigationCallback={this.navigationCallack}></Navigation>
      </aside>
    </div>

    )

  }

}

// function mapStateToProps(state) {
//   return {
//      num: state.test
//   }
// }

// module.exports=connect( mapStateToProps,test)(App)
module.exports = App;
