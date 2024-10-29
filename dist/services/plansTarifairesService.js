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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlanTarifaire = exports.getPlanTarifaireById = exports.getPlansTarifaires = exports.updatePlanTarifaire = exports.createPlanTarifaire = void 0;
// src/services/plansTarifairesService.ts
const Conn_1 = __importDefault(require("../Conn"));
const createPlanTarifaire = (planData) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.plansTarifaires.create({
        data: planData,
    });
});
exports.createPlanTarifaire = createPlanTarifaire;
const updatePlanTarifaire = (id, planData) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield Conn_1.default.plansTarifaires.findUnique({ where: { id } });
    if (!plan)
        throw new Error('Plan tarifaire non trouvé');
    return Conn_1.default.plansTarifaires.update({
        where: { id },
        data: planData,
    });
});
exports.updatePlanTarifaire = updatePlanTarifaire;
const getPlansTarifaires = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.plansTarifaires.findMany();
});
exports.getPlansTarifaires = getPlansTarifaires;
const getPlanTarifaireById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.plansTarifaires.findUnique({ where: { id } });
});
exports.getPlanTarifaireById = getPlanTarifaireById;
const deletePlanTarifaire = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.plansTarifaires.delete({ where: { id } });
});
exports.deletePlanTarifaire = deletePlanTarifaire;
//# sourceMappingURL=plansTarifairesService.js.map