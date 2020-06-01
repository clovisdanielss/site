import React, { Component } from "react";
import { ModalText } from "./modal";
import ComponentWithModal from "./componentwithmodal";
import SubHeader from "./subheader";

class Work extends ComponentWithModal {
  constructor(props) {
    super(props);
    this.defineAndOpenModal = this.defineAndOpenModal.bind(this);
  }

  defineAndOpenModal(e) {
    if (!this.props.onAddWork) {
      // Não há necessidade de mandar um seletor, já que existe modal próprio
      // para este componente.
      this.props.setSelectors(this.props.index, "");
      //this.openModal()
    }
  }

  render() {
    const work = this.props.work;
    const removeTrigger = this.props.readOnly ? null : this.props
        .onAddWork ? null : (
      <span
        className="icon my-icon"
        onClick={() => {
          this.props.onRemoveWork(this.props.index);
        }}
      >
        <i className="fas fa-times"></i>
      </span>
    );
    return (
      <div
        onClick={this.props.onAddWork}
        className={"col-lg-4 col-md-6 items no-padding " + work.filter}
      >
        {removeTrigger}
        <div className="item-img">
          <img src={work.src} alt="image" />
          <div className="item-img-overlay">
            <div className="overlay-info full-width">
              <p onClick={this.defineAndOpenModal}>{work.subtitle}</p>
              <h3 onClick={this.defineAndOpenModal}>{work.name}</h3>
              <a href="img/portfolio/1.jpg" className="popimg">
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
  constructor(props) {
    super(props);
    this.state = {
      selector: "",
      selectorIndex: 0,
      modalIsOpen: false,
      title: "Our Portfolio",
      subtitle: "Latest Creative Work",
      filters: [
        {
          name: "All",
          dataFilter: "*",
        },
        {
          name: "Brand",
          dataFilter: ".brand",
        },
        {
          name: "Design",
          dataFilter: ".design",
        },
        {
          name: "Marketing",
          dataFilter: ".marketing",
        },
      ],
      works: [
        {
          name: "Web Design",
          subtitle: "Logo | Branding",
          src: "img/portfolio/2.jpg",
          filter: "brand",
        },
        {
          name: "Trabalho 2",
          subtitle: "Sem criatividade",
          src: "img/portfolio/2.jpg",
          filter: "design",
        },
        {
          name: "Trabalho 3",
          subtitle: "Sem criatividade 2",
          src: "img/portfolio/2.jpg",
          filter: "marketing",
        },
      ],
    };

    this.onRemoveFilter = this.onRemoveFilter.bind(this);
    this.onAddFilter = this.onAddFilter.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.setSelectors = this.setSelectors.bind(this);
    this.onRemoveWork = this.onRemoveWork.bind(this);
    this.onAddWork = this.onAddWork.bind(this);
    //this.onChangeWork = this.onChangeWork.bind(this)
    this.getAllFilters = this.getAllFilters.bind(this);
  }

  getAllFilters() {
    let result = "";
    this.state.filters.map((filter) => {
      result += filter.name.toLocaleLowerCase() + " ";
    });
    return result;
  }

  onRemoveWork(index) {
    this.state.works.splice(index, 1);
    const works = this.state.works;
    this.setState({ works: works, selector: "", selectorIndex: 0 });
  }

  onAddWork(e) {
    let works = this.state.works;
    works.push({
      name: "indefinido",
      src: "img/portfolio/1.jpg",
      subtitle: "indefinido",
      filter: "indefinido",
    });
    this.setState({ works: works });
  }

  setSelectors(index, name) {
    this.setState({
      selector: name,
      selectorIndex: index,
    });
  }

  onRemoveFilter(index) {
    this.state.filters.splice(index, 1);
    const filters = this.state.filters;
    this.setState({ filters: filters, selector: "", selectorIndex: 0 });
  }

  onChangeFilter(e) {
    this.state.filters[this.state.selectorIndex][this.state.selector] =
      e.target.value;
    this.state.filters[this.state.selectorIndex].dataFilter =
      "." + e.target.value.toString().toLowerCase();
    let filters = this.state.filters;
    this.setState({ filters: filters });
  }

  onAddFilter(e) {
    let filters = this.state.filters;
    filters.push({
      name: "Indefinido",
      dataFilter: ".indefinido",
    });
    this.setState({ filters: filters });
  }

  componentDidUpdate() {
    console.log(this.state.works);
    window.$gallery.isotope("destroy").isotope();
  }
  render() {
    return (
      <section className="works section-padding bg-gray" data-scroll-index="3">
        <ModalText
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
              text={this.state[this.state.selector]}
              title={this.state.title}
              subtitle={this.state.subtitle}
              onChangeSubHeader={this.onChangeSubHeader}
              setSelectors={this.setSelectors}
              readOnly={this.props.readOnly}
            />
            {this.props.readOnly ? null : (
                <div className="section-head text-center col-sm-12" >
                <h5 >Nota: Remover filtro não remove quadros associados.</h5>
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
                  index={key}
                  onRemoveWork={this.onRemoveWork}
                  setSelectors={this.setSelectors}
                  readOnly={this.props.readOnly}
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
