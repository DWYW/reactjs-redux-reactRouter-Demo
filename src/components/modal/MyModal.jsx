import React from 'react'
import {alert,confirm} from '../../common/modal/ModalUi.jsx'

export default class myModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test'
    }
  }

  alertModal(){
    alert({
      title:"测试",
      textAlign:"center",
      content:"这是一段测试内容",
      callback:function(){
        console.log('alert callback console')
      }
    })
  }
  confirmModal(){
    confirm({
      content:"这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容这是一段测试内容",
      callback:function(){
        console.log('confirm callback console')
      },
      cancelCallback:function(){
        console.log('confirm cancel callback console')
      }
    })
  }

  render() {
    return (
    <div className="my-Modal">
      <div className="pannel">
        <div className="pannel-title">{`alert(options),confirm(options)`}</div>
        <div className="pannel-content">
          <p className="bold">ATTRIBUTE</p>
          <ul>
            <li>width={`{width}`} String,modal的宽度，默认（300px）</li>
            <li>title={`{title}`} String,modal的title内容</li>
            <li>textAlign={`{left|center|right}`} String,modal的内容的对齐方式 （默认为left）</li>
            <li>content={`{content}`} String,modal的内容文字</li>
            <li>callback={`{callback}`} Function,回调函数</li>
            <li>cancelCallback={`{cancelCallback}`} Function,confirm取消时的回调函数</li>
          </ul>

        </div>
      </div>

      <div className="pannel">
        <div className="pannel-title">EXAMPLE</div>
        <div className="pannel-content">
          <button className="btn default" onClick={this.alertModal}>alert modal</button>
          <button className="btn default" onClick={this.confirmModal}>confirm modal</button>
        </div>
      </div>

    </div>
    )
  }
}