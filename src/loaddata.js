import axios from "axios";

function get(route, component, initialize) {}

function post(route, data) {
    let url = process.env.REACT_APP_API + route
    axios.post(url,data).then((response)=>{
        console.log("Sucesso!",route)
    }).catch((err)=>{
        console.error("Erro!",route,url)
    })
}

export { get, post };
