import React from 'react';
import {hashHistory, browserHistory} from 'react-router'

export default class Navigation extends React.Component {
  static propTypes = {
    navigations: React.PropTypes.object,
    navigationCallback:React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.navToggle = this.navToggle.bind(this);
    this.routeSkip = this.routeSkip.bind(this);
    this.navDataInit = this.navDataInit.bind(this);
    this.setValById = this.setValById.bind(this);
    this.state = {
      navigations: [],
      selectedRoute: null,
      selectedItemID: null
    }
  }

  componentWillMount() {
    let navigations = this.navDataInit(this.props.navigations.items);
    this.setState({
      navigations: navigations,
    });
  }

  navDataInit(datas, parentKey = "0", level = 0) {
    datas.map((data, key) => {
      let copy = data;
      data.isSelected = false;
      data._self_id = `${parentKey}-${key}`;// add unique key
      if (data.children) {
        if (data.children.length > 0) {
          data.childrenShow = false;
          data.children = this.navDataInit(data.children, `${parentKey}-${key}`, level + 1);
        }
      }
      return data;
    });
    return datas;
  }

  navToggle(e, id, status) {
    e.preventDefault();
    let  navigationsData= this.setValById(this.state.navigations, id, "childrenShow", !status);
    this.setState({
      navigations: navigationsData.datas
    })

  }

  routeSkip(e, id, status, path, query) {
    e.preventDefault();

    let seletcedItemID = this.state.selectedItemID;
    let navigationsData=null;
    if (!status) {
      if (seletcedItemID === null) {
        navigationsData = this.setValById(this.state.navigations, id, "isSelected", !status);
        seletcedItemID = id;
      } else {
        if (seletcedItemID !== id) {
          navigationsData = this.setValById(this.state.navigations, seletcedItemID, "isSelected", false);
          navigationsData = this.setValById(navigationsData.datas, id, "isSelected", !status);
          seletcedItemID = id;
        } else {
          return false;
        }
      }
      hashHistory.push({
        pathname: path,
        query: query,
        state:location
      })
    } else {
      return false;
    }
    this.props.navigationCallback(navigationsData.terminal.title);
    this.setState({
      navigations: navigationsData.datas,
      selectedItemID: seletcedItemID
    })


  }

  setValById(datas, id, key, val) {
    let indexed = id.split("-");
    indexed.shift();
    let terminal = datas;
    for (let i = 0; i < indexed.length; i++) {
      terminal = i === 0 ? terminal[indexed[i]] : terminal.children[indexed[i]];
    }
    terminal[key] = val;
    return {
      datas,
      terminal
    };
  }

  render() {
    return (
    <div className="system-navigation-page">
      {this.state.navigations.map((item, key) =>
      <div key={key} className={item.childrenShow ? "system-navigation-item toggled" : "system-navigation-item"}>
        <div className={item.isSelected ? "system-navigation-item-title active" : "system-navigation-item-title"}>
          <div className="system-navigation-item-title-content"
               onClick={item.children ? (e) => this.navToggle(e, item._self_id, item.childrenShow) : (e) => this.routeSkip(e, item._self_id, item.isSelected, item.path, item.query)}>
            <a>{item.title}</a>
          </div>
          {item.children &&
          <i className="iconfont icon-right"></i>
          }
        </div>
        {item.children &&
        <ul className="system-navigation-item-children"
            style={{height: item.childrenShow ? `${this.state.navigations[key].children.length * 40}px` : `0px`}}>
          {
            item.children.map((child) =>
            <li key={child.title} className={child.isSelected ? "active" : ""}
                onClick={child.children ? (e) => this.navToggle(e, child._self_id, child.childrenShow) : (e) => this.routeSkip(e, child._self_id, child.isSelected, child.path, child.query)}>{child.title}</li>
            )
          }
        </ul>
        }
      </div>
      )}
    </div>
    );
  }
}