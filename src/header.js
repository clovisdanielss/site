import React from "react";
import ComponentWithModal from "./componentwithmodal";
import {ModalText} from './modal'

const Sentences = (props) => {
  return (
    <span className="cd-words-wrapper waiting">
      {props.sentences.map((sentence, key) => {
        if (key > 0) {
          return (
            <b key={key} className={key === 1 ? "is-visible" : ""}>
              {sentence}
            </b>
          );
        }
      })}
    </span>
  );
};

class Header extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      sentences: ["I Am", "Clóvis", "Developer", "Freelancer"],
      modalIsOpen: false,
    };
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  onChangeValue(e){
    let val = e.target.value
    val = val.split('>')
    this.setState({sentences:val})
  }

  componentDidUpdate(props,state){
    // Controla a animação do cabeçalho, reseta no fechar do modal.
    if(state.sentences.length == 1 &&
      state.sentences.length != this.state.sentences.length){
      window.animateHeadline()
    }
  }


  render() {
    return (
      <header className="header slider-fade" data-scroll-index="0">
        <ModalText
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Header"
          description="Use '>' para separar os elementos."
          onChangeValue={this.onChangeValue}
          text={this.state.sentences.join('>')}
        />
        <div
          className="text-center item bg-img"
          data-overlay-dark="8"
          data-background="img/bg2.jpg"
        >
          <div className={this.classNameHighlight("v-middle caption mt-30")} onClick={this.openModal}>
            <div className="o-hidden">
              <h1 className="mt-15 mb-15 cd-headline clip is-full-width">
                <span className="blc">{this.state.sentences[0]}</span> <span> </span>
                <Sentences sentences={this.state.sentences} />
              </h1>
              <a href="#0" className="butn butn-bg mt-30">
                <span>Download CV.</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
