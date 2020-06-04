import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
/**
 * Modificar a pasta para build aqui.
*/
import jsonSite from './src/json/site.json'
import fs from 'fs'

interface ISite {
    [index: string]:any
}

var staticFolder = './src'

/**
 * A persistência será realizada em um arquivo estatico pela simplicidade dos dados.
 * Não haverá condição de corrida, pois é um projeto para um único usuário usar como edição 
 * (o dono do portifólio).
 */
async function rewriteJson(jsonSite: any, isBackup?:boolean){
    console.log(jsonSite)
    let filename = isBackup?'/json/backup.json':'/json/site.json'
    filename = staticFolder + filename
    console.log(filename)
    fs.writeFile(filename,JSON.stringify(jsonSite),'utf-8',(err)=>{
        if(!err){
            console.log('Arquivo atualizado com sucesso!')
        }else{
            console.log('O JSON do site foi corrompido!',err)
        }
    })
}

const app = express()
const port = process.env.PORT || 8080

/**
 * Não vou lançar o backend com cors ativado.
 */
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
/**
 * O caminho estático deve ser redefinido no lançamento do servidor.
 */
app.use(express.static(staticFolder))

app.listen(port,()=>{
    console.log(`Escutando na porta ${port}`)
})



/**
 * Devo fazer conexão com OAUTH2.
 */

app.post('/', (req,res,next)=>{
    console.log(req.body)
    res.end()
})

app.all('/:prop*',(req,res,next)=>{
    next()
})

app.post('/:prop/:subprop', (req,res,next)=>{
    let site:ISite = jsonSite
    rewriteJson(site,true)
    let siteProp:ISite = site[req.params.prop]
    siteProp[req.params.subprop] = req.body 
    rewriteJson(site)
    res.end()
})

app.get('/:prop', (req,res,next)=>{
    let site:ISite = jsonSite
    let prop = req.params.prop
    res.json(site[prop])
})

app.post('/:prop', (req,res,next)=>{
    let site:ISite = jsonSite
    rewriteJson(site,true)
    let prop = req.params.prop
    site[prop] = req.body
    rewriteJson(site)
    res.end()
})