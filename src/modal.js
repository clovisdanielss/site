import React, { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

class ModalText extends Component {
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
        {this.props.description ? (
          <label>{this.props.description}</label>
        ) : null}
        <div>
          <textarea
            className="my-modal-textarea"
            value={this.props.text}
            onChange={this.props.onChangeValue}
          />
        </div>
        <div>
          <button
            className="my-modal-button"
            onClick={this.props.onRequestClose}
          >
            Salvar!
          </button>
        </div>
      </Modal>
    );
  }
}

class ModalSkill extends Component {
  constructor(props) {
    super(props);
    this.onAddAndClose = this.onAddAndClose.bind(this);
    this.onRemoveAndClose = this.onRemoveAndClose.bind(this);
  }

  onAddAndClose() {
    this.props.onAdd();
    this.props.onRequestClose();
  }

  onRemoveAndClose(e) {
    this.props.onRemove(e);
    this.props.onRequestClose();
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
        <div>
          <input
            className="my-modal-textarea"
            value={this.props.skill.name}
            onChange={this.props.onChangeName}
            data-id={this.props.skill.id}
          />
        </div>
        <div>
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
            Salvar!
          </button>
        </div>
        <div>
          <button
            data-id={this.props.skill.id}
            className="my-modal-button"
            onClick={this.onRemoveAndClose}
          >
            Remover!
          </button>
        </div>
        <div>
          <button className="my-modal-button" onClick={this.onAddAndClose}>
            Adicionar Outra Skill
          </button>
        </div>
      </Modal>
    );
  }
}

export { ModalText, ModalSkill };