import axios from "axios";

function getSite(app) {
  let url = "./json/site.json";
  axios.get(url).then((response) => {
    console.log("Resposta", response.data);
    app.setState({ jsonSite: response.data });
  });
}

function post(route, data, cbSuccess,cbError) {
  let url = process.env.REACT_APP_API
    ? process.env.REACT_APP_API + route
    : route;
  axios
    .post(url, data)
    .then((response) => {
      console.log("Sucesso!", route);
      if(cbSuccess){
        cbSuccess()
      }
    })
    .catch((err) => {
      console.error("Erro!", route, url);
      if(cbError){
        cbError()
      }
    });
}

export { getSite, post };
