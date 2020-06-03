import React, { Component } from "react";
import ComponentWithModal from "./componentwithmodal";
import SubHeader from './subheader'

class Contact extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
      title: "Contact Us",
      subtitle: "Get In Touch With Us",
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e){
      e.preventDefault()
      console.log("Enviando email!!!")
  }

  componentDidMount(){
      let form = document.getElementById("contact-form")
      form.addEventListener("submit",this.onSubmit,true)
  }

  render() {
    return (
      <section
        className="page-contact section-padding bg-dark"
        data-scroll-index="6"
      >
        <div className="container">
          <div className="row">
            <SubHeader
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
                action="contact.php"
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
                          placeholder="Name *"
                          required={true}
                          data-error="Firstname is required."
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
                          data-error="Valid email is required."
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
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="form_message"
                          name="message"
                          placeholder="Your Message *"
                          rows={4}
                          required={true}
                          data-error="Your message is required."
                        ></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit" className="butn butn-bg">
                        <span>Send Message</span>
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
