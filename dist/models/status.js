"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTeste = exports.StatusEtapa = exports.StatusPeca = void 0;
var StatusPeca;
(function (StatusPeca) {
    StatusPeca["EMPRODUCAO"] = "EM PRODUCAO";
    StatusPeca["EMTRANSPORTE"] = "EM TRANSPORTE";
    StatusPeca["PRONTA"] = "PRONTA";
    StatusPeca["INSTALADA"] = "INSTALADA";
})(StatusPeca || (exports.StatusPeca = StatusPeca = {}));
var StatusEtapa;
(function (StatusEtapa) {
    StatusEtapa["NAOINICIADA"] = "NAO INICIADA";
    StatusEtapa["EMANDAMENTO"] = "EM ANDAMENTO";
    StatusEtapa["CONCLUIDA"] = "CONCLUIDA";
    StatusEtapa["CANCELADA"] = "CANCELADA";
})(StatusEtapa || (exports.StatusEtapa = StatusEtapa = {}));
var StatusTeste;
(function (StatusTeste) {
    StatusTeste["PENDENTE"] = "PENDENTE";
    StatusTeste["EMANDAMENTO"] = "EM ANDAMENTO";
    StatusTeste["APROVADO"] = "APROVADO";
    StatusTeste["REPROVADO"] = "REPROVADO";
})(StatusTeste || (exports.StatusTeste = StatusTeste = {}));
