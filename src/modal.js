import React, { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

class ModalDefault extends Component {
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
          <div>
            <label>File:</label>
            <br/>
            <input type="file" onChange={this.props.onChangeSrc}></input>
          </div>
        ) : (
          <div>
            <label>Text:</label>
            <textarea
              className="my-modal-textarea"
              value={this.props.text}
              onChange={this.props.onChangeValue}
            />
          </div>
        )}
        <div>
          <button
            className="my-modal-button"
            onClick={this.props.onRequestClose}
          >
            Save!
          </button>
        </div>
      </Modal>
    );
  }
}

class ModalHeader extends Component {
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

        <div>
          <label>Text:</label>
          <textarea
            className="my-modal-textarea"
            value={this.props.text}
            onChange={this.props.onChangeValue}
          />
        </div>
        <div>
          <label>File:</label>
          <br/>
          <input type="file" onChange={this.props.onChangeSrc}></input>
        </div>
        <div>
          <button
            className="my-modal-button"
            onClick={this.props.onRequestClose}
          >
            Save!
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
        <div>
          <label>Title:</label>
          <input
            className="my-modal-textarea"
            value={this.props.work.name}
            onChange={this.props.onChangeName}
          />
        </div>
        <div>
          <label>Subtitle:</label>
          <input
            className="my-modal-textarea"
            value={this.props.work.subtitle}
            onChange={this.props.onChangeSubtitle}
          />
        </div>
        <div>
          <label>Filter Tag:</label>
          <input
            className="my-modal-textarea"
            value={this.props.work.filter}
            onChange={this.props.onChangeFilter}
          />
        </div>
        <div>
          <label>File:</label>
          <br/>
          <input
            className="my-modal-textarea"
            type="file"
            onChange={this.props.onChangeSrc}
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
      </Modal>
    );
  }
}

class ModalClient extends Component {
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
        <div>
          <label>Title:</label>
          <input
            className="my-modal-textarea"
            value={this.props.client.title}
            onChange={this.props.onChangeTitle}
          />
        </div>
        <div>
          <label>Subtitle:</label>
          <input
            className="my-modal-textarea"
            value={this.props.client.subtitle}
            onChange={this.props.onChangeSubtitle}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="my-modal-textarea"
            value={this.props.client.text}
            onChange={this.props.onChangeText}
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
      </Modal>
    );
  }
}

export { ModalDefault, ModalSkill, ModalWork, ModalClient, ModalHeader };
