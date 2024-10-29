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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArret = exports.getArretById = exports.getArrets = exports.updateArret = exports.createArret = void 0;
// src/services/arretService.ts
const Conn_1 = __importDefault(require("../Conn"));
const createArret = (arretData) => __awaiter(void 0, void 0, void 0, function* () {
    const { trajet_id, ville, nom } = arretData, restOfData = __rest(arretData, ["trajet_id", "ville", "nom"]);
    if (!trajet_id)
        throw new Error('Trajet ID is required');
    return Conn_1.default.arret.create({
        data: Object.assign({ trajet: { connect: { id: trajet_id } }, ville,
            nom }, restOfData),
    });
});
exports.createArret = createArret;
const updateArret = (arretId, arretData) => __awaiter(void 0, void 0, void 0, function* () {
    const { trajet_id, ville, nom } = arretData, restOfData = __rest(arretData, ["trajet_id", "ville", "nom"]);
    const arret = yield Conn_1.default.arret.findUnique({ where: { id: arretId } });
    if (!arret)
        throw new Error('Arret not found');
    const updateData = Object.assign({}, restOfData);
    if (trajet_id) {
        updateData.trajet = { connect: { id: trajet_id } };
    }
    return Conn_1.default.arret.update({
        where: { id: arretId },
        data: Object.assign(Object.assign({}, updateData), { ville,
            nom }),
    });
});
exports.updateArret = updateArret;
const getArrets = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.arret.findMany();
});
exports.getArrets = getArrets;
const getArretById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.arret.findUnique({
        where: { id },
        include: {
            trajet: true, // Inclure les relations pertinentes si nécessaire
        },
    });
});
exports.getArretById = getArretById;
const deleteArret = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.arret.delete({ where: { id } });
});
exports.deleteArret = deleteArret;
//# sourceMappingURL=arretService.js.map