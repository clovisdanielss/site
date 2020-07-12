import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { patch } from "../loaddata";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      success: false,
      error: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let thus = this;
    console.log(username,password)
    if(username.trim().length === 0 || password.trim().length === 0){
      console.log(username,password)
      this.setState({
        error:true
      })
      setTimeout(() => {
        thus.setState({
          error:false
        })
      }, 3000);
      return;
    }
    thus.setState({ sent: true });
    patch(
      "/user",
      { username, password, email },
      () => {
        thus.setState({ success: true });
      },
      () => {
        alert("Houve algum erro! Falar com desenvolvedor.");
      }
    );
  }
  render() {
    if (this.state.success) {
      return <Redirect to="/edit"></Redirect>;
    }
    return (
      <section className="section-padding ">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-md-6 m-auto p-3 bg-dark">
              <div className="text-center section-head">
                <h4 className="fg-light">Atualizar</h4>
                <h6 className="mb-20">Atualizar informações</h6>
              </div>
              <form>
                {this.state.error ? (
                  <div className="form-group">
                    <div className="col-md-12 card alert alert-danger">
                      É obrigatório que você preencha os campos usuário e senha
                      com dados novos ou antigos.
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputEmail1">
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Nome de usuário"
                  />
                </div>
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputEmail1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="exemplo@outro.com"
                  />
                </div>
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputPassword1">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Senha"
                  />
                </div>

                <div className="form-group">
                  <button
                    onClick={this.onSubmit}
                    type="submit"
                    className="butn butn-bg disabled btn-block m-0"
                  >
                    <span>Atualizar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateAccount;
