import React, { Component } from "react";
import ComponentWithModal from "../componentwithmodal";
import SubHeader from "./subheader";
import ModalDefault from '../modals/modalDefault'
import { render } from "react-dom";

class Service extends Component {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
    this.onRemoveService = this.onRemoveService.bind(this);
  }

  /**
   * Define um seletor para atualizar alguma propriedade do
   * Serviço em questão, depois abre o modal.
   */
  defineAndOpenModal(e) {
    if (!this.props.onAddService) {
      const selector = e.target.getAttribute("data-state");
      this.props.setSelectors(this.props.index, selector);
      this.props.openModal();
    }
  }

  /**
   * Remove algum serviço para o dado índice.
   * Usado pelo 'x'
   */
  onRemoveService() {
    this.props.onRemoveService(this.props.index);
  }

  render() {
    const props = this.props;
    let bkg = props.index % 2 == 0 ? "serv-item" : "serv-item bg-dark";
    bkg += " my-serv-item";
    const h6font = props.index % 2 == 0 ? "" : "fg-light";
    const pfont = props.index % 2 == 0 ? "" : "fg-gray";
    const removeTrigger = props.readOnly ? null : props.onAddService ? null : (
      <span className=" my-icon" onClick={this.onRemoveService}>
        <i className="fas fa-times"></i>
      </span> //
    );

    return (
      <div
        className={"col-lg-4 col-md-6 no-padding"}
        onClick={props.onAddService}
      >
        <div className={bkg}>
          {removeTrigger}
          <div className={props.classNameHighlight()}>
            <span
              className="icon"
              onClick={this.defineAndOpenModal}
              data-state={"icon"}
            >
              <i
                onClick={this.defineAndOpenModal}
                data-state={"icon"}
                className={props.service.icon}
              ></i>
            </span>
          </div>
          <h6
            data-state={"name"}
            className={props.classNameHighlight(h6font)}
            onClick={this.defineAndOpenModal}
          >
            {props.service.name}
          </h6>
          <p
            data-state={"description"}
            className={props.classNameHighlight(pfont)}
            onClick={this.defineAndOpenModal}
          >
            {props.service.description}
          </p>
        </div>
      </div>
    );
  }
}

class Services extends ComponentWithModal {
  route = "/services";
  constructor(props) {
    super(props);
    this.state = {
      /*
        Selector serve para pegar uma propriedade do objeto.
        SelectorIndex serve para indicar o indice.
      */
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
      title: props.services.title,
      subtitle: props.services.subtitle,
      services: props.services.services,
    };

    this.onAddService = this.onAddService.bind(this);
    this.onRemoveService = this.onRemoveService.bind(this);
    this.onChangeService = this.onChangeService.bind(this);
  }

  /**
   * Modifica valor de um serviço de determinado indice para um
   * dado seletor.
   */
  onChangeService(e) {
    this.state.services[this.state.selectorIndex][this.state.selector] =
      e.target.value;
    let services = this.state.services;
    this.setState({ services: services });
  }

  /**
   * Adiciona um serviço em branco.
   */
  onAddService() {
    let services = this.state.services;
    services.push({
      name: "Indefinido",
      description: "Indefinida",
      icon: "fas fa-question",
    });
    this.setState({ services: services });
  }

  /**
   * Remove um serviço para um dado índice.
   */
  onRemoveService(index) {
    this.state.services.splice(index, 1);
    let services = this.state.services;
    this.setState({ services: services, selector: "", selectorIndex: 0 });
    setTimeout(() => {
      this.closeModal(this.state);
    }, 500);
  }

  render() {
    return (
      <section className="services section-padding" data-scroll-index="2">
        <ModalDefault
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Service"
          onChangeValue={this.onChangeService}
          text={
            this.state.services.length === 0
              ? ""
              : this.state.services[this.state.selectorIndex][
                  this.state.selector
                ]
          }
        />
        <div className="container-fluid">
          <div className="row">
            <SubHeader
              closeModal={this.closeModal}
              text={this.state[this.state.selector]}
              title={this.state.title}
              subtitle={this.state.subtitle}
              onChangeSubHeader={this.onChangeSubHeader}
              setSelectors={this.setSelectors}
              readOnly={this.props.readOnly}
            />
            {this.state.services.map((service, key) => (
              <Service
                setSelectors={this.setSelectors}
                openModal={this.openModal}
                key={key}
                service={service}
                classNameHighlight={this.classNameHighlight}
                readOnly={this.props.readOnly}
                index={key}
                onRemoveService={this.onRemoveService}
              />
            ))}
            {this.props.readOnly ? null : (
              <Service
                onAddService={this.onAddService}
                service={{
                  name: "Clique Para Adicionar",
                  description: "Opção exclusiva do editor.",
                  icon: "fas fa-plus",
                }}
                classNameHighlight={this.classNameHighlight}
                index={this.state.services.length}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Services;
