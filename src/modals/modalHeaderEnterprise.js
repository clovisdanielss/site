import React, { Component } from "react";
import Modal from "react-modal";

class ModalHeaderEnterprise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfSentences: props.arrayOfSentences,
      selectedIndex: 0,
    };

    this.onSelect = this.onSelect.bind(this);

    this.onRemoveView = this.onRemoveView.bind(this);

    this.onAddView = this.onAddView.bind(this);

    this.onRequestClose = this.onRequestClose.bind(this);

    this.onChangeText = this.onChangeText.bind(this)
  }

  onSelect(e) {
    this.setState({ selectedIndex: e.target.value });
  }

  onRemoveView(e) {
    let arrayOfSentences = this.state.arrayOfSentences;
    arrayOfSentences.splice(this.state.selectedIndex, 1);
    this.setState({
      arrayOfSentences: arrayOfSentences,
      selectedIndex: 0,
    });
  }

  onAddView(e) {
    let arrayOfSentences = this.state.arrayOfSentences;
    arrayOfSentences.push(["", "", ""]);
    this.setState({
      arrayOfSentences,
    });
  }

  onRequestClose(e) {
    e.persist()
    this.props.setParentState(this.state.arrayOfSentences);
    this.props.onRequestClose(e);
  }

  onChangeText(e){
    let index = e.target.getAttribute("data-index")
    let arrayOfSentences = this.state.arrayOfSentences
    arrayOfSentences[this.state.selectedIndex][index] = e.target.value
    this.setState({
      arrayOfSentences,
    })
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
        {/* Campo opicional, descreve como a formatação do texto deve ser */}
        {this.props.description ? (
          <label>{this.props.description}</label>
        ) : null}

        <div className="container">
          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Selecione a tela
                </label>
              </div>
              <select className="custom-select" id="inputGroupSelect01">
                {this.state.arrayOfSentences.map((sentences, index) => (
                  <option
                    value={index}
                    key={index}
                    selected={index === this.state.selectedIndex}
                    onClick={this.onSelect}
                  >
                    Tela {index+1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            {this.state.arrayOfSentences.length === 0
              ? null
              : this.state.arrayOfSentences[this.state.selectedIndex].map(
                  (sentence, index) => {
                    return (
                      <div className="input-group mb-3" key={index}>
                        <div className="input-group-prepend">
                          <label className="input-group-text">
                            Texto {index+1} :
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
                            value={sentence}
                            data-index={index}
                            onChange={this.onChangeText}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
            <div className="col-md-6 p-0 pr-1">
              <button
                className="butn butn-bg ml-0 btn-block"
                onClick={this.onRemoveView}
              >
                <span>Remover Tela</span>
              </button>
            </div>
            <div className="col-md-6 p-0 pl-1">
              <button
                className="butn butn-bg ml-0 btn-block"
                onClick={this.onAddView}
              >
                <span>Adicionar Tela</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Figura Background:</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={this.props.onChangeSrc}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="butn butn-bg ml-0 btn-block"
            onClick={this.onRequestClose}
          >
            <span>Salvar</span>
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalHeaderEnterprise;
