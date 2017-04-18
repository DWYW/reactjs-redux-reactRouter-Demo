import React from 'react'
import reactDOM from 'react-dom'
import "./ModalUi.less"

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.addModal = this.addModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.resetModal = this.resetModal.bind(this);
    this.confirmConfirm = this.confirmConfirm.bind(this);
    this.confirmCancel = this.confirmCancel.bind(this);
    this.state = {
      type: null,
      width: '300px',
      title: null,
      textAlign: 'left',
      content: null,
      callback: null,
      cancelCallback: null,
      enter: false,
      outer: false,
      marginTop: null
    }
  }

  resetModal() {
    this.setState({
      type: 'pc',
      width: '500px',
      title: null,
      textAlign: 'left',
      content: null,
      callback: null,
      cancelCallback: null,
      enter: false,
      outer: false,
      marginTop: null
    })
  }

  hideModal(cb) {
    this.setState({
      outer: true
    });
    setTimeout(() => {
      cb()
    }, 300)
  }

  addModal(options) {
    this.setState({
      type: options.type,
      width: options.width,
      title: options.title,
      textAlign: options.textAlign,
      content: options.content,
      callback: options.callback,
      cancelCallback: options.cancelCallback
    });
    setTimeout(() => {
      const marginTop = (0 - document.querySelector(".modal-container").offsetHeight / 2) + "px"
      this.setState({
        enter: true,
        marginTop: marginTop
      })

    }, 10)
  }


  confirmConfirm() {
    this.hideModal(() => {
      if (this.state.callback) {
        this.state.callback();
      }
      this.resetModal()

    })
  }

  confirmCancel() {
    this.hideModal(() => {
      if (this.state.cancelCallback) {
        this.state.cancelCallback();
      }
      this.resetModal()
    })
  }

  render() {
    return (
    <div className="s-modalComponent">
      { this.state.content &&
      <div className="mask"></div>
      }
      { this.state.content &&
      <div className="modal-container">
        <div className={this.state.enter && !this.state.outer ? 'modal-content modal-enter' : 'modal-content'}
             style={{width: this.state.width, marginTop: this.state.marginTop}}>
          {this.state.title &&
          <div className="modal-title">{this.state.title}</div>
          }
          <div className="modal-body" style={{textAlign: this.state.textAlign}}>{this.state.content}</div>

          {
            this.state.type === 'alert' ?
            (
            <div className="modal-footer">
              <div className="modal-confirm" onClick={this.confirmConfirm}>确定</div>
            </div>
            ) : (
            <div className="modal-footer">
              <div className="modal-cancel half" onClick={this.confirmCancel}>取消</div>
              <div className="modal-confirm half" onClick={this.confirmConfirm}>确定</div>
            </div>
            )
          }

        </div>
      </div>
      }
    </div>

    )
  }
}

const modalElement = document.createElement("div");
document.body.appendChild(modalElement);
const modalRoot = reactDOM.render(
<Modal></Modal>,
modalElement
);


function create(type) {
  return (paras = {}) => {
    paras.type = type ? type : 'alert';
    paras.width = paras.width ? paras.width : "300px";
    paras.title = paras.title ? paras.title : null;
    paras.textAlign = paras.textAlign ? paras.textAlign : null;
    paras.content = paras.content ? paras.content : "";
    paras.callback = paras.callback ? paras.callback : null;
    paras.cancelCallback = paras.cancelCallback ? paras.cancelCallback : null;
    modalRoot.addModal(paras);
  }
}

module.exports = {
  alert: create("alert"),
  confirm: create("confirm")
};