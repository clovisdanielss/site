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
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var path_1 = require("path");
/**
 * Modificar a pasta para build aqui.
*/
var site_json_1 = require("./build/json/site.json");
var fs_1 = require("fs");
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
            fs_1["default"].writeFile(filename, JSON.stringify(jsonSite), 'utf-8', function (err) {
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
        return __generator(this, function (_a) {
            fs_1["default"].writeFile(path_1["default"].join(staticFolder, 'img', name), b, function (err) {
                if (err) {
                    return console.error(err);
                }
                else {
                    console.log('Arquivo salvo', name);
                }
            });
            return [2 /*return*/];
        });
    });
}
var app = express_1["default"]();
var port = process.env.PORT || 8080;
/**
 * Não vou lançar o backend com cors ativado.
 */
app.use(cors_1["default"]());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json({
    limit: '10mb'
}));
/**
 * O caminho estático deve ser redefinido no lançamento do servidor.
 */
app.use(express_1["default"].static(staticFolder));
app.listen(port, function () {
    console.log("Escutando na porta " + port);
});
/**
 * Devo fazer conexão com OAUTH2.
 */
app.all('/:prop*', function (req, res, next) {
    console.log(new Date(), "method:", req.method, "route:", req.route.path);
    next();
});
app.get('/:route', function (req, res, next) {
    res.sendFile(path_1["default"].join(__dirname, staticFolder, 'index.html'));
});
/**
 * Rota de teste.
 */
app.post('/', function (req, res, next) {
    console.log(req.body);
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
    var site = site_json_1["default"];
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
    var site = site_json_1["default"];
    rewriteJson(site, true);
    var prop = req.params.prop;
    site[prop] = req.body;
    rewriteJson(site);
    res.end();
});
