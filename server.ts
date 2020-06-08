import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
/**
 * Modificar a pasta para build aqui.
*/
import jsonSite from './public/json/site.json'
import fs from 'fs'

interface ISite {
    [index: string]: any
}

var staticFolder = './public'

/**
 * A persistência será realizada em um arquivo estatico pela simplicidade dos dados.
 * Não haverá condição de corrida, pois é um projeto para um único usuário usar como edição 
 * (o dono do portifólio).
 */
async function rewriteJson(jsonSite: any, isBackup?: boolean) {
    //console.log(jsonSite)
    let filename = isBackup ? '/json/backup.json' : '/json/site.json'
    filename = staticFolder + filename
    fs.writeFile(filename, JSON.stringify(jsonSite), 'utf-8', (err) => {
        if (!err) {
            console.log('Arquivo atualizado com sucesso!', filename)
        } else {
            console.log('O JSON do site foi corrompido!', err)
        }
    })
}

/** 
 * Função para criar arquivos upados para o servidor.
 */
async function writeFile (name: string, b: Buffer) {
    fs.writeFile(path.join('public','img', name), b, (err) => {
      if (err) {
        return console.error(err)
      } else {
        console.log('Arquivo salvo', name)
      }
    })
  }

const app = express()
const port = process.env.PORT || 8080

/**
 * Não vou lançar o backend com cors ativado.
 */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
    limit:'10mb'
}))
/**
 * O caminho estático deve ser redefinido no lançamento do servidor.
 */
app.use(express.static(staticFolder))

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})



/**
 * Devo fazer conexão com OAUTH2.
 */

/**
 * Rota de teste.
 */
app.post('/', (req, res, next) => {
    console.log(req.body)
    res.end()
})

app.all('/:prop*', (req, res, next) => {
    next()
})

/**
 * Rota para upload de arquivos.
 */
app.post('/upload',(req,res,next)=>{
    writeFile(req.body.name,Buffer.from(req.body.data))
    res.end()
})

/** 
 * Rota para adicionar elemento em um dos componentes do site.
 */
app.post('/:prop/:subprop', (req, res, next) => {
    let push = req.query.push
    console.log("Testando var:",push,req.body)
    let site: ISite = jsonSite
    rewriteJson(site, true)
    let siteProp: ISite = site[req.params.prop]
    if (!push) {
        siteProp[req.params.subprop] = req.body
    } else {
        siteProp[req.params.subprop].push(req.body)
    }
    rewriteJson(site)
    res.end()
})

/**
 * Rota para pegar um componente do site
 */
app.get('/:prop', (req, res, next) => {
    let site: ISite = jsonSite
    let prop = req.params.prop
    res.json(site[prop])
})

/**
 * Rota para sobrescrita de componente do site
 */
app.post('/:prop', (req, res, next) => {
    let site: ISite = jsonSite
    rewriteJson(site, true)
    let prop = req.params.prop
    site[prop] = req.body
    rewriteJson(site)
    res.end()
})