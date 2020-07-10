import React, { Component } from "react";
import Modal from "react-modal";


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

export default ModalClient;
