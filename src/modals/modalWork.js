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

export default ModalWork
