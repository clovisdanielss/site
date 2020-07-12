import React, { Component } from "react";
import Modal from "react-modal";

class ModalDefault extends Component {
  render() {
    let length = this.props.text ? this.props.text.length : 0;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel={this.props.contentLabel}
      >
        <div>
          <h1>{this.props.contentLabel}</h1>
        </div>
        <hr />
        {/* Campo opicional, descreve como a formatação do texto deve ser */}
        {this.props.description ? (
          <label>{this.props.description}</label>
        ) : null}
        {this.props.isImage ? (
          <div>
            <label>File:</label>
            <br />
            <input type="file" onChange={this.props.onChangeSrc}></input>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div
                className="input-group mb-3"
                style={
                  length > 50
                    ? {
                        height: "300px",
                      }
                    : null
                }
              >
                <div className="input-group-prepend">
                  <label className="input-group-text">Text:</label>
                </div>
                <div
                  style={{
                    flex: "1 1 auto",
                  }}
                >
                  <textarea
                    value={this.props.text}
                    onChange={this.props.onChangeValue}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            className="butn butn-bg ml-0 btn-block"
            onClick={this.props.onRequestClose}
          >
            <span>Salvar</span>
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalDefault;
