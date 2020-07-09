import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import passport from 'passport'
import LocalPassport from 'passport-local'
import crypto from 'crypto'
import mongoose from 'mongoose'
import session from 'express-session'

dotenv.config()
const gmail = require('gmail-send')

interface IUser extends mongoose.Document {
    username: string,
    password: string,
    email: string,
}

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true }
})

let User = mongoose.model<IUser>('User', userSchema)

passport.serializeUser(function (user: IUser, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(error => done(error, null))
});

passport.use(new LocalPassport.Strategy({ passReqToCallback: true },
    (req: any, username: any, password: any, done: any) => {
        const hash = crypto.createHash("sha512")
        hash.update(password + username)
        password = hash.digest('hex')
        User.findOne({ username: username, password: password })
            .then(user => done(null, user))
            .catch(error => done(error, null))
    }))


AWS.config.update({
    region: 'sa-east-1'
})
/**
 * Modificar a pasta para build aqui.
*/
import jsonSite from './build/json/site.json'
import fs from 'fs'


interface ISite {
    [index: string]: any
}

var staticFolder = './build'

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
async function writeFile(name: string, b: Buffer) {
    const s3 = new AWS.S3()
    let bucketParams = {
        Bucket: "bucket-meta",
        ACL: "public-read",
        Body: b,
        Key: "img/" + name
    }
    s3.upload(bucketParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        console.log(err, data)
        if (!err) {
            console.log("Arquivo salvo!!")
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
    limit: '10mb'
}))
/**
 * O caminho estático deve ser redefinido no lançamento do servidor.
 */
app.use(express.static(staticFolder))
app.use(session({
    //@ts-ignore
    secret: process.env.SECRET_COOKIE,
    cookie: { maxAge: 60000 }
}))
app.use(passport.initialize())
app.use(passport.session())

//@ts-ignore
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
let db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Escutando na porta ${port}`)
    })
})


/**
 * Rota para log.
 */
app.all('/:prop*', (req, res, next) => {
    console.log(new Date(), "method:", req.method, "route:", req.baseUrl)
    next()
})


/**
 * Rota para auth
 */
app.post('/login', passport.authenticate('local'), (req, res, next) => {
    // @ts-ignore
    res.json({ success: true })
})

/**
 * Rota para recuperar senha.
 * Espera o nome de usuário.
*/

app.post('/forgotPassword', (req, res, next) => {
    if (!req.body.username) {
        res.json({ "Bad Request": 300 })
    }
    const hash = crypto.createHash("sha512")
    let newPass = crypto.randomBytes(4).toString("hex")
    hash.update(newPass + req.body.username)
    User.findOneAndUpdate({ username: req.body.username }, { password: hash.digest("hex") })
        .then((user) => {
            let send = gmail({
                user: process.env.MAIL,
                pass: process.env.MAIL_PASS,
                //@ts-ignore
                to: user.email,
                subject: "ESQUECI A SENHA",
            })
            send({
                text: `Nome: ${req.body.username}\nSenha: ${newPass}`
                /// @ts-ignore
            }, (err, result, fullResult) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json({ success: true })
                }
            })
        })
})

/**
 * Rota para envio de email
 */
app.post('/sendmail', (req, res, next) => {
    User.find().then((users) => {
        // Lembrando que só existe um único usuário no sistema.
        let user = users[0]
        let send = gmail({
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
            //@ts-ignore
            to: user.email,
            subject: req.body.subject,
        })
        send({
            text: `Nome: ${req.body.name}\n` + req.body.text + `\nEnviado de ${req.body.mail}`
            /// @ts-ignore
        }, (err, result, fullResult) => {
            console.log(result)
            res.end()
        })
    }).catch(err => console.log(err))

})

const isAuth = (req: any, res: any, next: any) => {
    if (req.user) {
        next()
    } else {
        res.status(401).json({ "Unauthorized": 401 })
    }
}

/**
 * Rota para atualizar usuário.
 */

app.patch('/user', isAuth, (req, res, next) => {
    ///@ts-ignore
    let user: IUser = req.user
    User.findOneAndUpdate({ _id: user._id }, {
        username: req.body.username ? req.body.username : user.username,
        password: req.body.password ? req.body.password : user.password,
        email: req.body.email ? req.body.email : user.email
    })
        .then(() => res.json({ success: true }))
        .catch(error => res.json(error))
})

app.get('/edit', isAuth)

/**
 * Rota genérica para servidor estático.
 */
app.get('/:route', (req, res, next) => {
    res.sendFile(path.join(__dirname, staticFolder, 'index.html'))
})

app.post('*', isAuth)

/**
 * Rota para logo   
 */
app.post('/logout', (req, res, next) => {
    req.logout()
    req.session?.destroy((err) => {
        res.json({ success: true })
    })
})

/**
 * Rota temporaria para criar usuário (Nesse caso só existe 1 usuário)
app.post('/user', (req, res, next) => {
    const hash = crypto.createHash("sha512")
    hash.update(req.body.password + req.body.username)
    User.create({
        username: req.body.username,
        password: hash.digest('hex')
    })
        .then(newUser => res.json(newUser))
        .catch(error => res.json(error))
})
*/


/**
 * Rota de teste.
 */
app.post('/', (req, res, next) => {
    res.end()
})

/**
 * Rota para upload de arquivos.
 */
app.post('/upload', (req, res, next) => {
    writeFile(req.body.name, Buffer.from(req.body.data))
    res.end()
})


/** 
 * Rota para adicionar elemento em um dos componentes do site.
 */
app.post('/:prop/:subprop', (req, res, next) => {
    let push = req.query.push
    console.log("Testando var:", push, req.body)
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