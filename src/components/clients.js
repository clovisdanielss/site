import React, { Component } from "react";
import ComponentWithModal from "../componentwithmodal";
import { ModalClient } from "../modal";
import SubHeader from "./subheader";

class Client extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
    this.onRemoveClient = this.onRemoveClient.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeTitle(e) {
    this.props.onChangeClient(this.props.index, "title", e.target.value);
  }
  onChangeSubtitle(e) {
    this.props.onChangeClient(this.props.index, "subtitle", e.target.value);
  }
  onChangeText(e) {
    this.props.onChangeClient(this.props.index, "text", e.target.value);
  }

  /**
   * Define um testemunho de cliente para atualizar alguma propriedade do
   * cliente em questão, depois abre o modal.
   * Componente unificado, selector não necessario
   */
  defineAndOpenModal(e) {
    if (!this.props.onAddClient) {
      console.log(this.props.index);
      this.props.setSelectors(this.props.index, "");
      this.openModal();
    }
  }

  /**
   * Remove algum testemunho de cliente para o dado índice.
   * Usado pelo 'x'
   */
  onRemoveClient() {
    this.props.onRemoveClient(this.props.index);
  }

  render() {
    const removeTrigger = this.props.readOnly ? null : this.props
        .onAddClient ? null : (
      <span className=" my-icon" onClick={this.onRemoveClient}>
        <i className="fas fa-times"></i>
      </span> //
    );
    const client = this.props.client;
    return (
      <div className="item text-center" onClick={this.props.onAddClient}>
        {removeTrigger}
        <ModalClient
          onChangeTitle={this.onChangeTitle}
          onChangeSubtitle={this.onChangeSubtitle}
          onChangeText={this.onChangeText}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Client"
          client={client}
        />
        <div
          className={this.props.onAddClient ? "" : this.classNameHighlight()}
        >
          <div className="info" onClick={this.defineAndOpenModal}>
            <h6>
              {this.props.client.title}{" "}
              <span>{this.props.client.subtitle}</span>
            </h6>
            <div className="icon">
              <i className="fas fa-quote-left"></i>
            </div>
          </div>
          <p>{this.props.client.text}</p>
          <div className="rating"></div>
        </div>
      </div>
    );
  }
}

class Clients extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      title: "Our Clients",
      subtitle: "What're Clients Says?",
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
      clients: [
        {
          title: "Tom Burley",
          subtitle: "Empresa X",
          text: "Rápido e eficiente.",
        },
        {
          title: "Alex Burley",
          subtitle: "Empresa Y",
          text: "Povo da hora.",
        },
      ],
    };

    this.onChangeClient = this.onChangeClient.bind(this);
    this.onAddClient = this.onAddClient.bind(this);
    this.onRemoveClient = this.onRemoveClient.bind(this);
    this.addAnimationOnReadOnly = this.addAnimationOnReadOnly.bind(this);
  }

  /**
   * Adiciona a animação do modo de leitura
   */
  addAnimationOnReadOnly(className) {
    return this.props.readOnly ? className + " owl-carousel" : className;
  }

  /**
   * Modifica os dados de um comentário de cliente
   */
  onChangeClient(index, selector, value) {
    this.state.clients[index][selector] = value;
    let clients = this.state.clients;
    this.setState({ clients: clients });
  }

  /**
   * Adiciona um novo comentário de cliente
   */
  onAddClient() {
    let clients = this.state.clients;
    clients.push({
      title: "Indefinido",
      subtitle: "indefinido",
      text: "Indefinido",
    });
    this.setState({ clients: clients });
  }

  /**
   * Remove um comentário de cliente da lista de exibição.
   */
  onRemoveClient(index) {
    this.state.clients.splice(index, 1);
    let clients = this.state.clients;
    this.setState({ clients: clients });
  }

  render() {
    return (
      <section
        className="testimonials-grid section-padding bg-img bg-fixed"
        data-overlay-dark="10"
      >
        <div className="container">
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
            {this.props.readOnly ? null : (
              <div className="section-head text-center col-sm-12 myzi1">
                <h5 className="fg-light">
                  Nota: Animação numérica desabilitada para edição.
                </h5>
              </div>
            )}
            <div className={this.addAnimationOnReadOnly("owl-theme col-lg-12")}>
              {this.state.clients.map((client, key) => (
                <Client
                  client={client}
                  onChangeClient={this.onChangeClient}
                  onRemoveClient={this.onRemoveClient}
                  setSelectors={this.setSelectors}
                  readOnly={this.props.readOnly}
                  index={key}
                  key={key}
                />
              ))}
              {this.props.readOnly ? null : (
                <Client
                  client={{
                    title: "Adicionar",
                    subtitle: "Somente na Edição",
                    text: "Somente na Edição",
                  }}
                  onAddClient={this.onAddClient}
                  classNameHighlight={this.classNameHighlight}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Clients;
