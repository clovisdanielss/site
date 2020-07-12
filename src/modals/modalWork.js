import React, { Component } from "react";
import Modal from "react-modal";

class ModalWork extends Component {
  constructor(props) {
    super(props);
  }

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
                  Título:
                </label>
              </div>

              <input
                className="form-control"
                value={this.props.work.name}
                onChange={this.props.onChangeName}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  style={{
                    width: "100px",
                  }}
                >
                  Subtítulo:
                </label>
              </div>

              <input
                className="form-control"
                value={this.props.work.subtitle}
                onChange={this.props.onChangeSubtitle}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  style={{
                    width: "100px",
                  }}
                >
                  Filtro:
                </label>
              </div>

              <input
                className="form-control"
                value={this.props.work.filter}
                onChange={this.props.onChangeFilter}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Arquivo:</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={this.props.onChangeSrc}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Escolha o arquivo
                </label>
              </div>
            </div>
          </div>
        </div>
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

export default ModalWork;
