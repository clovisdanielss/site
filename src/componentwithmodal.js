import React, { Component } from "react";
import { post } from "./loaddata";
/**
 * Todo editável do sistema herda desta classe, onde:
 * existe um selector para selecionar propriedades de objetos.
 * existe um selectorIndex para selecionar elementos de array.
 * Com estes atributos no estado é possível editar o modal.
 */
class ComponentWithModal extends Component {
  route = "/";

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.classNameHighlight = this.classNameHighlight.bind(this);
    this.onChangeSubHeader = this.onChangeSubHeader.bind(this);
    this.setSelectors = this.setSelectors.bind(this);
  }

  setSelectors(selectorIndex, selector) {
    this.setState({ selectorIndex: selectorIndex, selector: selector });
  }

  onChangeSubHeader(e) {
    this.setState({ [this.state.selector]: e.target.value });
  }

  classNameHighlight(className) {
    return this.props.readOnly ? className : className + " highlight";
  }
  /**
   * Os modais não são abertos se a página for readOnly
   */
  openModal() {
    if (!this.props.readOnly) {
      this.setState({ modalIsOpen: true });
    }
  }

  closeModal(e) {
    /*
      Aqui ocorrerá a persistência.
      Timeout para ter a certeza que o estado
      do objeto foi atualizado.
      Espera invisivel ao usuário.
    */
    let toSubmit = {};
    // Se 'e' for um evento.
    if (e.target) {
      for (let ele in this.state) {
        if (
          ele !== "modalIsOpen" &&
          ele !== "selector" &&
          ele !== "selectorIndex" &&
          ele !== "id"
        ) {
          toSubmit[ele] = this.state[ele];
        }
      }
    }
    //Senão ('e' é um estado)
    else {
      toSubmit = e;
    }
    setTimeout(() => {
      post(this.route, toSubmit,()=>{window.location.reload()});
    }, 500);
    this.setState({ modalIsOpen: false });
  }
}

export default ComponentWithModal;
