"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var crypto_1 = __importDefault(require("crypto"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
var gmail = require('gmail-send');
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true }
});
var User = mongoose_1.default.model('User', userSchema);
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) { return done(null, user); })
        .catch(function (error) { return done(error, null); });
});
passport_1.default.use(new passport_local_1.default.Strategy({ passReqToCallback: true }, function (req, username, password, done) {
    var hash = crypto_1.default.createHash("sha512");
    hash.update(password + username);
    password = hash.digest('hex');
    User.findOne({ username: username, password: password })
        .then(function (user) { return done(null, user); })
        .catch(function (error) { return done(error, null); });
}));
aws_sdk_1.default.config.update({
    region: 'sa-east-1'
});
/**
 * Modificar a pasta para build aqui.
*/
var site_json_1 = __importDefault(require("./build/json/site.json"));
var fs_1 = __importDefault(require("fs"));
var staticFolder = './build';
/**
 * A persistência será realizada em um arquivo estatico pela simplicidade dos dados.
 * Não haverá condição de corrida, pois é um projeto para um único usuário usar como edição
 * (o dono do portifólio).
 */
function rewriteJson(jsonSite, isBackup) {
    return __awaiter(this, void 0, void 0, function () {
        var filename;
        return __generator(this, function (_a) {
            filename = isBackup ? '/json/backup.json' : '/json/site.json';
            filename = staticFolder + filename;
            fs_1.default.writeFile(filename, JSON.stringify(jsonSite), 'utf-8', function (err) {
                if (!err) {
                    console.log('Arquivo atualizado com sucesso!', filename);
                }
                else {
                    console.log('O JSON do site foi corrompido!', err);
                }
            });
            return [2 /*return*/];
        });
    });
}
/**
 * Função para criar arquivos upados para o servidor.
 */
function writeFile(name, b) {
    return __awaiter(this, void 0, void 0, function () {
        var s3, bucketParams;
        return __generator(this, function (_a) {
            s3 = new aws_sdk_1.default.S3();
            bucketParams = {
                Bucket: "bucket-meta",
                ACL: "public-read",
                Body: b,
                Key: "img/" + name
            };
            s3.upload(bucketParams, function (err, data) {
                console.log(err, data);
                if (!err) {
                    console.log("Arquivo salvo!!");
                }
            });
            return [2 /*return*/];
        });
    });
}
var app = express_1.default();
var port = process.env.PORT || 8080;
/**
 * Não vou lançar o backend com cors ativado.
 */
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({
    limit: '10mb'
}));
/**
 * O caminho estático deve ser redefinido no lançamento do servidor.
 */
app.use(express_1.default.static(staticFolder));
app.use(express_session_1.default({
    //@ts-ignore
    secret: process.env.SECRET_COOKIE,
    cookie: { maxAge: 60000 }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//@ts-ignore
mongoose_1.default.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose_1.default.connection;
db.on('error', function (error) { return console.log(error); });
db.once('open', function () {
    app.listen(port, function () {
        console.log("Escutando na porta " + port);
    });
});
/**
 * Rota para log.
 */
app.all('/:prop*', function (req, res, next) {
    console.log(new Date(), "method:", req.method, "route:", req.baseUrl);
    next();
});
/**
 * Rota para auth
 */
app.post('/login', passport_1.default.authenticate('local'), function (req, res, next) {
    // @ts-ignore
    res.json({ success: true });
});
/**
 * Rota para recuperar senha.
 * Espera o nome de usuário.
*/
app.post('/forgotPassword', function (req, res, next) {
    if (!req.body.username) {
        res.status(300).json({ "Bad Request": 300 });
    }
    var hash = crypto_1.default.createHash("sha512");
    var newPass = crypto_1.default.randomBytes(4).toString("hex");
    hash.update(newPass + req.body.username);
    User.findOneAndUpdate({ username: req.body.username }, { password: hash.digest("hex") })
        .then(function (user) {
        var send = gmail({
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
            //@ts-ignore
            to: user.email,
            subject: "ESQUECI A SENHA",
        });
        send({
            text: "Nome: " + req.body.username + "\nSenha: " + newPass
            /// @ts-ignore
        }, function (err, result, fullResult) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ success: true });
            }
        });
    });
});
/**
 * Rota para envio de email
 */
app.post('/sendmail', function (req, res, next) {
    User.find().then(function (users) {
        // Lembrando que só existe um único usuário no sistema.
        var user = users[0];
        var send = gmail({
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
            //@ts-ignore
            to: user.email,
            subject: req.body.subject,
        });
        send({
            text: "Nome: " + req.body.name + "\n" + req.body.text + ("\nEnviado de " + req.body.mail)
            /// @ts-ignore
        }, function (err, result, fullResult) {
            console.log(result);
            res.end();
        });
    }).catch(function (err) { return console.log(err); });
});
var isAuth = function (req, res, next) {
    /**
     * NÃO ESQUECE DE RETIRAR ISSO QUE COLOCQUEI PRA N TER Q FICAR AUTHENTICANDO.
     */
    if (req.user) {
        next();
    }
    else {
        res.status(401).json({ "Unauthorized": 401 });
    }
};
/**
 * Rota para atualizar usuário.
 */
app.patch('/user', isAuth, function (req, res, next) {
    ///@ts-ignore
    var user = req.user;
    if (req.body.username.trim().length === 0 || req.body.password.trim().length === 0) {
        res.status(301).json({ "Bad Request": 301 });
        return;
    }
    var hash = crypto_1.default.createHash("sha512");
    hash.update(req.body.password + req.body.username);
    User.findOneAndUpdate({ _id: user._id }, {
        username: req.body.username,
        password: hash.digest('hex'),
        email: req.body.email.trim().length != 0 ? req.body.email : user.email
    })
        .then(function () { return res.json({ success: true }); })
        .catch(function (error) { return res.json(error); });
});
app.get('/edit', isAuth);
app.get('/update', isAuth);
/**
 * Rota genérica para servidor estático.
 */
app.get('/:route', function (req, res, next) {
    res.sendFile(path_1.default.join(__dirname, staticFolder, 'index.html'));
});
app.post('*', isAuth);
/**
 * Rota para logo
 */
app.post('/logout', function (req, res, next) {
    var _a;
    req.logout();
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(function (err) {
        res.json({ success: true });
    });
});
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
app.post('/', function (req, res, next) {
    res.end();
});
/**
 * Rota para upload de arquivos.
 */
app.post('/upload', function (req, res, next) {
    writeFile(req.body.name, Buffer.from(req.body.data));
    res.end();
});
/**
 * Rota para adicionar elemento em um dos componentes do site.
 */
app.post('/:prop/:subprop', function (req, res, next) {
    var push = req.query.push;
    console.log("Testando var:", push, req.body);
    var site = site_json_1.default;
    rewriteJson(site, true);
    var siteProp = site[req.params.prop];
    if (!push) {
        siteProp[req.params.subprop] = req.body;
    }
    else {
        siteProp[req.params.subprop].push(req.body);
    }
    rewriteJson(site);
    res.end();
});
/**
 * Rota para sobrescrita de componente do site
 */
app.post('/:prop', function (req, res, next) {
    var site = site_json_1.default;
    rewriteJson(site, true);
    var prop = req.params.prop;
    site[prop] = req.body;
    rewriteJson(site);
    res.end();
});
