import React, { Component } from "react";
import { post } from "../loaddata";
import { Redirect } from "react-router-dom";
import { UpdateGlobalStateContext } from "../contexts";

class Login extends Component {
  static contextType = UpdateGlobalStateContext;

  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      error: false,
      success: false,
    };
    this.onSubimit = this.onSubimit.bind(this);
  }

  onSubimit(e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    this.setState({ sent: true });
    const thisComp = this;
    post(
      "/login",
      { username, password },
      () => {
        thisComp.context({ isAuthenticated: true });
        thisComp.setState({ success: true });
      },
      () => {
        thisComp.setState({ error: true, sent: false });
        setTimeout(() => thisComp.setState({ error: false }), 2000);
      }
    );
  }

  render() {
    if (this.state.success) {
      return <Redirect  to="/edit"></Redirect>;
    }
    return (
      <section className="section-padding ">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-md-6 m-auto p-3 bg-dark">
              <div className="text-center section-head">
                <h4 className="fg-light">Login</h4>
                <h6 className="mb-20">Login para edição de site</h6>
              </div>
              <form>
                {this.state.error ? (
                  <div className="form-group">
                    <div className="col-md-12 card alert alert-danger">
                      Nome de usuário ou senha incorretos
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
                    readOnly={this.state.sent}
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
                    readOnly={this.state.sent}
                  />
                </div>
                <div>
                  <a href="#" className="fg-light">
                    {" "}
                    Esqueceu a senha ?{" "}
                  </a>
                </div>
                <div className="form-group">
                  <button
                    onClick={this.onSubimit}
                    type="submit"
                    className="butn butn-bg disabled btn-block m-0"
                  >
                    <span>Entrar</span>
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

export default Login;
