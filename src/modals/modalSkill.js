import React, { Component } from "react";
import Modal from "react-modal";

class ModalSkill extends Component {
  constructor(props) {
    super(props);
    this.onAddAndClose = this.onAddAndClose.bind(this);
  }

  onAddAndClose() {
    this.props.onAdd();
    this.props.onRequestClose();
  }

  render() {
    if (!this.props.skill) {
      return null;
    }
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
                  Skill:
                </label>
              </div>

              <input
                className="form-control"
                value={this.props.skill.name}
                onChange={this.props.onChangeName}
                data-id={this.props.skill.id}
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
                  Value:
                </label>
              </div>

              <input
                className="form-control"
                value={this.props.skill.value}
                onChange={this.props.onChangeValue}
                data-id={this.props.skill.id}
              />
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
        {/* <div>
          <button
            data-id={this.props.skill.id}
            className="my-modal-button"
            onClick={this.onRemoveAndClose}
          >
            Remover!
          </button>
        </div> */}
        {/* 
        Não é necessário, visto que foi adicionado outro botão fora do modal.
        <div>
          <button className="my-modal-button" onClick={this.onAddAndClose}>
            Adicionar Outra Skill
          </button>
        </div> */}
      </Modal>
    );
  }
}

export default ModalSkill;
