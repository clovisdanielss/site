import React, { Component } from "react";

class UpdateAccount extends Component {
  render() {
    return (
      <section className="section-padding ">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-md-6 m-auto p-3 bg-dark">
                <div className="text-center section-head">
                    <h4 className="fg-light" >Login</h4>
                    <h6 className="mb-20">Login para edição de site</h6>
                </div>
              <form>
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputEmail1">Nome de Usuário</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Nome de usuário"
                  />
                </div>
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputEmail1">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="exemplo@outro.com"
                  />
                </div>
                <div className="form-group">
                  <label className="fg-light" htmlFor="exampleInputPassword1">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Senha"
                  />
                </div>
                <div>
                    <a href="#" className="fg-light"> Esqueceu a senha ? </a>
                </div>
                <div className="form-group">
                  <button
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
