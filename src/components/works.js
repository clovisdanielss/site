import React, { Component } from "react";
import ModalWork from "../modals/modalWork";
import ModalDefault from "../modals/modalDefault";
import ComponentWithModal from "../componentwithmodal";
import SubHeader from "./subheader";
import { post } from "../loaddata";
class Work extends ComponentWithModal {
  //Adiciona novo elemento, ao invés de substituir todos.
  route = "/works/works";
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSrc = this.onChangeSrc.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
    this.onRemoveWork = this.onRemoveWork.bind(this);
  }

  onChangeName(e) {
    this.props.onChangeWork(this.props.index, "name", e.target.value);
  }
  onChangeSrc(e) {
    //Preciso dar post na figura depois.
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const buffer = Buffer.from(e.target.result).toJSON();
        post("/upload", { data: buffer, name: file.name.replaceAll(" ", "_") });
      }
    };
    this.props.onChangeWork(
      this.props.index,
      "src",
      process.env.REACT_APP_STATIC +
        "img/" +
        e.target.files[0].name.replaceAll(" ", "_")
    );
  }
  onChangeFilter(e) {
    this.props.onChangeWork(this.props.index, "filter", e.target.value);
  }
  onChangeSubtitle(e) {
    this.props.onChangeWork(this.props.index, "subtitle", e.target.value);
  }
  onRemoveWork(e) {
    this.props.onRemoveWork(this.props.index);
  }
  closeModal() {
    ComponentWithModal.prototype.closeModal.apply(this, [this.props.works]);
  }

  defineAndOpenModal(e) {
    if (!this.props.onAddWork) {
      // Não há necessidade de mandar um seletor, já que existe modal próprio
      // para este componente.
      this.props.setSelectors(this.props.index, "");
      this.openModal();
    }
  }

  render() {
    const work = this.props.work;
    const removeTrigger = this.props.readOnly ? null : this.props
        .onAddWork ? null : (
      <span className="icon my-icon" onClick={this.onRemoveWork}>
        <i className="fas fa-times"></i>
      </span>
    );
    return (
      <div
        onClick={this.props.onAddWork}
        className={this.classNameHighlight(
          "col-lg-4 col-md-6 items no-padding " + work.filter
        )}
      >
        <ModalWork
          onChangeSubtitle={this.onChangeSubtitle}
          onChangeName={this.onChangeName}
          onChangeSrc={this.onChangeSrc}
          onChangeFilter={this.onChangeFilter}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Work"
          work={work}
        />
        {removeTrigger}
        <div onClick={this.defineAndOpenModal} className={"item-img"}>
          <img src={work.src} alt="image" />
          <div className="item-img-overlay">
            <div className="overlay-info full-width">
              <p onClick={this.defineAndOpenModal}>{work.subtitle}</p>
              <h3 onClick={this.defineAndOpenModal}>{work.name}</h3>
              <a href={work.src} className="popimg">
                <span className="icon">
                  <i className="fas fa-search-plus"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Works extends ComponentWithModal {
  route = "/works";
  constructor(props) {
    super(props);
    this.state = {
      selector: "",
      selectorIndex: 0,
      modalIsOpen: false,
      title: props.works.title,
      subtitle: props.works.subtitle,
      filters: props.works.filters,
      works: props.works.works,
    };

    this.onRemoveFilter = this.onRemoveFilter.bind(this);
    this.onAddFilter = this.onAddFilter.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onRemoveWork = this.onRemoveWork.bind(this);
    this.onAddWork = this.onAddWork.bind(this);
    this.onChangeWork = this.onChangeWork.bind(this);
    this.getAllFilters = this.getAllFilters.bind(this);
  }

  /**
   * Retorna todos os filtros existentes.
   */
  getAllFilters() {
    let result = "";
    this.state.filters.map((filter) => {
      result += filter.name.toLocaleLowerCase() + " ";
    });
    return result;
  }

  /**
   * Remove componente Work
   */
  onRemoveWork(index) {
    this.state.works.splice(index, 1);
    const works = this.state.works;
    this.setState({ works: works, selector: "", selectorIndex: 0 });
    setTimeout(() => {
      this.closeModal(this.state);
    }, 500);
  }

  /**
   * Adiciona componente Work
   */
  onAddWork(e) {
    let works = this.state.works;
    works.push({
      name: "nome indefinido",
      src: "img/portfolio/1.jpg",
      subtitle: "subtitulo indefinido",
      filter: "filtro indefinido",
    });
    this.setState({ works: works });
  }

  /**
   * Modifica componente work, para um dado indice, seletor e valor.
   */
  onChangeWork(index, selector, value) {
    this.state.works[index][selector] = value;
    let works = this.state.works;
    this.setState({ works: works });
  }

  /**
   * Remove o span de filtro.
   */
  onRemoveFilter(index) {
    this.state.filters.splice(index, 1);
    const filters = this.state.filters;
    this.setState({ filters: filters, selector: "", selectorIndex: 0 });
  }

  /**
   * Modifica o span de filtro
   */
  onChangeFilter(e) {
    this.state.filters[this.state.selectorIndex][this.state.selector] =
      e.target.value;
    this.state.filters[this.state.selectorIndex].dataFilter =
      "." + e.target.value.toString().toLowerCase();
    let filters = this.state.filters;
    this.setState({ filters: filters });
  }

  /**
   * Adiciona um novo span de filtro.
   */
  onAddFilter(e) {
    let filters = this.state.filters;
    filters.push({
      name: "Indefinido",
      dataFilter: ".indefinido",
    });
    this.setState({ filters: filters });
  }

  /**
   * Refaz o isotopo da galaria a cada atualização de componente.
   */
  componentDidUpdate() {
    console.log("Updated")
    if (!this.props.readOnly) {
      setTimeout(() => {
        window.$gallery.isotope("destroy").isotope();
      }, 30);
    }
  }

  componentDidMount() {
    window.isotope();
  }

  render() {
    console.log("Will render")
    return (
      <section className="works section-padding bg-gray" data-scroll-index="3">
        <ModalDefault
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Filters"
          onChangeValue={this.onChangeFilter}
          text={
            this.state.filters.length === 0
              ? ""
              : this.state.filters[this.state.selectorIndex][
                  this.state.selector
                ]
          }
        />
        <div className="container-fluid">
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
              <div className="section-head text-center col-sm-12">
                <h5>Nota: Remover filtro não remove quadros associados.</h5>
              </div>
            )}
            <div className="filtering text-center mb-30 col-sm-12">
              <div className="filter">
                {this.state.filters.map((filter, key) => (
                  <span data-filter={filter.dataFilter} key={key}>
                    {filter.name}
                    {this.props.readOnly
                      ? null
                      : [
                          <i
                            key={0}
                            className="fas fa-search margin-left-10px"
                            onClick={() => {
                              this.setSelectors(key, "name");
                              this.openModal();
                            }}
                          />,
                          <i
                            key={1}
                            onClick={() => {
                              this.onRemoveFilter(key);
                            }}
                            className="fas fa-times margin-left-10px icon-red"
                          />,
                        ]}
                  </span>
                ))}
                {this.props.readOnly ? null : (
                  <span onClick={this.onAddFilter}>
                    Adicionar
                    <i className="fas fa-plus margin-left-10px"></i>
                  </span>
                )}
              </div>
            </div>

            <div className="clearfix"></div>
            <div className="gallery full-width">
              {this.state.works.map((work, key) => (
                <Work
                  key={key}
                  work={work}
                  works={this.state.works}
                  index={key}
                  onRemoveWork={this.onRemoveWork}
                  setSelectors={this.setSelectors}
                  readOnly={this.props.readOnly}
                  onChangeWork={this.onChangeWork}
                />
              ))}
              {this.props.readOnly ? null : (
                <Work
                  work={{
                    name: "Adicionar",
                    subtitle: "Opção exclusiva do editor.",
                    src: "img/portfolio/3.jpg",
                    filter: this.getAllFilters() + " my-add-work",
                  }}
                  onAddWork={this.onAddWork}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Works;
