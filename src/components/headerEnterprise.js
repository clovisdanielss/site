import React from "react";
import ComponentWithModal from "../componentwithmodal";
import ModalHeader from "../modals/modalHeader";
import ModalHeaderEnterprise from "../modals/modalHeaderEnterprise";
import { post } from "../loaddata";

const Sentences = (props) => {
  return (
    <div
      className="text-center item bg-img"
      data-overlay-dark="8"
      data-background={props.src}
      //style={{ backgroundImage: props.src }}
    >
      <div className="v-middle caption mt-30">
        <div className="o-hidden">
          <h4>{props.sentences[0]}</h4>
          <h1>{props.sentences[1]}</h1>
          {props.sentences.map((sentence, index) => {
            if (index > 1) {
              return <p key={index}>{sentence}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

class HeaderEnterprise extends ComponentWithModal {
  route = "/headerEnterprise";
  constructor(props) {
    super(props);
    this.state = {
      /**
       * Aqui, as sentenças são array de arrays.
       */
      arrayOfSentences: props.headerEnterprise.arrayOfSentences,
      src: props.headerEnterprise.src,
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
    };
    this.setMyState = this.setMyState.bind(this);
    this.onChangeSrc = this.onChangeSrc.bind(this);
    this.doubleArrayToText = this.doubleArrayToText.bind(this);
  }

  
  onChangeSrc(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const buffer = Buffer.from(e.target.result).toJSON();
        post("/upload", { data: buffer, name: file.name.replaceAll(" ", "_") });
      }
    };
    this.setState({
      src:
        process.env.REACT_APP_STATIC +
        "img/" +
        e.target.files[0].name.replaceAll(" ", "_"),
    });
  }

  setMyState(arrayOfSentences) {
    this.setState({ arrayOfSentences });
  }

  componentDidUpdate(props, state) {
    // Controla a animação do cabeçalho, reseta no fechar do modal.
    if (
      state.arrayOfSentences.length == 1 &&
      state.arrayOfSentences.length != this.state.arrayOfSentences.length
    ) {
      window.animateHeadline();
    }
  }

  componentDidMount() {
    window.owlCarousel();
    window.config();
  }

  doubleArrayToText() {
    let text = "";
    console.log(this.state.arrayOfSentences);
    this.state.arrayOfSentences.map((sentences, index, arrayOfSentences) => {
      text += sentences.join(">\n");
      if (index + 1 !== arrayOfSentences.length) {
        text += "#\n";
      }
    });
    return text;
  }

  render() {
    return (
      <header className="header slider-fade" data-scroll-index="0">
        <ModalHeaderEnterprise
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Header"
          setParentState={this.setMyState}
          onChangeSrc={this.onChangeSrc}
          text={this.doubleArrayToText()}
          arrayOfSentences={this.state.arrayOfSentences}
        />
        <div
          className={this.classNameHighlight("owl-carousel owl-theme")}
          onClick={this.openModal}
        >
          {this.state.arrayOfSentences.map((sentences, key) => (
            <Sentences sentences={sentences} key={key} src={this.state.src} />
          ))}
        </div>
      </header>
    );
  }
}

export default HeaderEnterprise;
