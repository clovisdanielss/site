import React,{Component} from 'react'

class ComponentWithModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalIsOpen: false,
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.classNameHighlight = this.classNameHighlight.bind(this);
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
  
    closeModal() {
      /*
        Aqui ocorrerá a persistência.
      */
      console.log("Should work!", this.state);
      this.setState({ modalIsOpen: false });
    }
  }
  
  export default ComponentWithModal