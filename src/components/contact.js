import React, { Component } from "react";
import ComponentWithModal from "../componentwithmodal";
import SubHeader from "./subheader";
import { post } from "../loaddata";

class Contact extends ComponentWithModal {
  route = "/contact";
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
      title: props.contact.title,
      subtitle: props.contact.subtitle,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.readOnly) {
      post(
        "/sendmail",
        {
          name: document.getElementById("form_name").value,
          mail: document.getElementById("form_email").value,
          subject: document.getElementById("form_subject").value,
          text: document.getElementById("form_message").value,
        },
        () => {
          window.location.reload();
        }
      );
    } else {
      alert("Modo edição não envia mensagens!");
    }
  }

  componentDidMount() {
    let form = document.getElementById("contact-form");
    form.addEventListener("submit", this.onSubmit, true);
  }

  render() {
    return (
      <section
        id="contact-section"
        className="page-contact section-padding bg-dark"
        data-scroll-index="4"
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
              classTitle={"fg-light"}
            />

            <div className="offset-lg-1 col-lg-10">
              <form
                className="form"
                id="contact-form"
                method="post"
                action="/sendmail"
              >
                <div className="messages"></div>

                <div className="controls">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          id="form_name"
                          type="text"
                          name="name"
                          placeholder="Nome *"
                          required={true}
                          data-error="Preencha seu nome."
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          id="form_email"
                          type="email"
                          name="email"
                          placeholder="Email *"
                          required={true}
                          data-error="Coloque seu email."
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          id="form_subject"
                          type="text"
                          name="subject"
                          placeholder="Assunto"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="form_message"
                          name="message"
                          placeholder="Mensagem *"
                          rows={4}
                          required={true}
                          data-error="Escreva sua mensagem."
                        ></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit" className="butn butn-bg">
                        <span>Enviar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
