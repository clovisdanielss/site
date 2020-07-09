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
        <div>
          <label>Skill:</label>
          <input
            className="my-modal-textarea"
            value={this.props.skill.name}
            onChange={this.props.onChangeName}
            data-id={this.props.skill.id}
          />
        </div>
        <div>
          <label>Value:</label>
          <input
            className="my-modal-textarea"
            value={this.props.skill.value}
            onChange={this.props.onChangeValue}
            data-id={this.props.skill.id}
          />
        </div>
        <div>
          <button
            className="my-modal-button"
            onClick={this.props.onRequestClose}
          >
            Save!
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

export default ModalSkill