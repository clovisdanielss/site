import React, { Component } from "react";
import { ModalText, ModalSkil, ModalSkill } from "./modal";
import ComponentWithModal from './componentwithmodal'

class Skill extends Component {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
  }

  defineAndOpenModal(e) {
    this.props.setSelectorIndex(this.props.index);
    this.props.openModal();
  }
  render() {
    const skill = this.props.skill;
    return (
      <div className="item" onClick={this.defineAndOpenModal}>
        <h6>{skill.name}</h6>
        <div className="skills-progress">
          <span data-value={skill.value} />
        </div>
      </div>
    );
  }
}

class Skills extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      selectorIndex: 0,
      modalIsOpen: false,
    };
    this.setSelectorIndex = this.setSelectorIndex.bind(this);
  }

  setSelectorIndex(selectorIndex) {
    this.setState({ selectorIndex: selectorIndex });
  }

  render() {
    return (
      <div className="skills pb-20 mt-20">
        <ModalSkill
          onChangeValue={this.props.onChangeValue}
          onChangeName={this.props.onChangeName}
          onRemove={this.props.onRemove}
          onAdd={this.props.onAdd}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Skill"
          skill={this.props.skills[this.state.selectorIndex]}
        />
        {this.props.skills.map((skill, key) => {
          return (
            <div key={key} className={this.classNameHighlight()}>
              <Skill
                skill={skill}
                setSelectorIndex={this.setSelectorIndex}
                index={key}
                openModal={this.openModal}
                onChangeValue={this.props.onChangeValue}
                onChangeName={this.props.onChangeName}
                onRemove={this.props.onRemove}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

class About extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.state = {
      header: "About",
      profission: "UI / UX Designer & Developer",
      
      text:
        "I am Clóvis, I am a graphic and web designer, and" +
        "I'm very passionate and dedicated to my work. With 7 years" +
        "experience as a graphic designer.",
      skills: [
        {
          id: 0,
          name: "Web Designer",
          value: "90%",
        },
        {
          id: 1,
          name: "Developer",
          value: "30%",
        },
      ],
      modalIsOpen: false,
      selector: "",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSkillName = this.onChangeSkillName.bind(this);
    this.onChangeSkillValue = this.onChangeSkillValue.bind(this);
    this.onRemoveSkill = this.onRemoveSkill.bind(this);
    this.onAddSkill = this.onAddSkill.bind(this)
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
  }

  /* O seletor define qual estado será modificado,
  assim como altera o conteúdo do modal de texto. */
  onChangeValue(e) {
    const selector = this.state.selector;
    this.setState({ [selector]: e.target.value });
  }

  /*Muda a percentagem da skill*/
  onChangeSkillValue(e) {
    let idSkill = e.target.getAttribute("data-id");
    idSkill = parseInt(idSkill);
    let skills = [];
    this.state.skills.map((skill) => {
      if (skill.id === idSkill) {
        skill.value = e.target.value;
      }
      skills.push(skill);
    });
    this.setState({ skills: skills });
  }

  /*Remove a skill*/
  onRemoveSkill(e) {
    let idSkill = e.target.getAttribute("data-id");
    idSkill = parseInt(idSkill);
    let skills = [];
    this.state.skills.map((skill) => {
      if (skill.id !== idSkill) {
        skills.push(skill);
      }
    });
    this.setState({ skills: skills });
  }

  onAddSkill(e) {
    let skills = [];
    let mid = 0;
    this.state.skills.map((skill) => {
      skills.push(skill);
      if (mid <= skill.id) {
        mid = skill.id + 1;
      }
    });
    skills.push({
      id: mid,
      name: "Indefinido",
      value: "0%",
    });
    this.setState({ skills: skills });
  }

  /*Muda o nome da skill*/
  onChangeSkillName(e) {
    let idSkill = e.target.getAttribute("data-id");
    idSkill = parseInt(idSkill);
    let skills = [];
    this.state.skills.map((skill) => {
      if (skill.id === idSkill) {
        skill.name = e.target.value;
      }
      skills.push(skill);
    });
    this.setState({ skills: skills });
  }

  /* No clique de uma entidade editavel, primeiro será definido
  o seletor, depois o modal é aberto.*/
  defineAndOpenModal(e) {
    this.setState({ selector: e.target.getAttribute("data-state") });
    this.openModal();
  }

  render() {
    return (
      <section
        className="about section-padding no-padding"
        data-scroll-index="1"
      >
        <ModalText
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit About"
          onChangeValue={this.onChangeValue}
          text={this.state[this.state.selector]}
        />
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-5 col-sm-12 col-xs-12 bg-img cover-bg sm-height-550px xs-height-350px hero-bg "
              data-background="img/about/hero.png"
            ></div>
            <div className="col-md-7 col-sm-12 col-xs-12 bg-dark pd-60 pl-sm10 pr-sm10">
              <div className="cent">
                <div className="section-head">
                  <h4
                    className={this.classNameHighlight("fg-light mb-10")}
                    data-state="header"
                    onClick={this.defineAndOpenModal}
                  >
                    {this.state.header}
                  </h4>
                  <h6
                    className={this.classNameHighlight("mb-20")}
                    data-state="profission"
                    onClick={this.defineAndOpenModal}
                  >
                    {this.state.profission}
                  </h6>
                </div>
                <p
                  data-state="text"
                  className={this.classNameHighlight("pb-10 fg-gray")}
                  onClick={this.defineAndOpenModal}
                >
                  {this.state.text}
                </p>
                <Skills
                  skills={this.state.skills}
                  onChangeValue={this.onChangeSkillValue}
                  onChangeName={this.onChangeSkillName}
                  onRemove={this.onRemoveSkill}
                  onAdd={this.onAddSkill}
                />
                <a href="#0" className="butn butn-bg ml-0">
                  <span>Contact Me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default About;
