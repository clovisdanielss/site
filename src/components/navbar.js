import React from "react";
import ComponentWithModal from "../componentwithmodal";
import ModalDefault from '../modals/modalDefault'
import { post } from "../loaddata";

class Navbar extends ComponentWithModal {
  route = "/navbar";

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selector: "",
      selectorIndex: 0,
      items: props.navbar.items,
      src: props.navbar.src,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSrc = this.onChangeSrc.bind(this);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
  }

  onChangeValue(e) {
    let val = e.target.value;
    val = val.split(">");
    this.setState({ items: val });
  }

  onChangeSrc(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const buffer = Buffer.from(e.target.result).toJSON();
        post("/upload", { data: buffer, name: file.name.replaceAll(" ","_") });
      }
    };
    this.setState({ src: process.env.REACT_APP_STATIC + "img/" + e.target.files[0].name.replaceAll(" ","_") });
  }

  /* No clique de uma entidade editavel, primeiro será definido
  o seletor, depois o modal é aberto.*/
  defineAndOpenModal(e) {
    this.setSelectors(null, e.target.getAttribute("data-state"));
    this.openModal();
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <ModalDefault
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Navbar"
          description="Use '>' para separar os elementos."
          onChangeValue={this.onChangeValue}
          onChangeSrc={this.onChangeSrc}
          text={this.state.selector === "items" ? this.state.items.join(">") : ""}
          isImage={this.state.selector === "src"}
        />
        <div className="container">
          <a
            className={this.classNameHighlight("logo")}
            href="#"
            data-state="src"
            onClick={this.defineAndOpenModal}
          >
            <img data-state="src" src={this.state.src} alt="logo" onClick={this.defineAndOpenModal}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div
            className={this.classNameHighlight("collapse navbar-collapse")}
            onClick={this.defineAndOpenModal}
            data-state="items"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              {this.state.items.map((item, key) => (
                <li className="nav-item" key={key}>
                  <a className="nav-link" href="#" data-scroll-nav={key}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
