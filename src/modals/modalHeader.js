import React, { Component } from "react";
import Modal from "react-modal";

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

export default ModalHeader