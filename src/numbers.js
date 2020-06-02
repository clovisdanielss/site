import React, { Component } from "react";
import ComponentWithModal from "./componentwithmodal";
import { ModalText } from "./modal";

class Number extends Component {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
    this.onRemoveNumber = this.onRemoveNumber.bind(this);
  }

  /**
   * Define um number para atualizar alguma propriedade do
   * number em questão, depois abre o modal.
   */
  defineAndOpenModal(e) {
    if (!this.props.onAddNumber) {
      const selector = e.target.getAttribute("data-state");
      this.props.setSelectors(this.props.index, selector);
      this.props.openModal();
    }
  }

  /**
   * Remove algum number para o dado índice.
   * Usado pelo 'x'
   */
  onRemoveNumber() {
    this.props.onRemoveNumber(this.props.index);
  }

  render() {
    const removeTrigger = this.props.readOnly ? null : this.props.onAddNumber ? null : (
        <span className=" my-icon" onClick={this.onRemoveNumber}>
          <i className="fas fa-times"></i>
        </span> //
      );
    return (
      <div className="col-lg-3 col-md-6" onClick={this.props.onAddNumber}>
        {removeTrigger}
        <div className="item text-center mb-md50">
          <span className="icon" data-state="icon" onClick={this.defineAndOpenModal}>
            <i className={this.props.number.icon} data-state="icon"></i>
          </span>
          <h3 onClick={this.defineAndOpenModal} data-state="value" className={this.props.classNameHighlight("counter")}>
            {this.props.number.value}
          </h3>
          <h6 onClick={this.defineAndOpenModal} data-state="name" className={this.props.classNameHighlight()}>
            {this.props.number.name}
          </h6>
        </div>
      </div>
    );
  }
}

class Numbers extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      selector: "",
      selectorIndex: 0,
      modalIsOpen: false,
      numbers: [
        {
          icon: "fas fa-trophy",
          name: "awards achieved",
          value: 168,
        },
        {
          icon: "fas fa-layer-group",
          name: "done projects",
          value: "946",
        },
      ],
    };

    this.onRemoveNumber = this.onRemoveNumber.bind(this);
    this.onAddNumber = this.onAddNumber.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
  }

  /**
   * Remove alguma célula da entidade número
   */
  onRemoveNumber(index) {
    this.state.numbers.splice(index, 1);
    let numbers = this.state.numbers;
    this.setState({ numbers: numbers });
  }

  /**
   * Adiciona uma nova célula da entidade Número
   */
  onAddNumber() {
    let numbers = this.state.numbers;
    numbers.push({
      icon: "fas fa-indefinido",
      name: "indefinido",
      value: "100",
    });
    this.setState({ numbers: numbers });
  }

  /**
   * Modifica algum atributo de alguma entidade Número.
   */
  onChangeNumber(e) {
    this.state.numbers[this.state.selectorIndex][this.state.selector] =
      e.target.value;
    let numbers = this.state.numbers;
    this.setState({ numbers: numbers });
  }

  render() {
    return (
      <div
        className="numbers section-padding bg-img bg-fixed"
        data-overlay-dark="7"
        data-background="img/bg-counter.jpg"
      >
          <ModalText
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Number"
          onChangeValue={this.onChangeNumber}
          text={
            this.state.numbers.length === 0
              ? ""
              : this.state.numbers[this.state.selectorIndex][
                  this.state.selector
                ]
          }
        />
        <div className="container">
          <div className="row">
            {this.state.numbers.map((number, key) => (
              <Number
                number={number}
                key={key}
                index={key}
                onChangeNumber={this.onChangeNumber}
                onRemoveNumber={this.onRemoveNumber}
                classNameHighlight={this.classNameHighlight}
                openModal={this.openModal}
                setSelectors={this.setSelectors}
                readOnly={this.props.readOnly}
              />
            ))}
            {this.props.readOnly ? null : (
              <Number
                number={{
                  icon: "fas fa-plus",
                  name: "Adicionar",
                  value: "000",
                }}
                classNameHighlight={this.classNameHighlight}
                onAddNumber={this.onAddNumber}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Numbers
