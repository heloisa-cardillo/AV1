"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoEtapa = exports.Cargo = exports.TipoTeste = exports.TipoPeca = exports.TipoAeronave = void 0;
var TipoAeronave;
(function (TipoAeronave) {
    TipoAeronave["COMERCIAL"] = "COMERCIAL";
    TipoAeronave["MILITAR"] = "MILITAR";
})(TipoAeronave || (exports.TipoAeronave = TipoAeronave = {}));
var TipoPeca;
(function (TipoPeca) {
    TipoPeca["NACIONAL"] = "NACIONAL";
    TipoPeca["IMPORTADA"] = "IMPORTADA";
})(TipoPeca || (exports.TipoPeca = TipoPeca = {}));
var TipoTeste;
(function (TipoTeste) {
    TipoTeste["ELETRICO"] = "ELETRICO";
    TipoTeste["HIDRAULICO"] = "HIDRAULICO";
    TipoTeste["AERODINAMICO"] = "AERODINAMICO";
})(TipoTeste || (exports.TipoTeste = TipoTeste = {}));
var Cargo;
(function (Cargo) {
    Cargo["TECNICO"] = "TECNICO";
    Cargo["ENGENHEIRO"] = "ENGENHEIRO";
    Cargo["SUPERVISOR"] = "SUPERVISOR";
    Cargo["GERENTE"] = "GERENTE";
})(Cargo || (exports.Cargo = Cargo = {}));
var TipoEtapa;
(function (TipoEtapa) {
    TipoEtapa["INSPECAO"] = "INSPECAO";
    TipoEtapa["MANUTENCAO"] = "MANUTENCAO";
    TipoEtapa["REPARO"] = "REPARO";
    TipoEtapa["TESTE"] = "TESTE";
})(TipoEtapa || (exports.TipoEtapa = TipoEtapa = {}));
