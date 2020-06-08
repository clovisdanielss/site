import axios from "axios";

function getSite(site) {
    let url = "./json/site.json"
    axios.get(url).then((response)=>{
        console.log("Resposta",  response.data)
        site = response.data
    })
}

function post(route, data) {
    let url = process.env.REACT_APP_API + route
    axios.post(url,data).then((response)=>{
        console.log("Sucesso!",route)
    }).catch((err)=>{
        console.error("Erro!",route,url)
    })
}

export { getSite, post };
