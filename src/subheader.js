import React,{Component} from 'react'
import ComponentWithModal from './componentwithmodal'
import { ModalDefault } from "./modal";


class SubHeader extends ComponentWithModal {
    constructor(props){
      super(props)
      this.defineAndOpenModal = this.defineAndOpenModal.bind(this)
    }
  
    defineAndOpenModal(e){
      const selector = e.target.getAttribute("data-state")
      this.props.setSelectors(0,selector)
      this.openModal()
    }
  
    render() {
      return (
        <div className="section-head text-center col-sm-12">
          <ModalDefault
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Edit SubHeader"
            onChangeValue={this.props.onChangeSubHeader}
            text={
              this.props.text
            }
          />
          <h6 data-state="subtitle" className={this.classNameHighlight()} onClick={this.defineAndOpenModal}>{this.props.subtitle}</h6>
          <h4 data-state="title" className={this.classNameHighlight(this.props.classTitle)} onClick={this.defineAndOpenModal}>{this.props.title}</h4>
        </div>
      );
    }
  }

  export default SubHeader