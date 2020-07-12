import React, { Component } from "react";
import Modal from "react-modal";

class ModalNavbar extends Component {
  render() {
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
          <div className="container">
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Logo Imagem Clara:</span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    onChange={this.props.onChangeSrc}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Escolha o arquivo
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Logo Imagem Escura:</span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile02"
                    onChange={this.props.onChangeSrcAlt}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile02"
                  >
                    Escolha o arquivo
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text"
                    style={{
                      width: "100px",
                    }}
                  >
                    Text:
                  </label>
                </div>
                <div
                  style={{
                    flex: "1 1 auto",
                  }}
                >
                  <textarea
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    value={this.props.text}
                    onChange={this.props.onChangeValue}
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

export default ModalNavbar;
