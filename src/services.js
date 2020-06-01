import React, { Component } from "react";
import ComponentWithModal from "./componentwithmodal";
import SubHeader from './subheader'
import { ModalText } from "./modal";
import { render } from "react-dom";


class Service extends Component {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
    this.onRemoveService = this.onRemoveService.bind(this);
  }

  defineAndOpenModal(e) {
    if (!this.props.onAddService) {
      const selector = e.target.getAttribute("data-state");
      this.props.setSelectors(this.props.index, selector);
      this.props.openModal();
    }
  }

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
      title: "Our Services",
      subtitle: "Awesome Features",
      services: [
        {
          name: "Creative Design",
          description:
            "A decade ago, we founded Melinda with the goal of creating meaningful digital experiences.",
          icon: "fas fa-pencil-ruler",
        },
        {
          name: "Modern Styles",
          description:
            "A decade ago, we founded Melinda with the goal of creating meaningful digital experiences.",
          icon: "fas fa-layer-group",
        },
        {
          name: "Friendship",
          description:
            "A decade ago, we founded Melinda with the goal of creating meaningful digital experiences.",
          icon: "fas fa-hands",
        },
      ],
    };

    this.onAddService = this.onAddService.bind(this);
    this.onRemoveService = this.onRemoveService.bind(this);
    this.setSelectors = this.setSelectors.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }


  componentDidUpdate() {
    console.log(this.state.selector, this.state.selectorIndex);
  }

  onChangeValue(e) {
    this.state.services[this.state.selectorIndex][this.state.selector] =
      e.target.value;
    let services = this.state.services;
    this.setState({ services: services });
  }

  onAddService() {
    let services = this.state.services;
    services.push({
      name: "Indefinido",
      description: "Indefinida",
      icon: "fas fa-undefined",
    });
    this.setState({ services: services });
  }

  setSelectors(selectorIndex, selector) {
    this.setState({ selectorIndex: selectorIndex, selector: selector });
  }

  onRemoveService(index) {
    console.log("Index: ", index);
    console.log("Removing...", this.state.services.splice(index, 1));
    let services = this.state.services;
    this.setState({ services: services, selector: "", selectorIndex: 0 });
  }

  render() {
    return (
      <section className="services section-padding" data-scroll-index="2">
        <ModalText
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Service"
          onChangeValue={this.onChangeValue}
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
