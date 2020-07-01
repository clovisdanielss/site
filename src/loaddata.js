import axios from "axios";

function getSite(app) {
  let url = "./json/site.json";
  axios.get(url).then((response) => {
    console.log("Resposta", response.data);
    app.setState({ jsonSite: response.data });
  });
}

function post(route, data) {
  let url = process.env.REACT_APP_API
    ? process.env.REACT_APP_API + route
    : route;
  axios
    .post(url, data)
    .then((response) => {
      console.log("Sucesso!", route);
    })
    .catch((err) => {
      console.error("Erro!", route, url);
    });
}

export { getSite, post };
